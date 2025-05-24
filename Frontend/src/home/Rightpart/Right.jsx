import React, { useEffect } from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Typesend from './Typesend'
import useConversation from '../../zustand/useConversation.js';
import {useAuth} from '../../context/Authprovider.jsx';
import { CiMenuFries } from "react-icons/ci";

function Right() {

  const {selectedConversation, setSelectedConversation} = useConversation();
useEffect(()=>{
return setSelectedConversation(null);
},[setSelectedConversation])



  return (
     <div className='w-full bg-slate-900 text-gray-300'>
   <div>
    {!selectedConversation?(<NoChatSelected/>):(<>
    
      <Chatuser/>
      <div className='no-scrollbar overflow-y-auto' style={{maxHeight:"calc(92vh - 8vh)"}}>
      <Messages/>
      </div>
      <Typesend/>
    
    </>)}
   </div>
   </div>
  )
}

export default Right;



const NoChatSelected = () =>{
  const [authUser ]= useAuth()
  return(
    <>
    <div className="relative ">
           <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5 pt-6"
        >
          <CiMenuFries className="text-white text-4xl " />
        </label>

       <div className='flex h-screen justify-center items-center text-2xl  p-2'>
      <h1 className='text-center'>Welcome <span className='font-bold text-green-500 text-3xl '>{authUser.user.fullname}</span>
      <br/>
      No chat selected, please select a chat to start conversation
      </h1>
    </div>

    </div>
   
    </>
  )
}



