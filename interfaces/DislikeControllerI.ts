import {Request, Response} from "express";

export default interface DislikeControllerI {
    userDislikesTuit (req: Request, res: Response): void;
    userUndislikesTuit (req: Request, res: Response): void;
    userTogglesDislikeTuit (req: Request, res: Response): void;
}