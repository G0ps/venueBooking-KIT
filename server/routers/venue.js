import Router from "express"
import { addNewVenue, deleteVenue, updateVenue } from "../controllers/venue.js";

const venueRouter = Router();

venueRouter.post('/add/new' , addNewVenue)
venueRouter.patch('/update/venue' , updateVenue)
venueRouter.delete('/delete/venue/:venueId' , deleteVenue)

export default venueRouter