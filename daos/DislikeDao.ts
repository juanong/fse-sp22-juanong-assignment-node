import Dislike from "../models/dislikes/Dislike";
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikeModel";

export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}
    countHowManyDislikedTuit = async(tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});


    findUserDislikesTuit = async(uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    userDislikesTuit = async(tid: string, uid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});


    userUndislikesTuit = async(tid: string, uid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    findAllTuitsDislikedByUser = async(uid: string): Promise<Dislike[]> =>
        DislikeModel.find({dislikedBy: uid}).populate("tuit").exec();
}