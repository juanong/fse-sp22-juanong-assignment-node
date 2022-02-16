import {Request, Response} from "express";

export default interface MessageControllerI {
    findAllMessagesUserSent(req: Request, res: Response): void;
    findAllMessagesSentToUser(req: Request, res: Response): void;
    findAllMessagesUserSentToUser(req: Request, res: Response): void;
    findAllMessagesUserReceivedFromUser(req: Request, res: Response): void;
    userSendsMessage(req: Request, res: Response): void;
    userDeletesMessage(req: Request, res: Response): void;
}