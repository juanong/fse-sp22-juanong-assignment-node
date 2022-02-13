import {Request, Response, Express} from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeControllerI";

export default class LikeController implements LikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null;
    public static getInstance = (app: Express): LikeController => {
        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.get('/users/:uid/likes', LikeController.likeController.findAllTuitsLikedByUser);
            app.get("/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
            app.post("/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
            app.delete("/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
        }
        return LikeController.likeController;
    }
    private constructor(){}

    findAllTuitsLikedByUser(req: Request, res: Response) {
        return LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then(likes => res.json(likes));
    }

    findAllUsersThatLikedTuit(req: Request, res: Response) {
        return LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
    }

    userLikesTuit(req: Request, res: Response) {
        return LikeController.likeDao.userLikesTuit(req.params.tid, req.params.uid)
            .then(like => res.json(like));
    }

    userUnlikesTuit(req: Request, res: Response) {
        return LikeController.likeDao.userUnlikesTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status));
    }
}