import Bookmark from "../models/bookmarks/Bookmark";

export default interface BookmarkDaoI {
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;
    findAllUsersThatBookmarkedTuit (tid: string): Promise<Bookmark[]>;
    userBookmarksTuit (uid: string, tid: string): Promise<any>;
    userUnbookmarksTuit (uid: string, tid: string): Promise<any>;
}