import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  instances: {
    type: [
      {
        id: { type: String, unique: true, required: true },
        unavailableTimings: {
          type: [{ start: { type: Date }, end: { type: Date } }]
        }
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
