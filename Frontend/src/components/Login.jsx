import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axiosInstance from '../../axios';
import { useAuth } from '../context/Authprovider';
import { Link } from 'react-router-dom';

const Login = () => {

   const [authUser, setAuthUser]= useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
    
    
      const onSubmit = async (data) => {
        const userInfo = {
            email:data.email,
            password:data.password
        }
      await axiosInstance.post("/user/login" , userInfo)
        .then((response)=>{
            console.log(response.data)
            if(response.data){
                alert("Login successfully")
            }
            localStorage.setItem("ChatAPP",JSON.stringify(response.data))
            setAuthUser(response.data);
        })
        .catch((error)=>{
            if(error.response){
                alert("Error:"+error.response.data.error);
            }
            console.log(error);
        })
      }
    
  return (
   <>
         <div className="bg-gray-800 flex items-center justify-center h-screen text-white">
           <form
             onSubmit={handleSubmit(onSubmit)}
             className="border border-white px-6 py-2 rounded-md space-y-4 w-96"
           >
             <h1 className="text-3xl text-center">
               Chat<span className="text-green-500 font-semibold">App</span>{" "}
             </h1>
             <h2 className="text-2xl font-bold">Login</h2>
   
             <div className="flex flex-col ">
   
               <div  className="mb-4">
                 <label className="flex gap-1 items-center justify-start border border-gray-500 p-2 rounded-md">
                   <MdEmail className="text-gray-400" />
                   <input
                     type="email"
                     name=""
                     id=""
                     placeholder="Email"
                     className="outline-none p-1 w-full"
                     {...register("email", { required: true })}
                   />
                 </label>
                 {errors.email && (
                   <span className="mb-4 text-sm text-red-500 font-semibold">
                     This field is required
                   </span>
                 )}
               </div>
   
               <div  className="mb-4">
                 <label className="flex gap-1 items-center justify-start border border-gray-500 p-2 rounded-md">
                   <FaKey className="text-gray-400" />
                   <input
                     type="password"
                     name=""
                     id=""
                     placeholder="Password"
                     className="outline-none p-1 w-full"
                     {...register("password", { required: true })}
                   />
                 </label>
                 {errors.password && (
                   <span className="mb-4 text-sm text-red-500 font-semibold">
                     This field is required
                   </span>
                 )}
               </div>
             </div>
   
             <div className="flex justify-between">
               <p className="text-gray-300">
                 New user?{" "}
                 <Link to="/signup" className="text-blue-500 underline cursor-pointer">
                   Signup
                 </Link>
               </p>
               <input
                 type="submit"
                 name=""
                 id=""
                 value="Login"
                 className="bg-green-500 px-3 py-1 cursor-pointer rounded-lg"
               />
             </div>
           </form>
         </div>
       </>
  )
}

export default Login
