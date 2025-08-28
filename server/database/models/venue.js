import mongoose from "mongoose"
import { capacityValidator } from "./validators.js/venue"

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    managerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    capacity : {
        type : Number,
        required : true,
        validate : {
            validator : capacityValidator
        }
    },
    inbuiltAmenities : {
        type : [{
            name : {type : String},
            condition : {type : String , enum : ["WORKING" , "UNDER_MAINTANACE"] , default : "WORKING"}
        }]
    },
    isWorking : {
    type : String,
    enum : ["WORKING" , "REPAIR"],
    default : "WORKING"
  }
})

const model = mongoose.model('name' , schema , 'name')