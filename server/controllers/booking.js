import { bookingTimeValidator } from "../database/models/validators/booking.js";
import bookingModel from "../database/models/booking.js"

export const addNewBooking = async(req , res) => {
    try{
        const {eventName , description , userId , timeData , venueId} = req.body;
        if(!eventName || !description || !userId || !timeData || !venueId)
        {
            return res.json({success : false , information : "The data provided is not enough" , data : req.body})
        }

        if(bookingTimeValidator(venueId , timeData.startTime , timeData.endTime))
        {
            const newBooking = new bookingModel(req.body);

            await newBooking.save();

            return res.json({success : true,message : "Success"})
        }
        else {
            return res.json({success : false, information : "The timing is overlapping"})
        }
    }
    catch(error)
    {
        return res.json({success : false , error : error.message})
    }
}