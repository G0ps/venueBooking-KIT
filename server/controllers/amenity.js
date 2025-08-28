import amenityModel from "../database/models/amenity.js"

export const addNewAmenity = async(req , res) => {
    
    try{
        const {name , instances} = req.body

        if(!name || !instances){
            return res.status(500).json({success : false , information : "Data defecient"})
        }
        
        const newAmenity = new amenityModel({
            name,
            instances
        })
        await newAmenity.save()

        return res.json({success : true , message : "Sucessfully added"})
    }
    catch(error)
    {
        return res.status(500).json({success : false , error : error.message})
    }
}