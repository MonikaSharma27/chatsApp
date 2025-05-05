import React from "react";

function Chatuser() {
  return (
    <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300 ">
      <div className="avatar avatar-online">
        <div className="w-16 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
        </div>
      </div>

      <div>
        <h1 className="text-xl">Monika</h1>
        <span className="text-sm">Offline</span>
      </div>
    </div>
  );
}

export default Chatuser;
