import React from 'react'
import { useSocketContext } from './SocketContext.jsx';
import useConversation from '../zustand/useConversation.js';
import sound from '../assets/iphone_sms_original.mp3';
import { useEffect } from 'react';


const useGetSocketMessage = () => {
    const {socket} = useSocketContext();
    const {messages, setMessage} = useConversation();

    useEffect(()=>{
    socket.on("newMessage",(newMessage)=>{
        const notification = new Audio(sound);
        notification.play();
    setMessage([...messages, newMessage]);
});
return ()=>{
    socket.off("newMessage")
}
    },[socket, messages, setMessage])
  
};

export default useGetSocketMessage;
