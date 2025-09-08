import { amenityOverlapChecker, bookingTimeValidator , overlapEliminator , amenityBookingPart} from "../validators/booking.js";
import bookingModel from "../database/models/booking.js"

export const addNewBooking = async(req , res) => {
    try{
        let {eventName , description , userId , timeData , venueId , bookedAmenities} = req.body;
        if(!eventName || !description || !userId || !timeData || !venueId)
        {
            return res.status(500).json({success : false , information : "The data provided is not enough" , data : req.body})
        }
        let validity = await bookingTimeValidator(venueId , timeData.startTime , timeData.endTime);
        if(validity === true)
        {
            const newBooking = new bookingModel({eventName , description , userId , timeData , venueId });
            let cancelationStatement = "";

            if(bookedAmenities)
            {
                newBooking.bookedAmenities = await amenityOverlapChecker(bookedAmenities , timeData)
            }
            // cancelationStatement = await amenityOverlapChecker(newBooking.bookedAmenities)

            await newBooking.save();

            return res.json({success : true,message : "Success" , amenityBookingStat : cancelationStatement})
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

export const approveBooking = async(req , res) =>{
    try{
        const {bookingId} = req.body;

        if(!bookingId)
        {
            return res.status(500).json({success : false , message : "Booking Id is manditory"})
        }

        const bookingData = await bookingModel.findById(bookingId);
        // console.log(bookingData)
        bookingData.bookingStatus = "BOOKED";
        bookingData.bookedAmenities = await amenityBookingPart(bookingData.bookedAmenities , bookingData.timeData)
        await overlapEliminator(bookingData.venueId , bookingData.timeData.startTime , bookingData.timeData.endTime)
        await bookingData.save();

        return res.status(200).json({success : true , message : "Approved Sucessfully"});
    }catch(error){
        return res.status(500).json({success : false , message : error.message})
    }
}

export const deleteBooking = async(req , res) =>{
    try{
        const {} = req.body;
        return res.status(200).json({success : true , message : "Booking deleted"});
    }catch(error){
        return res.status(500).json({success : false , message : error.message})
    }
}