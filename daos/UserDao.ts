import User from '../models/users/User';
import UserModel from '../mongoose/users/UserModel';
import UserDaoI from '../interfaces/UserDaoI';

export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;
    public static getInstance = (): UserDao => {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }
    private constructor() {}
    async findAllUsers(): Promise<User[]> {
        return UserModel.find();
    }
    async findUserById(uid: string): Promise<any> {
        return UserModel.findById(uid);
    }
    async createUser(user: User): Promise<User> {
        return await UserModel.create(user);
    }
    async deleteUser(uid: string): Promise<any> {
        return UserModel.deleteOne({_id: uid});
    }
    async updateUser(uid: string, user: User): Promise<any> {
        return UserModel.updateOne({_id: uid}, {$set: user});
    }
    async deleteAllUsers() : Promise<any> {
        return UserModel.deleteMany({});
    }
}