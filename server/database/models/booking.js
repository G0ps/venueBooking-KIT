import mongoose from "mongoose"
import { bookingTimeValidator } from "./validators.js/booking.js"

const schema = new mongoose.Schema({
    eventName : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    timeData : {
        type : {
            startTime : {type : Date , required : true},
            endTime : {type : Date , required : true}
        },
        required : true,
        validate : {
            validator : bookingTimeValidator
        }
    },
    bookedAmenities : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'amenity'
    },
    bookingStatus : {
        type : String,
        enum : ["BOOKED" , "PENDING" , "COMPLETED" , "REJECTED"],
        default : "PENDING"
    },

})

const model = mongoose.model('booking' , schema , 'booking')

export default model