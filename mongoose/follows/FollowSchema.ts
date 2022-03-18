/**
 * @file Implements mongoose schema for follows
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

/**
 * @typedef Follow Represents a user following another user
 * @property {ObjectId} user represents the user following another user
 * @proprety {ObjectId} followedBy represents the user being followed
 */
const FollowSchema = new mongoose.Schema<Follow>({
    user: {type: Schema.Types.ObjectId, ref: "FollowModel"},
    followedBy: {type: Schema.Types.ObjectId, ref: "FollowModel"}
}, {collection: "follows"});
export default FollowSchema;