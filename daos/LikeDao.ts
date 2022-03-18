/**
 * @file Implements a DAO that manages all likes between a user and a tuit
 */
import Like from "../models/likes/Like";
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";

/**
 * @class LikeDao implements a data access object that manages all likes data
 * @property {LikeDao} likeDao is a private instance of Like DAO using the singleton pattern
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    /**
     * Creates a single instance of the LikeDao
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    /**
     * Calls on LikeModel to retrieve all users that like a tuit
     * @param tid {string} tuit primary key
     */
    findAllUsersThatLikedTuit = (tid: string): Promise<Like[]> =>
        LikeModel.find({tuit: tid}).populate("likedBy").exec();
    /**
     * Calls on LikeModel to retrieve all tuits that have been liked by a user
     * @param uid {string} user primary key
     */
    findAllTuitsLikedByUser = (uid: string): Promise<Like[]> =>
        LikeModel.find({likedBy: uid}).populate("tuit").exec();
    /**
     * Calls on LikeModel to create a new Like instance
     * @param tid {string} primary key of tuit being liked
     * @param uid {string} primary key of user liking the tuit
     */
    userLikesTuit = (tid: string, uid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Calls on LikeModel to delete a Like instance
     * @param tid {string} primary key of tuit being unliked
     * @param uid {string} primary key of user unliking the tuit
     */
    userUnlikesTuit = async(tid: string, uid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});

    /**
     * Calls on LikeModel to find if a user has already liked a particular tuit
     * @param uid {string} primary key of user who has liked the tuit
     * @param tid {string} primary key of tuit that has been liked
     */
    findUserLikesTuit = async(uid: string, tid: string): Promise<any> =>
        LikeModel.findOne({tuit: tid, likedBy: uid});

    /**
     * Calls on LikeModel to determine how many unique users have liked a particular tuit
     * @param tid {string} primary key of tuit
     */
    countHowManyLikedTuit = async(tid: string): Promise<any> =>
        LikeModel.count({tuit: tid});
}