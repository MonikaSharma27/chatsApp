import { useState } from "react";
import { createContext } from "react";
import { useAuth } from "../context/Authprovider.jsx"
import io from "socket.io-client"
import { useEffect } from "react";
import { useContext } from "react";


const socketContext = createContext()


export const useSocketContext = ()=>{
    return useContext(socketContext)
}

export const SocketProvider = ({children})=>{
    const [socket , setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [authUser] = useAuth()
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


    useEffect (()=>{
      if(authUser){
        const socket = io(API_BASE_URL,{
             query:{
            userId : authUser.user.id
        }})
        setSocket(socket)
        socket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        })
        return ()=>socket.close()
      }else{
        if(socket){
            socket.close()
            setSocket(null)
        }
      }
    },[authUser])
    return(
        <socketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </socketContext.Provider>
    )
}

