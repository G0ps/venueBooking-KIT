import { Router } from "express";
import imageRouter from "../controllers/image.js";

const serverRouter = Router();

serverRouter.use('/image',imageRouter)

export default serverRouter;