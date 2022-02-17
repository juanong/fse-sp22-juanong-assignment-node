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
const MessageModel_1 = __importDefault(require("../mongoose/messages/MessageModel"));
/**
 * @class MessageDao implements a data access object that manages all message data
 * @property {MessageDao} messageDao is a private instance of Message DAO using the singleton pattern
 */
class MessageDao {
    constructor() { }
    /**
     * Calls on MessageModel to retrieve all messages that a user sent
     * @param uid {string} user primary key
     */
    findAllMessagesUserSent(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.find({ fromUser: uid });
        });
    }
    /**
     * Calls on MessageModel to retrieve all messages that was sent to a user
     * @param uid {string} user primary key
     */
    findAllMessagesSentToUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.find({ toUser: uid });
        });
    }
    /**
     * Calls on MessageModel to retrieve all messages that a user sent to a specific user
     * @param senderUid {string} primary key of sender user
     * @param receiverUid {string} primary key of receiver user
     */
    findAllMessagesUserSentToUser(senderUid, receiverUid) {
        return __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.find({ toUser: receiverUid, fromUser: senderUid });
        });
    }
    /**
     * Calls on MessageModel to retrieve all messages that a user received from a specific user
     * @param senderUid {string} primary key of sender user
     * @param receiverUid {string} primary key of receiver user
     */
    findAllMessagesUserReceivedFromUser(senderUid, receiverUid) {
        return __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.find({ toUser: receiverUid, fromUser: senderUid });
        });
    }
    /**
     * Calls on MessageModel to create a new Message instance
     * @param senderUid {string} primary key of sender user
     * @param receiverUid {string} primary key of receiver user
     * @param message {Message} contents of the message being sent
     */
    userSendsMessage(senderUid, receiverUid, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.create(Object.assign(Object.assign({}, message), { toUser: receiverUid, fromUser: senderUid }));
        });
    }
    /**
     * Calls on MessageModel to delete a Message instance
     * @param mid {string} message primary key
     */
    userDeletesMessage(mid) {
        return __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.deleteOne({ _id: mid });
        });
    }
}
exports.default = MessageDao;
MessageDao.messageDao = null;
/**
 * Creates a single instance of the MessageDao
 * @returns MessageDao
 */
MessageDao.getInstance = () => {
    if (MessageDao.messageDao == null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
