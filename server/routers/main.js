import { Router } from "express";
import imageRouter from "../controllers/image.js";
import userRouter from "./user.js";
import venueRouter from "./venue.js";
import amenityRouter from "./amenity.js";
import bookingRouter from "./booking.js";

const serverRouter = Router();

serverRouter.use('/image',imageRouter)
serverRouter.use('/user' , userRouter)
serverRouter.use('/venue' , venueRouter)
serverRouter.use('/amenity' , amenityRouter)
serverRouter.use('/booking' , bookingRouter)

export default serverRouter;