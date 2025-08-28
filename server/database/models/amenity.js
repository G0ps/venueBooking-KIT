import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  instances: {
    type: [
      {
        id: { type: String, unique: true, required: true , unique : true},
      }
    ]
  },
  isWorking : {
    type : String,
    enum : ["WORKING" , "REPAIR"],
    default : "WORKING"
  }
})

const model = mongoose.model('amenity', schema, 'amenity')

export default model
