/**
 * @file Implements a DAO that manages all follow related data
 */
import Follow from "../models/follows/Follow";
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";

/**
 * @class FollowDao implements a data access object that manages all follows data
 * @property {FollowDao} followDao is a private instance of Follow DAO using the singleton pattern
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    /**
     * Creates a single instance of the FollowDao
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao == null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor(){}
    /**
     * Calls on FollowModel to retrieve all users that follow a user
     * @param uid {string} user primary key
     */
    findAllFollowersOfUser = (uid: string): Promise<Follow[]> =>
        FollowModel.find({user: uid}).exec();
    /**
     * Calls on FollowModel to retrieve all users a user is following
     * @param uid {string} user primary key
     */
    findAllUsersThatUserFollows = (uid: string): Promise<Follow[]> =>
        FollowModel.find({followedBy: uid}).exec();
    /**
     * Calls on FollowModel to create a new Follow instance
     * @param uid {string} primary key of user following another user
     * @param followedUserId {string} primary key of user being followed
     */
    userFollowsUser = (uid: string, followedUserId: string): Promise<any> =>
        FollowModel.create({user: followedUserId, followedBy: uid});
    /**
     * Calls on FollowModel to delete a Follow instance
     * @param uid {string} primary key of user unfollowing another user
     * @param unfollowedUserId {string} primary key of user being unfollowed
     */
    userUnfollowsUser = async(uid: string, unfollowedUserId: string): Promise<any> =>
        FollowModel.deleteOne({user: unfollowedUserId, followedBy: uid});
}