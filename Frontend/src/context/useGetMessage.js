import React from 'react'
import useConversation from '../zustand/useConversation.js';
import { useEffect ,useState} from 'react';
import axiosInstance from '../../axios.js';

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const {messages , setMessage , selectedConversation} = useConversation();

    useEffect(()=>{
          const getMessages = async () => {
            setLoading(true);
           if(selectedConversation && selectedConversation._id){
            try {
                const response = await axiosInstance.get(`/message/get/${selectedConversation._id}`);
                setMessage(response.data);
                
                setLoading(false);
            } catch (error) {
                console.log("Error fetching messages:", error);
                setLoading(false);
            } 
           }
    }
    getMessages();
    },[selectedConversation , setMessage])
  return {loading, messages};
}

export default useGetMessage
