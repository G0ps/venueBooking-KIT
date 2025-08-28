import { Router } from "express";
import { addNewBooking } from "../controllers/booking.js";

const bookingRouter = Router();

bookingRouter.post('/add/new' , addNewBooking)

export default bookingRouter;