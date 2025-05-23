import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

function Chatuser() {

  const {selectedConversation}=useConversation();
const {onlineUsers}= useSocketContext();
const getOnlineUserStatus = (userId)=>{
  return onlineUsers?.includes(userId) ? "Online" : "Offline";
}


  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-3xl" />
      </label>

    <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300 ">
      <div className="avatar" >
        <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
        </div>
      </div>

      <div>
        <h1 className="text-xl">{selectedConversation?.fullname}</h1>
        <span className="text-sm">{getOnlineUserStatus(selectedConversation._id)}</span>
      </div>
    </div>
    </div>
  );
}

export default Chatuser;
