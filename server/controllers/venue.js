import venueModel from "../database/models/venue.js"
export const addNewVenue = async(req , res) => {
    
    try{
        const {name , managerId , capacity , inbuiltAmenities} = req.body

        if(!name || !managerId || !capacity ){
            return res.status(500).json({success : false , information : "Data defecient"})
        }

        const newVenue = new venueModel({
            name , managerId , capacity , inbuiltAmenities : inbuiltAmenities?inbuiltAmenities:null
        }
        );

        await newVenue.save();
        return res.json({success : true , message : "Sucessfully added"})
    }
    catch(error)
    {
        return res.status(500).json({success : false , error : error.message})
    }

}