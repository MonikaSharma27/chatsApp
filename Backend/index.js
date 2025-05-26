import express from "express";
import dotenv from "dotenv";
import mongoose  from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: function(origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://chats-app-dmzj.vercel.app',
            'http://chats-app-dmzj.vercel.app',
            'https://chats-app-sand.vercel.app',
            'http://chats-app-sand.vercel.app'
        ];
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
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
