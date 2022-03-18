/**
 * @file Defines the structure of Bookmark objects
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @interface Bookmark represents the structure of a Bookmark object,
 * the relationship represented is a user bookmarks a tuit
 * @typedef Bookmark Represents a bookmark relationship between a user and a tuit
 * @property {Tuit} tuit Tuit being bookmarked
 * @property {User} bookmarkedBy User bookmarking the tuit
 */
export default interface Bookmark {
    tuit: Tuit,
    bookmarkedBy: User
};