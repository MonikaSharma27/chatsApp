import {Server} from "socket.io";
import http from "http";
import express from "express";


const app = express();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: API_BASE_URL,
        methods: ["GET", "POST"],
    }
})

export const getReceiverSocketId = (receiverId)=>{
    return users[receiverId];
}

const users = {};

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId;
    if(userId){
        users[userId] = socket.id;
        console.log( users);
    }
    io.emit("getOnlineUsers", Object.keys(users));

    socket.on("disconnect", () => {
        console.log("A user disconnected");
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
    });
})

export {app ,io, server};