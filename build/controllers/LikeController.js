"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikeDao_1 = __importDefault(require("../daos/LikeDao"));
class LikeController {
    constructor() { }
    findAllTuitsLikedByUser(req, res) {
        return LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then(likes => res.json(likes));
    }
    findAllUsersThatLikedTuit(req, res) {
        return LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
    }
    userLikesTuit(req, res) {
        return LikeController.likeDao.userLikesTuit(req.params.tid, req.params.uid)
            .then(like => res.json(like));
    }
    userUnlikesTuit(req, res) {
        return LikeController.likeDao.userUnlikesTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status));
    }
}
exports.default = LikeController;
LikeController.likeDao = LikeDao_1.default.getInstance();
LikeController.likeController = null;
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
