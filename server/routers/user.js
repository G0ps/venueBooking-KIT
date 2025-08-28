import Router from "express"
import { addUser } from "../controllers/user.js";

const userRouter = Router();

userRouter.post('/add/new' , addUser);

export default userRouter