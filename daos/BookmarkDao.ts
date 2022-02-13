import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {
    };

    findAllTuitsBookmarkedByUser = (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy: uid}).populate("tuit").exec();

    findAllUsersThatBookmarkedTuit = (tid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({tuit: tid}).populate("bookmarkedBy").exec();

    userBookmarksTuit = (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({tuit: tid, bookmarkedBy: uid});

    userUnbookmarksTuit = async(uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({tuid: tid, bookmarkedBy: uid});
}
