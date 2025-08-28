import Router from "express"
import { addNewAmenity } from "../controllers/amenity.js";

const amenityRouter = Router();

amenityRouter.use('/add/new' , addNewAmenity)

export default amenityRouter