import React from "react";
import User from "./User";
import getAllUsers from "../../context/getAllUsers";

const Users = () => {
  const [allUsers, loading] = getAllUsers();
  console.log(allUsers);
  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>

      <div className="my-2 no-scrollbar overflow-y-auto" style={{maxHeight:"calc(80vh - 10vh) "}}>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
      </div>
    </div>
  );
};

export default Users;
