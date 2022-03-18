import Dislike from "../models/dislikes/Dislike";

export default interface DislikeDaoI {
    userDislikesTuit (tid: string, uid: string): Promise<any>;
    userUndislikesTuit (tid: string, uid: string): Promise<any>;
    findUserDislikesTuit (uid: string, tid: string): Promise<any>;
    countHowManyDislikedTuit (tid: string): Promise<any>;
    findAllTuitsDislikedByUser (uid: string): Promise<Dislike[]>;
}