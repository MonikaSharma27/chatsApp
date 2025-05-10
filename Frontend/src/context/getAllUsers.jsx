import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axios';
import Cookies from 'js-cookie';


const getAllUsers = () => {
 const [allUsers, setAllUsers] = useState([]);
 const [loading, setLoading] = useState(false);
 useEffect(() => {
    const getUsers = async () => {
        setLoading(true)
try{
const token = Cookies.get("jwt");
const response = await axiosInstance.get("/user/allUsers:" ,{
    credentials:"include",
    headers:{
        Authorization: `Bearer ${token}`
    }
})
setAllUsers(response.data)
setLoading(false)
}catch(error){

console.log("Error in getAllusers:" + error)

}


    }
    getUsers()
 },[])
 return [allUsers,loading]
}

export default getAllUsers
