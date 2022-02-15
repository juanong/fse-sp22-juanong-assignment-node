import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import BookmarkController from "./controllers/BookmarkController";
import FollowController from "./controllers/FollowController";
import mongoose from 'mongoose';
const app = express();
app.use(bodyParser.json());
app.get('/hello', (req, res) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
})

mongoose.connect("mongodb+srv://juanong-fse-user:Aobcd8663@fsejuanong.vyxum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const followController = FollowController.getInstance(app);
const PORT = 4000;
app.listen(process.env.PORT || PORT);