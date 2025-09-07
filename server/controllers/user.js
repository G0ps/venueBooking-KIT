import userModel from "../database/models/user.js"
import {enchrypt} from "../../validators/user.js"

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

export const updateUser = async(req , res) =>{
    try{
        const {_id , newName , newEmail , newContactNumber , newDateOfBirth , newTypeOfUser , newPassword} = req.body;
        if(!_id)
        {
            return res.status(500).json({success : false , message : "ID is required"})
        }
        const currentData = await userModel.findById(_id);
        if(newName)
        {
            currentData.name = newName;
        }
        if(newEmail)
        {
            currentData.email = newEmail;
            currentData.emailVerificationStatus = false;
        }
        if(newContactNumber)
        {
            currentData.contactNumber = newContactNumber;
        }
        if(newDateOfBirth)
        {
            currentData.dateOfBirth = newDateOfBirth;
        }
        if(newTypeOfUser)
        {
            currentData.typeOfUser = newTypeOfUser;
        }
        if(newPassword)
        {
            currentData.password = await enchrypt(newPassword);
        }
        
        return res.status(200).json({success : true , message : "User updated sucessfully"});
    }catch(error){
        return res.status(500).json({success : false , message : error.message})
    }
}

export const deleteUser = async(req , res) => {
    try{
        const {userId} = req.params;

        await userModel.findByIdAndDelete({_id : userId});
        return res.status(200).json({success : true , message : "User Deleted Sucessfully"});
    }
    catch(error){
        return res.status(500).json({success : false , message : error.message})
    }
}