import { getReceiverSocketId } from '../SocketIO/server.js';
import Conversation from './../models/conversation.js';
import Message from './../models/message.js';
import { io } from '../SocketIO/server.js';



export const sendMessage = async (req, res) => {

    try{
        const {message} = req.body
        const {id:receiverId} = req.params;
        const senderId = req.user._id
        let conversation = await Conversation.findOne({members:{$all:[senderId, receiverId]}})

        if(!conversation){
           conversation = await Conversation.create({
                members:[senderId, receiverId]
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        await Promise.all([conversation.save(), newMessage.save()])
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId){
            io.to(receiverSocketId).emit("newMessage" ,newMessage)
        }
        res.status(201).json( newMessage)


    }catch(error){
        console.log("Error in sending message", error)
        res.status(500).json({message:"Internal server error"})
    }
}



export const getMessages = async (req, res) => {
    try{
       const {id: Chatuser} = req.params;
       const senderId = req.user._id
         const conversation = await Conversation.findOne({members:{$all:[senderId, Chatuser]}}).populate("messages")
         if(!conversation){
            return res.status(201).json([]);
         }
         const messages = conversation.messages;
         res.status(201).json(messages)
        

    }catch(error){
        console.log("Error in getting messages", error)
        res.status(500).json({message:"Internal server error"})

    }
}  