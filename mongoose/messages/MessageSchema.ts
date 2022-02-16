import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

const MessageSchema = new mongoose.Schema<Message>({
    toUser: {type: Schema.Types.ObjectId, required: true},
    fromUser: {type: Schema.Types.ObjectId, required: true},
    message: {type: String, required: true},
    sentOn: {type: Date, default: Date.now()}
})
export default MessageSchema;