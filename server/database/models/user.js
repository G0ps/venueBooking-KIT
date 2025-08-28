import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name : {
        type : String
    }
})

const model = mongoose.model('user' , schema , 'user');

export default model;