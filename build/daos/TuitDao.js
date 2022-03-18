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
const TuitModel_1 = __importDefault(require("../mongoose/tuits/TuitModel"));
/**
 * @class TuitDao implements a data access object that manages all tuit data
 * @property {TuitDao} tuitDao is a private instance of Tuit DAO using the singleton pattern
 */
class TuitDao {
    constructor() { }
    /**
     * Calls on TuitModel to retrieve all tuits
     */
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.find();
        });
    }
    /**
     * Calls on TuitModel to retrieve all tuits posted by a user
     * @param uid {string} user primary key
     */
    findAllTuitsByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.find({ postedBy: uid });
        });
    }
    /**
     * Calls on TuitModel to retrieve a specific tuit
     * @param tid {string} tuit primary key
     */
    findTuitById(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.findById(tid);
        });
    }
    /**
     * Calls on TuitModel to create a new instance of a tuit posted by a user
     * @param uid {string} user primary key
     * @param tuit {string} tuit content
     */
    createTuitByUser(uid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.create(Object.assign(Object.assign({}, tuit), { postedBy: uid }));
        });
    }
    /**
     * Calls on TuitModel to delete an instance of a tuit
     * @param tid {string} tuit primary key
     */
    deleteTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.deleteOne({ _id: tid });
        });
    }
    /**
     * Calls on TuitModel to update an existing tuit with a new tuit object
     * @param tid {string} tuit primary key
     * @param tuit {Tuit} tuit to replace the exiting tuit
     */
    updateTuit(tid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: tuit });
        });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
/**
 * Creates a single instance of the TuitDao
 * @returns TuitDao
 */
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
