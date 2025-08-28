import express from "express"
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();


import connectDb from "./database/connectDb.js"

const app = express()
app.use(express.json());
app.use(cors({
    origin : true
}))

connectDb();

app.get('/' , (req , res) => {
    console.log("Hello from server")
    return res.send("Hello from server")
})

app.listen(process.env.PORT , () => {
    console.log("✅ Server Listening");
})