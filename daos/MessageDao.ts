/**
 * @file Implements a DAO that manages all message related data
 */
import Message from "../models/messages/Message";
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";

/**
 * @class MessageDao implements a data access object that manages all message data
 * @property {MessageDao} messageDao is a private instance of Message DAO using the singleton pattern
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    /**
     * Creates a single instance of the MessageDao
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao == null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    /**
     * Calls on MessageModel to retrieve all messages that a user sent
     * @param uid {string} user primary key
     */
    async findAllMessagesUserSent(uid: string): Promise<Message[]> {
        return MessageModel.find({fromUser: uid});
    }
    /**
     * Calls on MessageModel to retrieve all messages that was sent to a user
     * @param uid {string} user primary key
     */
    async findAllMessagesSentToUser(uid: string): Promise<Message[]> {
        return MessageModel.find({toUser: uid});
    }
    /**
     * Calls on MessageModel to retrieve all messages that a user sent to a specific user
     * @param senderUid {string} primary key of sender user
     * @param receiverUid {string} primary key of receiver user
     */
    async findAllMessagesUserSentToUser(senderUid:string, receiverUid:string): Promise<Message[]> {
        return MessageModel.find({toUser: receiverUid, fromUser: senderUid});
    }
    /**
     * Calls on MessageModel to retrieve all messages that a user received from a specific user
     * @param senderUid {string} primary key of sender user
     * @param receiverUid {string} primary key of receiver user
     */
    async findAllMessagesUserReceivedFromUser(senderUid: string, receiverUid: string): Promise<Message[]> {
        return MessageModel.find({toUser: receiverUid, fromUser: senderUid});
    }
    /**
     * Calls on MessageModel to create a new Message instance
     * @param senderUid {string} primary key of sender user
     * @param receiverUid {string} primary key of receiver user
     * @param message {Message} contents of the message being sent
     */
    async userSendsMessage(senderUid: string, receiverUid: string, message: Message): Promise<any> {
        return MessageModel.create({ ...message, toUser: receiverUid, fromUser: senderUid});
    }

    /**
     * Calls on MessageModel to delete a Message instance
     * @param mid {string} message primary key
     */
    async userDeletesMessage(mid: string): Promise<any> {
        return MessageModel.deleteOne({_id: mid});
    }
}