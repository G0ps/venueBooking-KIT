import Router from "express"
import { addNewAmenity, updateAmenity } from "../controllers/amenity.js";

const amenityRouter = Router();

amenityRouter.post('/add/new' , addNewAmenity)
amenityRouter.patch('/update/amenity' , updateAmenity)

export default amenityRouter