import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

const FollowSchema = new mongoose.Schema<Follow>({
    // not sold on naming of these fields, hard to interpret
    followedUser: {type: Schema.Types.ObjectId, ref: "FollowModel"},
    followingUser: {type: Schema.Types.ObjectId, ref: "FollowModel"}
}, {collection: "follows"});
export default FollowSchema;