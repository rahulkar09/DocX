import React, { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";


const Login = () => {
  const [state, setState] = useState("Admin");
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const {setAToken , backendUrl} = useContext(AdminContext)
  const {setDToken } = useContext(DoctorContext)


  const onSubmitHandler = async(event)=>{
    event.preventDefault()
    try{
         if(state =='Admin'){
            const {data} = await axios.post(backendUrl + '/api/admin/login' , {
                email,password
            })
            if(data.success){

                localStorage.setItem('aToken', data.token)
                setAToken(data.token)
                

            }
            else{
                toast.error(data.message)
            }
         }

         else{
          const {data} = await axios.post(backendUrl + '/api/doctor/login', {email ,password})
          if(data.success){

                localStorage.setItem('dToken', data.token)
                setDToken(data.token)
                console.log(data.token)

            }
            else{
              toast.error(data.message)
            }


         }
    }
    catch(err){
      console.error(err);
      toast.error("Something went wrong. Please try again!");

    }

  }
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmitHandler} className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {state} Login
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Not an Admin?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setState(state === "Admin" ? "Doctor" : "Admin")}
          >
            Switch to {state === "Admin" ? "Doctor" : "Admin"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
