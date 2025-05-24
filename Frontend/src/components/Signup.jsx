import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axiosInstance from "../../axios";
import { useAuth } from "../context/Authprovider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";




const Signup = () => {
  const [authUser, setAuthUser]= useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password  = watch("password","");
  const confirmPassword = watch("confirmPassword","")


  const validatePasswordMatch =(value)=>{
return value === password || "Password do not match"
  }

  const onSubmit = async (data) => {
    const userInfo = {
        fullname:data.fullname,
        email:data.email,
        password:data.password,
        confirmPassword:data.confirmPassword
    }
   await axiosInstance.post("/user/signup" , userInfo)
    .then((response)=>{
        console.log(response.data)
        if(response.data){
            toast.success("signup successfully")
        }
        localStorage.setItem("ChatAPP",JSON.stringify(response.data))
        setAuthUser(response.data);
    })
    .catch((error)=>{
        if(error.response){
            toast.error("Error:"+error.response.data.error);
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
          <h2 className="text-2xl font-bold">Signup</h2>

          <div className="flex flex-col ">
            <div className="mb-4">
              <label className="flex gap-1 items-center justify-start border border-gray-500 p-2 rounded-md ">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  name=""
                  placeholder="Fullname"
                  className="outline-none p-1 w-full "
                  {...register("fullname", { required: true })}
                />
              </label>
              {errors.fullname && (
                <span className="mb-4 text-sm text-red-500 font-semibold">
                  This field is required
                </span>
              )}
            </div>

            <div  className="mb-4">
              <label className="flex gap-1 items-center justify-start border border-gray-500 p-2 rounded-md">
                <MdEmail className="text-gray-400" />
                <input
                  type="email"
                  name=""
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

            <div  className="mb-3">
              <label className="flex gap-1 items-center justify-start border border-gray-500 p-2 rounded-md">
                <FaKey className="text-gray-400" />
                <input
                  type="password"
                  name=""
                  placeholder="Confirm Password"
                  className="outline-none p-1 w-full "
                  {...register("confirmPassword", { required: true , validate: validatePasswordMatch })}
                />
              </label>
              {errors.confirmPassword && (
                <span className="mb-4 text-sm text-red-500 font-semibold">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-300">
              Have an account?{" "}
              <Link to="/login" className="text-blue-500 underline cursor-pointer">
                Login
              </Link>
            </p>
            <input
              type="submit"
              name=""
              id=""
              value="Signup"
              className="bg-green-500 px-2 py-1 cursor-pointer rounded-lg"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
