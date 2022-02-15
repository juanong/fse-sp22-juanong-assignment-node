import User from "../users/User";

export default interface Follow {
    followedUser: User,
    followingUser: User
};