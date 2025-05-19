import React, { useState } from 'react'
import useConversation from '../zustand/useConversation';
import axiosInstance from '../../axios';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const {messages , setMessage , selectedConversation} = useConversation();

    const sendMessages = async (message) => {
            setLoading(true);
            try {
                const response = await axiosInstance.post(`/message/send/${selectedConversation._id}`, {message});
                setMessage([...messages, response.data] );
                
                setLoading(false);
            } catch (error) {
                console.log("Error send messages:", error);
                setLoading(false);
            } 
           
    }

  return {loading, sendMessages};
}

export default useSendMessage
