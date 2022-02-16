import {Request, Response, Express} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

export default class FollowController implements FollowControllerI {
    private static followController: FollowController | null = null;
    private static followDao: FollowDao = FollowDao.getInstance();
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController == null) {
            FollowController.followController = new FollowController();
            app.get('/follows', FollowController.followController.findAllFollows);
            app.get('/users/:uid/followers', FollowController.followController.findAllFollowersOfUser);
            app.get('/users/:uid/following', FollowController.followController.findAllUsersThatUserFollows);
            app.post('/users/:uid/follows/:followedUserId', FollowController.followController.userFollowsUser);
            app.delete('/users/:uid/unfollows/:unfollowedUserId', FollowController.followController.userUnfollowsUser);
            app.delete('/follows/:followId', FollowController.followController.deleteFollow);
        }
        return FollowController.followController;
    }
    private constructor(){}

    findAllFollowersOfUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowersOfUser(req.params.uid)
            .then(follows => res.json(follows));

    findAllUsersThatUserFollows = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatUserFollows(req.params.uid)
            .then(follows => res.json(follows));

    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid, req.params.followedUserId)
            .then(follow => res.json(follow));

    userUnfollowsUser(req: Request, res: Response) {
        FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.unfollowedUserId)
            .then(status => res.send(status));
    }
    deleteFollow(req: Request, res: Response) {
        FollowController.followDao.deleteFollow(req.params.followId)
            .then(status => res.send(status));
    }
    findAllFollows(req: Request, res: Response) {
        FollowController.followDao.findAllFollows().then(follows => res.json(follows));
    }
}