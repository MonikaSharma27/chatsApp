import React from "react";
import { BiLogOutCircle } from "react-icons/bi";

const Logout = () => {
  return (
    <div className="h-[10vh]">
        <div>
        <BiLogOutCircle className="text-5xl text-white hover:bg-slate-700 rounded-full duration-300 cursor-pointer p-2 ml-2 mt-1"/>
        </div>
      
    </div>
  );
};

export default Logout;
