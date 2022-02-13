import {Request, Response} from "express";

export default interface BookmarkControllerI {
    findAllTuitsBookmarkedByUser(req: Request, res: Response): void;
    findAllUsersThatBookmarkedTuit(req: Request, res: Response): void;
    userBookmarksTuit(req: Request, res: Response): void;
    userUnbookmarksTuit(req: Request, res: Response): void;
}