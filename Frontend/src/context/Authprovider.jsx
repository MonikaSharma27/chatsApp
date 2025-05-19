import React, { useContext, useState } from 'react';
import Cookies from "js-cookie";
import { createContext } from 'react';

const Authcontext = createContext();

export const Authprovider = ({ children }) => { 
  const initialUserState = Cookies.get("jwt") || localStorage.getItem("ChatApp");
  const [authUser, setAuthUser] = useState(initialUserState ? JSON.parse(initialUserState) : undefined);

  return (
    <Authcontext.Provider value={[authUser, setAuthUser]}> 
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => useContext(Authcontext);

export default Authcontext;
