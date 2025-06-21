import express from "express";
import dotenv from "dotenv";
import mongoose  from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// Debug middleware to log requests
app.use((req, res, next) => {
    console.log('Incoming request:', {
        method: req.method,
        path: req.path,
        origin: req.headers.origin,
        headers: req.headers
    });
    next();
});

app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: "http://localhost:5173" || "*", // Your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    exposedHeaders: ["Set-Cookie"],
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
