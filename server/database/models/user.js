import mongoose from "mongoose"
import { emailValidator , dateOfBirthValidator, passwordValidator, phoneNumberValidator} from "../../validators/user.js";

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    //contact info
    email : {
        type : String,
        required : true,
        validate : {
            validator : emailValidator
        },
        unique : true,
        message : "Invalid email address"
    },
    contactNumber : {
        type : String,
        required : true,
        validate : {
            validator : phoneNumberValidator
        }
    },
    
    //personal info
    dateOfBirth : {
        type : {
            day : {type : Number , required : true},
            month : {type : Number , required : true},
            year : {type : Number , required : true}
        },
        required : true,
        validate : {
            validator : dateOfBirthValidator
        }
    },
    
    //system info
    typeOfUser : {
        type : String,
        required : true,
        default : "USER",
        enum : ["STAFF" , "MANAGER" , "ADMIN" , "USER"]
    },
    emailVerificationOtp : {
        type : String,
        default : "000000",
        message : "Wrong otp"
    },
    enchryptedPassword : {
        type : String,
        required : true,
        validate : {
            validator : passwordValidator
        }
    },
    passwordResetOtp : {
        type : String,
        default : "000000",
        message : "Wrong otp"
    },

    //date aspects
    joiningDate : {
        type : Date,
        required : true
    },
    lastLoginDate : {
        type : Date,
        required : true
    },

    //stat
    emailVerificationStatus : {
        type : Boolean,
        default : false
    }
})

const model = mongoose.model('user' , schema , 'user');

export default model;