import {Request, Response} from "express";

export default interface FollowControllerI {
    findAllFollowersOfUser(req: Request, res: Response): void;
    findAllUsersThatUserFollows(req: Request, res: Response): void;
    userFollowsUser(req: Request, res: Response): void;
    userUnfollowsUser(req: Request, res: Response): void;
}