import { bookingTimeValidator } from "../database/models/validators/booking.js";
import bookingModel from "../database/models/booking.js"

export const addNewBooking = async(req , res) => {
    try{
        const {eventName , description , userId , timeData , venueId} = req.body;
        if(!eventName || !description || !userId || !timeData || !venueId)
        {
            return res.status(500).json({success : false , information : "The data provided is not enough" , data : req.body})
        }
        let validity = await bookingTimeValidator(venueId , timeData.startTime , timeData.endTime);
        if(validity === true)
        {
            const newBooking = new bookingModel(req.body);

            await newBooking.save();

            return res.json({success : true,message : "Success"})
        }
        else {
            return res.status(500).json({success : false, information : "The timing is overlapping"})
        }
    }
    catch(error)
    {
        return res.status(500).json({success : false , error : error.message})
    }
}