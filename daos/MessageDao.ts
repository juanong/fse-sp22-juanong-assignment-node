import Message from "../models/messages/Message";
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao == null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    async findAllMessagesUserSent(uid: string): Promise<Message[]> {
        return MessageModel.find({fromUser: uid});
    }
    async findAllMessagesSentToUser(uid: string): Promise<Message[]> {
        return MessageModel.find({toUser: uid});
    }
    async findAllMessagesUserSentToUser(senderUid:string, receiverUid:string): Promise<Message[]> {
        return MessageModel.find({toUser: receiverUid, fromUser: senderUid});
    }
    async findAllMessagesUserReceivedFromUser(senderUid: string, receiverUid: string): Promise<Message[]> {
        return MessageModel.find({toUser: receiverUid, fromUser: senderUid});
    }
    async userSendsMessage(senderUid: string, receiverUid: string, message: string): Promise<any> {
        return MessageModel.create({toUser: receiverUid, fromUser: senderUid, message});
    }
    async userDeletesMessage(mid: string): Promise<any> {
        return MessageModel.deleteOne({_id: mid});
    }
}