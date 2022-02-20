/**
 * @file Controller RESTful web service API for messages resource
 */
import {Request, Response, Express} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

/**
 * @class MessageController Implements RESTful web service API for messages resource
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/messagesSent to retrieve all messages sent by a user</li>
 *     <li>GET /users/:tid/messagesReceived to retrieve all messages received by a user</li>
 *     <li>GET /users/:senderUid/messagesSent/:receiverUid to retrieve all messages a user sent to a specific user
 *     <li>GET /users/:receiverUid/messagesSent/:senderUid to retrieve all messages a user received from a specific user
 *     <li>POST /users/:senderUid/messages/:receiverUid to record that a user messaged another user</li>
 *     <li>DELETE /messages/:mid to delete a message</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing RESTful web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Create a single instance of the message controller
     * @param {Express} app Express instance to declare the RESTful web service API
     * @return MessageController
     */
    public static getInstance = (app: Express) : MessageController => {
        if (MessageController.messageController == null) {
            MessageController.messageController = new MessageController();
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

    /**
     * Retrieves all messages sent by a user from the database
     * @param {Request} req The request from the client, including the path parameter uid representing the user
     * who has sent messages
     * @param {Response} res The response to the client, including the body as a JSON array containing the
     * relevant message objects
     */
    findAllMessagesUserSent = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesUserSent(req.params.uid)
            .then(messages => res.json(messages));
    /**
     * Retrieves all messages sent to a user from the database
     * @param {Request} req The request from the client, including the path parameter uid representing the user
     * who has received messages
     * @param {Response} res The response to the client, including the body as a JSON array containing the
     * relevant message objects
     */
    findAllMessagesSentToUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentToUser(req.params.uid)
            .then(messages => res.json(messages));
    /**
     * Retrieves all messages a user sent to a user from the database
     * @param {Request} req The request from the client, including the path parameter senderUid representing the user
     * who has sent messages and receiverUid representing the user who has received messages
     * @param {Response} res The response to the client, including the body as a JSON array containing the
     * relevant message objects
     */
    findAllMessagesUserSentToUser(req: Request, res: Response) {
        MessageController.messageDao.findAllMessagesUserSentToUser(req.params.senderUid, req.params.receiverUid)
            .then(messages => res.json(messages));
    }
    /**
     * Retrieves all messages a user reveived from a user from the database
     * @param {Request} req The request from the client, including the path parameter senderUid representing the user
     * who has sent messages and receiverUid representing the user who has received messages
     * @param {Response} res The response to the client, including the body as a JSON array containing the
     * relevant message objects
     */
    findAllMessagesUserReceivedFromUser(req: Request, res: Response) {
        MessageController.messageDao.findAllMessagesUserReceivedFromUser(req.params.senderUid, req.params.receiverUid)
            .then(messages => res.json(messages));
    }
    /**
     * Creates a message instance in the database
     * @param {Request} req The request from the client, including the path parameters senderUid and receiverUid representing
     * the user sending a message to another user and the message being created
     * @param {Response} res The response to the client, including the body as a JSON object containing
     * the new bookmark
     */
    userSendsMessage(req: Request, res: Response) {
        MessageController.messageDao.userSendsMessage(req.params.senderUid, req.params.receiverUid, req.body)
            .then(message => res.json(message));
    }
    /**
     * Deletes a message instance in the database
     * @param {Request} req The request from the client, including the path parameters mid representing
     * the message being deleted
     * @param {Response} res The response to the client, including status on whether deleting the message
     * was successful or not
     */
    userDeletesMessage(req: Request, res: Response) {
        MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.send(status));
    }
}