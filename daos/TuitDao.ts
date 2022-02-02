import Tuit from '../models/Tuit';
import TuitModel from '../mongoose/TuitModel';
import TuitDaoI from '../interfaces/TuitDao';

export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}
    async findAllTuits(): Promise<Tuit[]> {
        return TuitModel.find();
    }
    async findTuitsByUser(username: string): Promise<Tuit[]> {
        return TuitModel.find({postedBy: username});
    }
    async findTuitById(tid: string): Promise<any> {
        return TuitModel.findById(tid);
    }
    async createTuit(tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create(tuit);
    }
    async deleteTuit(tid: string): Promise<any> {
        return TuitModel.deleteOne({_id: tid});
    }
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne({_id: tid}, {$set: tuit});
    }
}