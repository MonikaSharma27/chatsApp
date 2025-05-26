import express from "express";
import dotenv from "dotenv";
import mongoose  from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: API_BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

try {
    mongoose.connect(MONGODB_URI);
    console.log("MONGODB CONNECTED");
} catch(error) {
    console.log(error);
}

app.use("/user", userRoute);
app.use("/message", messageRoute);

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
