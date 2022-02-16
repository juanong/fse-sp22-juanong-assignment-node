import {Request, Response, Express} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    public static getInstance = (app: Express) : MessageController => {
        if (MessageController.messageController == null) {
            MessageController.messageController = new MessageController();
            // all paths here
            app.get('/users/:uid/messagesSent',
                MessageController.messageController.findAllMessagesUserSent);
            app.get('/users/:uid/messagesReceived',
                MessageController.messageController.findAllMessagesSentToUser);
            app.get('/users/:senderUid/messagesSent/:receiverUid',
                MessageController.messageController.findAllMessagesUserSentToUser);
            app.get('/users/:receiverUid/messagesReceived/:senderUid',
                MessageController.messageController.findAllMessagesUserReceivedFromUser);
            app.post('/users/:senderUid/messages/:receiverUid',
                MessageController.messageController.userSendsMessage);
            app.delete('/messages/:mid',
                MessageController.messageController.userDeletesMessage);
        }
        return MessageController.messageController;
    }
    private constructor() {}

    findAllMessagesUserSent = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesUserSent(req.params.uid)
            .then(messages => res.json(messages));

    findAllMessagesSentToUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentToUser(req.params.uid)
            .then(messages => res.json(messages));

    findAllMessagesUserSentToUser(req: Request, res: Response) {
        MessageController.messageDao.findAllMessagesUserSentToUser(req.params.senderUid, req.params.receiverUid)
            .then(messages => res.json(messages));
    }

    findAllMessagesUserReceivedFromUser(req: Request, res: Response) {
        MessageController.messageDao.findAllMessagesUserReceivedFromUser(req.params.senderUid, req.params.receiverUid)
            .then(messages => res.json(messages));
    }

    userSendsMessage(req: Request, res: Response) {
        MessageController.messageDao.userSendsMessage(req.params.senderUid, req.params.receiverUid, req.body)
            .then(message => res.json(message));
    }

    userDeletesMessage(req: Request, res: Response) {
        MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.send(status));
    }
}