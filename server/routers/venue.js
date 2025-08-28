import Router from "express"
import { addNewVenue } from "../controllers/venue.js";

const venueRouter = Router();

venueRouter.post('/add/new' , addNewVenue)

export default venueRouter