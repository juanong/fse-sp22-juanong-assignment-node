/**
 * @file Implements a DAO that manages all dislikes between a user and a tuit
 */
import Dislike from "../models/dislikes/Dislike";
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikeModel";

/**
 * @class DislikeDao implements a data access object that manages all dislikes data
 * @property {DislikeDao} likeDao is a private instance of Dislike DAO using the singleton pattern
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;
    /**
     * Creates a single instance of the LikeDao
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}

    /**
     * Calls on DislikeModel to determine how many unique users have disliked a particular tuit
     * @param tid {string} primary key of tuit
     */
    countHowManyDislikedTuit = async(tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
    /**
     * Calls on DislikeModel to find if a user has already disliked a particular tuit
     * @param uid {string} primary key of user who has disliked the tuit
     * @param tid {string} primary key of tuit that has been disliked
     */
    findUserDislikesTuit = async(uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});
    /**
     * Calls on DislikeModel to create a new Dislike instance
     * @param tid {string} primary key of tuit being disliked
     * @param uid {string} primary key of user disliking the tuit
     */
    userDislikesTuit = async(tid: string, uid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});
    /**
     * Calls on DislikeModel to delete a Dislike instance
     * @param tid {string} primary key of tuit being undisliked
     * @param uid {string} primary key of user undisliking the tuit
     */
    userUndislikesTuit = async(tid: string, uid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
    /**
     * Calls on DislikeModel to retrieve all tuits that have been disliked by a user
     * @param uid {string} user primary key
     */
    findAllTuitsDislikedByUser = async(uid: string): Promise<Dislike[]> =>
        DislikeModel.find({dislikedBy: uid}).populate("tuit").exec();
}