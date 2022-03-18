"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikeDao_1 = __importDefault(require("../daos/LikeDao"));
/**
 * @class LikeController Implements RESTful web service API for likes resource
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/likes to retrieve all tuits liked by a user</li>
 *     <li>GET /tuits/:tid/likes to retrieve all users that liked a tuit</li>
 *     <li>POST /users/:uid/likes/:tid to record that a user liked a tuit</li>
 *     <li>DELETE /users/:uid/unlikes/:tid to record that a user no longer likes a tuit</li>
 * </ul>
 * @property {BookmarkDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {BookmarkController} likeController Singleton controller implementing RESTful web service API
 */
class LikeController {
    constructor() { }
    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req The request from the client, including the path parameter uid representing the user
     * who has liked tuits
     * @param {Response} res The response to the client, including the body as a JSON array containing the
     * relevant tuit objects
     */
    findAllTuitsLikedByUser(req, res) {
        return LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then(likes => res.json(likes));
    }
    /**
     * Retrieves all users that liked a specific tuit from the database
     * @param {Request} req The request from the client, including the path parameter tid representing the tuit
     * @param {Response} res The response to the client, including the body as a JSON array containing the
     * relevant user objects
     */
    findAllUsersThatLikedTuit(req, res) {
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
    userLikesTuit(req, res) {
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
    userUnlikesTuit(req, res) {
        return LikeController.likeDao.userUnlikesTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status));
    }
}
exports.default = LikeController;
LikeController.likeDao = LikeDao_1.default.getInstance();
LikeController.likeController = null;
/**
 * Create a single instance of the like controller
 * @param {Express} app Express instance to declare the RESTful web service API
 * @return LikeController
 */
LikeController.getInstance = (app) => {
    if (LikeController.likeController === null) {
        LikeController.likeController = new LikeController();
        app.get('/users/:uid/likes', LikeController.likeController.findAllTuitsLikedByUser);
        app.get("/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
        app.post("/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
        app.delete("/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
    }
    return LikeController.likeController;
};
