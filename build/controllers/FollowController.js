"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowDao_1 = __importDefault(require("../daos/FollowDao"));
class FollowController {
    constructor() {
        this.findAllFollowersOfUser = (req, res) => FollowController.followDao.findAllFollowersOfUser(req.params.uid)
            .then(follows => res.json(follows));
        this.findAllUsersThatUserFollows = (req, res) => FollowController.followDao.findAllUsersThatUserFollows(req.params.uid)
            .then(follows => res.json(follows));
        this.userFollowsUser = (req, res) => FollowController.followDao.userFollowsUser(req.params.uid, req.params.followedUserId)
            .then(follow => res.json(follow));
    }
    userUnfollowsUser(req, res) {
        FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.unfollowedUserId)
            .then(status => res.send(status));
    }
    deleteFollow(req, res) {
        FollowController.followDao.deleteFollow(req.params.followId)
            .then(status => res.send(status));
    }
    findAllFollows(req, res) {
        FollowController.followDao.findAllFollows().then(follows => res.json(follows));
    }
}
exports.default = FollowController;
FollowController.followController = null;
FollowController.followDao = FollowDao_1.default.getInstance();
FollowController.getInstance = (app) => {
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
};
