import {Request, Response, Express} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.get('/users/:uid/bookmarks', BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            app.get('/tuits/:tid/bookmarks', BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit);
            app.post('/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete('/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userUnbookmarksTuit);
        }
        return BookmarkController.bookmarkController;
    }
    private constructor(){}

    findAllTuitsBookmarkedByUser(req: Request, res: Response) {
        return BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));
    }

    findAllUsersThatBookmarkedTuit(req: Request, res: Response) {
        return BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(req.params.tid)
            .then(bookmarks => res.json(bookmarks));
    }

    userBookmarksTuit(req: Request, res: Response) {
        return BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmark => res.json(bookmark));
    }

    userUnbookmarksTuit(req: Request, res: Response) {
        return BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
    }
}