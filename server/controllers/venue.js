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

export const updateVenue = async (req, res) => {
    const { _id, newName, newCapacity, newManagerId, deletedAmenityIndexes, newInbuiltAmenities } = req.body;
    try{
        if (!_id) {
        return res.status(400).json({ success: false, message: "Id required" });
        }

        const currentVenueData = await venueModel.findById(_id);
        if (!currentVenueData) {
            return res.status(404).json({ success: false, message: "Venue not found" });
        }

        if (newName) {
            currentVenueData.name = newName;
        }
        if (newCapacity > 0) {
            currentVenueData.capacity = newCapacity;
        }
        if (newManagerId) {
            currentVenueData.managerId = newManagerId;
        }
        if (deletedAmenityIndexes) {
            currentVenueData.inbuiltAmenities = currentVenueData.inbuiltAmenities.filter((amenity, index) => {
                return !(deletedAmenityIndexes.includes(index));
            });
        }
        if (newInbuiltAmenities) {
            currentVenueData.inbuiltAmenities.push(...newInbuiltAmenities);
        }

        await currentVenueData.save();

        return res.json({ success: true, message: "Venue updated", data: currentVenueData });
    }catch(error)
    {
        return res.status(500).json({sucess : false , message : error});
    } 
};

export const deleteVenue = async(req , res) => {
    try{
        // console.log(req.params)
        const {venueId} = req.params;
        if(!venueId)
        {
            return res.status(500).json({success : false , message : "Venue Id not found"})
        }
        await venueModel.findByIdAndDelete({_id : venueId});
        return res.status(200).json({success : true , message : "Venue Deleted Sucessfully"});
    }catch(error){
        return res.status(500).json({success : false , message : error.message})
    }
}


