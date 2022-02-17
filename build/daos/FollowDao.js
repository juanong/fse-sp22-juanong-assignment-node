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
const FollowModel_1 = __importDefault(require("../mongoose/follows/FollowModel"));
/**
 * @class FollowDao implements a data access object that manages all follows data
 * @property {FollowDao} followDao is a private instance of Follow DAO using the singleton pattern
 */
class FollowDao {
    constructor() {
        /**
         * Calls on FollowModel to retrieve all users that follow a user
         * @param uid {string} user primary key
         */
        this.findAllFollowersOfUser = (uid) => FollowModel_1.default.find({ user: uid }).exec();
        /**
         * Calls on FollowModel to retrieve all users a user is following
         * @param uid {string} user primary key
         */
        this.findAllUsersThatUserFollows = (uid) => FollowModel_1.default.find({ followedBy: uid }).exec();
        /**
         * Calls on FollowModel to create a new Follow instance
         * @param uid {string} primary key of user following another user
         * @param followedUserId {string} primary key of user being followed
         */
        this.userFollowsUser = (uid, followedUserId) => FollowModel_1.default.create({ user: followedUserId, followedBy: uid });
        /**
         * Calls on FollowModel to delete a Follow instance
         * @param uid {string} primary key of user unfollowing another user
         * @param unfollowedUserId {string} primary key of user being unfollowed
         */
        this.userUnfollowsUser = (uid, unfollowedUserId) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteOne({ user: unfollowedUserId, followedBy: uid }); });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
/**
 * Creates a single instance of the FollowDao
 * @returns FollowDao
 */
FollowDao.getInstance = () => {
    if (FollowDao.followDao == null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
