import {Server} from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "https://chats-app-dmzj.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],

}));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: ["http://localhost:5173", "https://chats-app-dmzj.vercel.app"],
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }
});

export const getReceiverSocketId = (receiverId)=>{
    return users[receiverId];
}

const users = {};

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId;
    if(userId){
        users[userId] = socket.id;
        console.log(users);
    }
    io.emit("getOnlineUsers", Object.keys(users));

    socket.on("disconnect", () => {
        console.log("A user disconnected");
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
    });
});

export {app, io, server};