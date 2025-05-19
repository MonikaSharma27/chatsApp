import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/useSendMessage';

const Typesend = () => {
  const [message , setMessage] = useState("");
   const {loading, sendMessages}=useSendMessage();


   const handleSubmit = async (e) => {
    console.log(e)
    e.preventDefault();
         await sendMessages(message);
         setMessage("");

   }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex space-x-1 h-[8vh]  bg-gray-800'>
        <div className='w-[70%] mx-4'>
        <input type="text" placeholder='Type here' className=' rounded-xl bg-black mt-1 border border-gray-700 outline-none px-4 py-3 w-full ' 
        value={message}
        onChange={(e)=>setMessage(e.target.value)}/>
        </div>
        <button>
        <IoSend className='text-3xl'/>
        </button>
    </div>
    </form>
  )
}

export default Typesend
