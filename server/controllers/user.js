import userModel from "../database/models/user.js"
import {enchrypt} from "../database/models/validators/user.js"

export const addUser = async(req , res) =>{
    try{
        const {name , email , contactNumber , dateOfBirth , typeOfUser , password} = req.body;
        if(!name || !email || !contactNumber || !dateOfBirth || !password || !typeOfUser) 
        {
            return res.status(500).json({success : false, message : "Data is not enough"})
        }

        const enchryptedPassword = await enchrypt(password);
        const newUser = new userModel(
            {
                name : name,
                email : email,
                contactNumber : contactNumber,
                dateOfBirth : dateOfBirth,
                typeOfUser : typeOfUser,
                enchryptedPassword : enchryptedPassword,
                joiningDate : new Date(Date.now()),
                lastLoginDate : new Date(Date.now())
            }
        )
        await newUser.save();

        return res.json({success : true , message : "sucessfully created"})
    }
    catch(error)
    {
        return res.status(500).json({success : false , error : error.message})
    }
}