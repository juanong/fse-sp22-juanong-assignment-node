/**
 * @file Controller RESTful web service API for likes resource
 */
import {Request, Response, Express} from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeControllerI";
import TuitDao from "../daos/TuitDao";
import DislikeDao from "../daos/DislikeDao";

/**
 * @class LikeController Implements RESTful web service API for likes resource
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all tuits liked by a user</li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit</li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user liked a tuit</li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user no longer likes a tuit</li>
 *     <li>PUT /api/users/:uid/likes/:tid to update the like/dislike information of a tuit </li>
 *     <li>PUT /api/tuits/:tid/reset to set all tuit stats to 0 </li>
 *     <li>GET /api/users/:uid/likes/:tid to retrieve a like instance of a specific user and tuit
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} likeController Singleton controller implementing RESTful web service API
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {DislikeDao} dislikeDao Singleton DAO implementing dislikes CRUD operations
 */
export default class LikeController implements LikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static likeController: LikeController | null = null;
    /**
     * Create a single instance of the like controller
     * @param {Express} app Express instance to declare the RESTful web service API
     * @return LikeController
     */
    public static getInstance = (app: Express): LikeController => {
        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.get('/api/users/:uid/likes', LikeController.likeController.findAllTuitsLikedByUser);
            app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
            app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
            app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
            app.put("/api/tuits/:tid/reset", LikeController.likeController.resetTuitStats);
            app.get('/api/users/:uid/likes/:tid', LikeController.likeController.findUserLikesTuit);
        }
        return LikeController.likeController;
    }
    private constructor(){}

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req The request from the client, including the path parameter uid representing the user
     * who has liked tuits
     * @param {Response} res The response to the client, including the body as a JSON array containing the
     * relevant tuit objects
     */
    findAllTuitsLikedByUser(req: Request, res: Response) {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;
        LikeController.likeDao.findAllTuitsLikedByUser(userId)
            .then(likes => {
                const likesNonNullTuits = likes.filter(like => like.tuit);
                const tuitsFromLikes = likesNonNullTuits.map(like => like.tuit);
                res.json(tuitsFromLikes);
            })
    }
    /**
     * Retrieves all users that liked a specific tuit from the database
     * @param {Request} req The request from the client, including the path parameter tid representing the tuit
     * @param {Response} res The response to the client, including the body as a JSON array containing the
     * relevant user objects
     */
    findAllUsersThatLikedTuit(req: Request, res: Response) {
        return LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
    }
    /**
     * Creates a like instance in the database
     * @param {Request} req The request from the client, including the path parameters uid and tid representing
     * the user liking the tuit and the tuit being liked
     * @param {Response} res The response to the client, including the body as a JSON object containing
     * the new like
     */
    userLikesTuit(req: Request, res: Response) {
        return LikeController.likeDao.userLikesTuit(req.params.tid, req.params.uid)
            .then(like => res.json(like));
    }
    /**
     * Deletes a like instance in the database
     * @param {Request} req The request from the client, including the path parameters uid and tid representing
     * the user unliking the tuit and the tuit being unliked
     * @param {Response} res The response to the client, including status on whether deleting the like
     * was successful or not
     */
    userUnlikesTuit(req: Request, res: Response) {
        return LikeController.likeDao.userUnlikesTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status));
    }
    /**
     * Adjusts the relationship between likes and dislikes for a particular tuit
     * @param {Request} req The request from the client, including the path parameters uid and tid representing
     * the user who has liked or disliked a tuit and the related tuit
     * @param {Response} res The response to the client, including status on whether the toggle was successful
     * or not
     */
    userTogglesTuitLikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyLikedTuit = await LikeController.likeDao
                .findUserLikesTuit(userId, tid);
            const userHasDislikedTuit = await LikeController.dislikeDao
                .findUserDislikesTuit(userId, tid);
            const howManyLikedTuit = await LikeController.likeDao
                .countHowManyLikedTuit(tid);
            const howManyDislikedTuit = await LikeController.dislikeDao
                .countHowManyDislikedTuit(tid);
            let tuit = await LikeController.tuitDao.findTuitById(tid);
            if (userAlreadyLikedTuit) {
                await LikeController.likeDao.userUnlikesTuit(tid, userId);
                tuit.stats.likes = howManyLikedTuit - 1;
            } else {
                await LikeController.likeDao.userLikesTuit(tid, userId);
                tuit.stats.likes = howManyLikedTuit + 1;
                if (userHasDislikedTuit) {
                    // decrement dislikes, unlike the tuit
                    await LikeController.dislikeDao.userUndislikesTuit(tid, userId);
                    tuit.stats.dislikes = Math.max(howManyDislikedTuit - 1, 0);
                }
            }
            await LikeController.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }

    /**
     * Retrieves a like instance that contains a particular user and a particular tuit
     * @param {Request} req The request from the client, including the path parameters uid and tid representing
     * the user who may have liked the tuit and the tuit that may have been liked
     * @param {Response} res The response to the client, including a JSON object containing the related like
     */
    findUserLikesTuit(req: Request, res: Response) {
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        return LikeController.likeDao.findUserLikesTuit(userId, tid)
            .then(like => res.json(like));
    }
    /**
     * Defines all tuit stats as 0, for testing purposes
     * @param req The request from the client, including the path parameter tid representing the tuit to be
     * reset
     * @param res The response to the client, including a status on whether the update was successful
     * or not
     */
    resetTuitStats(req: Request, res: Response) {
        const resetStats = {
            replies: 0,
            retuits: 0,
            likes: 0,
            dislikes: 0
        }
        return LikeController.tuitDao.updateLikes(req.params.tid, resetStats)
            .then(resetTuit => res.json(resetTuit));
    }
}