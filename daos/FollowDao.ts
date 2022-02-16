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
        FollowModel.find({user: uid}).exec();

    findAllUsersThatUserFollows = (uid: string): Promise<Follow[]> =>
        FollowModel.find({followedBy: uid}).exec();

    userFollowsUser = (uid: string, followedUserId: string): Promise<any> =>
        FollowModel.create({user: followedUserId, followedBy: uid});

    userUnfollowsUser = async(uid: string, unfollowedUserId: string): Promise<any> =>
        FollowModel.deleteOne({user: unfollowedUserId, followedBy: uid});

    deleteFollow = async(followId: string): Promise<any> =>
        FollowModel.deleteOne({_id: followId});

    async findAllFollows(): Promise<Follow[]> {
        return FollowModel.find();
    }
}