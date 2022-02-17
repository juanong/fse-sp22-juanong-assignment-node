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
const LikeModel_1 = __importDefault(require("../mongoose/likes/LikeModel"));
/**
 * @class BookmarkDao implements a data access object that manages all bookmark data
 * @property {BookmarkDao} bookmarkDao is a private instance of Bookmark DAO using the singleton pattern
 */
class LikeDao {
    constructor() {
        /**
         * Calls on LikeModel to retrieve all users that like a tuit
         * @param tid {string} tuit primary key
         */
        this.findAllUsersThatLikedTuit = (tid) => LikeModel_1.default.find({ tuit: tid }).populate("likedBy").exec();
        /**
         * Calls on LikeModel to retrieve all tuits that have been liked by a user
         * @param uid {string} user primary key
         */
        this.findAllTuitsLikedByUser = (uid) => LikeModel_1.default.find({ likedBy: uid }).populate("tuit").exec();
        /**
         * Calls on LikeModel to create a new Like instance
         * @param tid {string} primary key of tuit being liked
         * @param uid {string} primary key of user liking the tuit
         */
        this.userLikesTuit = (tid, uid) => LikeModel_1.default.create({ tuit: tid, likedBy: uid });
        /**
         * Calls on LikeModel to delete a Like instance
         * @param tid {string} primary key of tuit being unliked
         * @param uid {string} primary key of user unliking the tuit
         */
        this.userUnlikesTuit = (tid, uid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.deleteOne({ tuit: tid, likedBy: uid }); });
    }
}
exports.default = LikeDao;
LikeDao.likeDao = null;
/**
 * Creates a single instance of the LikeDao
 * @returns MessageDao
 */
LikeDao.getInstance = () => {
    if (LikeDao.likeDao === null) {
        LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
};
