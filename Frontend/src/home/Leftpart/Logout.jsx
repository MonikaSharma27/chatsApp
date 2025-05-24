import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axiosInstance from "../../../axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Logout = () => {
const [loading, setLoading] = useState(false);

const handleLogout = async () => {
  setLoading(true);
  try{
const res = await axiosInstance.post("/user/logout")
localStorage.removeItem("ChatAPP");
Cookies.remove("jwt");
setLoading(false);
toast.success("Logout successful");
window.location.reload();
  }catch(error){
    console.error("Logout failed:", error);
  }
}

  return (
    <div className="h-[8vh] bg-slate-800 ">
        <div>
        <BiLogOutCircle className="text-5xl text-white hover:bg-slate-700 rounded-full duration-300 cursor-pointer p-2 ml-2 mt-1" 
        onClick={handleLogout}/>
        </div>
      
    </div>
  );
};

export default Logout;
