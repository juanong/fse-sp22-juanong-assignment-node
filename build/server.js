"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get('/hello', (req, res) => res.send('Hello World!'));
app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
});
mongoose_1.default.connect("mongodb+srv://juanong-fse-user:Aobcd8663@fsejuanong.vyxum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
const likeController = LikeController_1.default.getInstance(app);
const bookmarkController = BookmarkController_1.default.getInstance(app);
const followController = FollowController_1.default.getInstance(app);
const messageController = MessageController_1.default.getInstance(app);
const PORT = 4000;
app.listen(process.env.PORT || PORT);
