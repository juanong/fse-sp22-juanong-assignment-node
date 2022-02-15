import Follow from "../models/follows/Follow";

export default interface FollowDaoI {
    findAllFollowersOfUser (uid: string): Promise<Follow[]>;
    findAllUsersThatUserFollows (uid: string): Promise<Follow[]>;
    userFollowsUser (followingUserId: string, followedUserId: string): Promise<any>;
    userUnfollowsUser (followingUserId: string, unfollowedUserId: string): Promise<any>;
}