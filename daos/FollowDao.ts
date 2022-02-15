import Follow from "../models/follows/Follow";
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao == null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor(){}

    findAllFollowersOfUser = (uid: string): Promise<Follow[]> =>
        FollowModel.find({followedUser: uid}).populate("followingUser").exec();


    findAllUsersThatUserFollows = (uid: string): Promise<Follow[]> =>
        FollowModel.find({followingUser: uid}).populate("followedUser").exec();


    userFollowsUser = (followingUserId: string, followedUserId: string): Promise<any> =>
        FollowModel.create({followingUser: followedUserId, followedUser: followedUserId});

    userUnfollowsUser = async(followingUserId: string, unfollowedUserId: string): Promise<any> =>
        FollowModel.deleteOne({followingUser: followingUserId, followedUser: unfollowedUserId});
}