"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = __importDefault(require("../daos/UserDao"));
/**
 * @class UserController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users to retrieve all the user instances</li>
 *     <li>GET /users/:userid to retrieve a particular user instance</li>
 *     <li>POST /users/ to create a new user instance</li>
 *     <li>PUT /users/:userid to modify an individual user instance </li>
 *     <li>DELETE /users/:userid to remove a particular user instance</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {UserController} userController Singleton controller implementing RESTful Web service API
 */
class UserController {
    constructor() {
        /**
         * Retrieves all users from the database and returns an array of users
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllUsers = (req, res) => UserController.userDao.findAllUsers()
            .then(users => res.json(users));
        /**
         * Retrieves a particular user instance
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the user that matches the user ID
         */
        this.findUserById = (req, res) => UserController.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));
        /**
         * Creates a user instance in the database
         * @param {Request} req The request from the client
         * @param {Response} res The response to the client, including the body as a JSON object containing
         * the user to be created
         */
        this.createUser = (req, res) => UserController.userDao.createUser(req.body)
            .then(user => res.json(user));
        /**
         * Deletes a user instance in the database
         * @param {Request} req The request from the client, including the path parameter userid representing
         * the user being deleted
         * @param {Response} res The response to the client, including status on whether deleting the user
         * was successful or not
         */
        this.deleteUser = (req, res) => UserController.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));
        /**
         * Deletes all user instances in the databases
         * @param req {Request} The request from the client
         * @param res {Response} The response to the client, including status on whether deleting the users was
         * successful or not
         */
        this.deleteAllUsers = (req, res) => UserController.userDao.deleteAllUsers()
            .then(status => res.json(status));
        /**
         * Edits a particular instance of a user
         * @param {Request} req Represents request from client, including path
         * parameter userid identifying the primary key of the user to be modified
         * @param {Response} res Represents response to client, including status
         * on whether updating the user was successful or not
         */
        this.updateUser = (req, res) => UserController.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
    }
}
exports.default = UserController;
UserController.userDao = UserDao_1.default.getInstance();
UserController.userController = null;
/**
 * Create a single instance of the user controller
 * @param {Express} app Express instance to declare the RESTful web service API
 * @return UserController
 */
UserController.getInstance = (app) => {
    if (UserController.userController === null) {
        UserController.userController = new UserController();
        app.get('/users', UserController.userController.findAllUsers);
        app.get('/users/:userid', UserController.userController.findUserById);
        app.post('/users', UserController.userController.createUser);
        app.delete('/users/:userid', UserController.userController.deleteUser);
        app.put('/users/:userid', UserController.userController.updateUser);
        app.delete('/users', UserController.userController.deleteAllUsers);
    }
    return UserController.userController;
};
