/**
 * @file Implements mongoose schema for messages between users
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

/**
 * @typedef Message Represents a message sent from one user to another
 * @property {ObjectId} toUser represents the user receiving the message
 * @proprety {ObjectId} fromUser represents the user sending the message
 * @property {string} message represents the actual content of the message
 * @property {Date} sentOn represents the date the message was sent
 */
const MessageSchema = new mongoose.Schema<Message>({
    toUser: {type: Schema.Types.ObjectId, required: true},
    fromUser: {type: Schema.Types.ObjectId, required: true},
    message: {type: String, required: true},
    sentOn: {type: Date, default: Date.now()}
})
export default MessageSchema;