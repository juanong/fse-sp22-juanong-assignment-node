/**
 * @file Defines all functionality for Bookmark data access objects
 */
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @interface BookmarkDaoI defines all functionality for Bookmark data access objects
 */
export default interface BookmarkDaoI {
    /**
     * Retrieve all tuits that a specific user has bookmarked
     * @param uid {string} user primary key
     */
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;

    /**
     * Retrieve all users that have bookmarked a specific tuit
     * @param tid {string} tuit primary key
     */
    findAllUsersThatBookmarkedTuit (tid: string): Promise<Bookmark[]>;

    /**
     * Create a bookmark instance
     * @param uid {string} primary key of user who bookmarked the tuit
     * @param tid {string} primary key of tuit that was bookmarked
     */
    userBookmarksTuit (uid: string, tid: string): Promise<any>;

    /**
     * Delete a bookmark instance
     * @param uid {string} primary key of user who bookmarked the tuit
     * @param tid {string} primary key of tuit that is no longer bookmarked
     */
    userUnbookmarksTuit (uid: string, tid: string): Promise<any>;
}