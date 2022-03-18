import Follow from "../models/follows/Follow";

export default interface FollowDaoI {
    findAllFollowersOfUser (uid: string): Promise<Follow[]>;
    findAllUsersThatUserFollows (uid: string): Promise<Follow[]>;
    userFollowsUser (uid: string, followedUserId: string): Promise<any>;
    userUnfollowsUser (uid: string, unfollowedUserId: string): Promise<any>;
}