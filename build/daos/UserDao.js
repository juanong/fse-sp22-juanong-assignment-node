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
const UserModel_1 = __importDefault(require("../mongoose/users/UserModel"));
/**
 * @class UserDao implements a data access object that manages all user data
 * @property {UserDao} userDao is a private instance of user DAO using the singleton pattern
 */
class UserDao {
    constructor() { }
    /**
     * Calls on UserModel to retrieve all users
     */
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.find();
        });
    }
    /**
     * Calls on UserModel to retrieve a particular user instance
     * @param uid {string} primary key of user to be retrieved
     */
    findUserById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.findById(uid);
        });
    }
    /**
     * Calls on UserModel to create a new instance of a user
     * @param user {User} User to be added to the database
     */
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.create(user);
        });
    }
    /**
     * Calls on UserModel to delete an instance of a user
     * @param uid {string} primary key ot user to be deleted
     */
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.deleteOne({ _id: uid });
        });
    }
    /**
     * Calls on UserModel to update an existing user with a new user object
     * @param uid {string} user primary key
     * @param user {User} user to replace the exiting user
     */
    updateUser(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.updateOne({ _id: uid }, { $set: user });
        });
    }
    /**
     * Calls on UserModel to delete all user instances
     */
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.deleteMany({});
        });
    }
}
exports.default = UserDao;
UserDao.userDao = null;
/**
 * Creates a single instance of the UserDao
 * @returns UserDao
 */
UserDao.getInstance = () => {
    if (UserDao.userDao === null) {
        UserDao.userDao = new UserDao();
    }
    return UserDao.userDao;
};
