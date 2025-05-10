import express from "express";
import dotenv from "dotenv";
import mongoose  from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";

const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors());

dotenv.config()
const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI;

try {
    mongoose.connect(MONGODB_URI)
    console.log("MONGODB CONNECTED")
   }catch(error){
console.log(error)
}


app.use("/user", userRoute)


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
