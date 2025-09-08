import mongoose from "mongoose"

async function connectDb(){
    try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

export default connectDb;

export const ObjectId = mongoose.Types.ObjectId;
