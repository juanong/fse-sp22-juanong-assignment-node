import {Request, Response, Express} from "express";
import DislikeDao from "../daos/DislikeDao";
import DislikeControllerI from "../interfaces/DislikeControllerI";
import TuitDao from "../daos/TuitDao";
import LikeDao from "../daos/LikeDao";
import LikeController from "./LikeController";

export default class DislikeController implements DislikeControllerI {
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static dislikeController: DislikeController | null = null;

    public static getInstance = (app: Express): DislikeController => {
        if (DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();
            app.put("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userTogglesDislikeTuit);
            app.post("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userDislikesTuit);
            app.delete("/api/users/:uid/undislikes/:tid", DislikeController.dislikeController.userUndislikesTuit);
            app.get("/api/users/:uid/dislikes", DislikeController.dislikeController.findAllTuitsDislikedByUser);
            app.get("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.findUserDislikesTuit);
        }
        return DislikeController.dislikeController;
    }

    userTogglesDislikeTuit = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyDislikedTuit = await DislikeController.dislikeDao
                .findUserDislikesTuit(userId, tid);
            const howManyDislikedTuit = await DislikeController.dislikeDao
                .countHowManyDislikedTuit(tid);
            const howManyLikedTuit = await DislikeController.likeDao
                .countHowManyLikedTuit(tid);
            let tuit = await DislikeController.tuitDao.findTuitById(tid);
            if (userAlreadyDislikedTuit) {
                await DislikeController.dislikeDao.userUndislikesTuit(tid, userId);
                tuit.stats.dislikes = howManyDislikedTuit - 1;
            } else {
                await DislikeController.dislikeDao.userDislikesTuit(tid, userId);
                tuit.stats.dislikes = howManyDislikedTuit + 1;
                // decrement likes, undislike the tuit
                await DislikeController.likeDao.userUnlikesTuit(tid, userId);
                tuit.stats.likes = Math.max(howManyLikedTuit - 1, 0);
            }
            await DislikeController.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(400);
        }
    }

    userDislikesTuit (req: Request, res: Response) {
        return DislikeController.dislikeDao.userDislikesTuit(req.params.tid, req.params.uid)
            .then(dislike => res.json(dislike));
    }

    userUndislikesTuit(req: Request, res: Response) {
        return DislikeController.dislikeDao.userUndislikesTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status));
    }

    findAllTuitsDislikedByUser(req: Request, res: Response) {
        return DislikeController.dislikeDao.findAllTuitsDislikedByUser(req.params.uid)
            .then(dislikes => res.json(dislikes));
    }

    findUserDislikesTuit(req: Request, res: Response) {
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        return DislikeController.dislikeDao.findUserDislikesTuit(userId, tid)
            .then(dislike => res.json(dislike));
    }
}