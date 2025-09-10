import { Router } from "express";
import { addNewBooking, approveBooking, rejectBooking } from "../controllers/booking.js";

const bookingRouter = Router();

bookingRouter.post('/add/new' , addNewBooking)
// bookingRouter.delete('/delete/booking' , deleteBooking)

// booking management
bookingRouter.post('/approve/booking' , approveBooking)
bookingRouter.post('/reject/booking' , rejectBooking)

export default bookingRouter;