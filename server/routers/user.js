import Router from "express"
import { addUser, deleteUser, updateUser } from "../controllers/user.js";

const userRouter = Router();

userRouter.post('/add/new' , addUser);
userRouter.patch('/update/user' , updateUser)
userRouter.delete('/delete/user/:userId' , deleteUser)

export default userRouter