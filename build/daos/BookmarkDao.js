"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookmarkModel_1 = __importDefault(require("../mongoose/bookmarks/BookmarkModel"));
/**
 * @class BookmarkDao implements a data access object that manages all bookmark data
 * @property {BookmarkDao} bookmarkDao is a private instance of Bookmark DAO using the singleton pattern
 */
class BookmarkDao {
    constructor() {
        /**
         * Calls on BookmarkModel to retrieve all tuits bookmarked by single user,
         * and populates the tuit references
         * @param uid {string} user primary key
         */
        this.findAllTuitsBookmarkedByUser = (uid) => BookmarkModel_1.default.find({ bookmarkedBy: uid }).populate("tuit").exec();
        /**
         * Calls on BookmarkModel to retrieve all users that have bookmarked a specific tuit,
         * and populates the user references
         * @param tid {string} tuit primary key
         */
        this.findAllUsersThatBookmarkedTuit = (tid) => BookmarkModel_1.default.find({ tuit: tid }).populate("bookmarkedBy").exec();
        /**
         * Calls on BookmarkModel to create a new Bookmark instance
         * @param uid {string} user primary key
         * @param tid {string} tuit primary key
         */
        this.userBookmarksTuit = (uid, tid) => BookmarkModel_1.default.create({ tuit: tid, bookmarkedBy: uid });
        /**
         * Calls on BookmarkModel to delete an existing instance of Bookmark
         * @param uid {string} user primary key
         * @param tid {string} tuit primary key
         */
        this.userUnbookmarksTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.deleteOne({ tuid: tid, bookmarkedBy: uid }); });
    }
    ;
}
exports.default = BookmarkDao;
BookmarkDao.bookmarkDao = null;
/**
 * Creates a single instance of the BookmarkDao
 * @returns BookmarkDao
 */
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao === null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};
