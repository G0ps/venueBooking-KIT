import amenityModel from "../database/models/amenity.js"
import { ObjectId } from "../database/connectDb.js"



export const addNewAmenity = async(req , res) => {
    
    try{
        let {name , instances} = req.body

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

export const updateAmenity = async(req , res) =>{
    try{
        const {_id , newName , amenityInstanceIdDelete , newInstances} = req.body;
        if(!_id)
        {
            return res.status(500).json({sucess : false , message : "Id is required"})
        }
        if(newName)
        {
            await amenityModel.updateOne({_id} , {$set : {name : newName}})
        }
        if(amenityInstanceIdDelete)
        {
            const req = {
                _id : _id,
                amenityInstanceIdDelete : amenityInstanceIdDelete
            }
            await deleteAmenityInstance(req);
        }
        if(newInstances)
        {
            await amenityModel.updateOne({_id} , {$push : {instances : {$each : newInstances.map(obj => {return {name : obj}})}}})
        }
        return res.status(200).json({success : true , message : "Amenity updated sucessfully"});
    }catch(error){
        return res.status(500).json({success : false , message : error.message})
    }
}

//helper
//helper
async function deleteAmenityInstance(req){
    // console.log(req);
    try{
        const amenityId = req._id;
        let amenityInstanceId = req.amenityInstanceIdDelete
        .filter(obj => obj !== '').map(id => new ObjectId(id));
        // console.log(amenityInstanceId)
        if(!amenityId || !amenityInstanceId) {
            return res.status(500).json({sucess : false , message : "Amenity id and index is manditory"})
        }
        await amenityModel.updateOne(
            {_id : amenityId} , 
            {
                $pull : {instances: {_id : {$in : amenityInstanceId}}}
            }
        );
        return;
    }catch(error){
        console.log("Error" , error.message)
        return;
    }
}

