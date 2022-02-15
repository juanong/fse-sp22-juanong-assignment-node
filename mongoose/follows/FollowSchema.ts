import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

const FollowSchema = new mongoose.Schema<Follow>({
    user: {type: Schema.Types.ObjectId, ref: "FollowModel"},
    followedBy: {type: Schema.Types.ObjectId, ref: "FollowModel"}
}, {collection: "follows"});
export default FollowSchema;