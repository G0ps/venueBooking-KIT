import express from "express"
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();


import connectDb from "./database/connectDb.js"
import serverRouter from "./routers/main.js";



const app = express()
app.use(express.json());
app.use(cors({
    origin : true
}))

connectDb();

app.use('/main',serverRouter)

app.listen(process.env.PORT , () => {
    console.log("✅ Server Listening");
})