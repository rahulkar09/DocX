import React, { useState } from "react";
import { useContext } from "react";
import { Appcontext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const {backendUrl , token , setToken} = useContext(Appcontext)
  
  const [state, setState] = useState("Sign up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try{
      if(state == "Sing up"){
        const {data} = await axios.post(backendUrl + '/api/user/register' , {name ,password,email})
        if(data.success) {
          localStorage.setItem('token' , data.token)
          setToken(data.token)
        }
        else{
          toast.error(data.message)
        }
      }
      else{
        const {data} = await axios.post(backendUrl + '/api/user/login' , {password,email})
        if(data.success) {
          localStorage.setItem('token' , data.token)
          setToken(data.token)
        }
        else{
          toast.error(data.message)
        }
      }
    }
    catch(error){
      toast.error(error.message)

    }
  };
   useEffect(()=>{
      if(token){
        navigate('/')

      }

    },[token])

  return (
    <form
      className="min-h-[80vh] flex items-center justify-center bg-gray-50"
      onSubmit={onSubmitHandler}
    >
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <p className="text-2xl font-bold text-gray-800 mb-2">
          {state === "Sign up" ? "Create Account" : "Log In"}
        </p>
        <p className="text-gray-600 mb-6 text-sm">
          Please {state === "Sign up" ? "Create Account" : "Log In"} to book
          appointment
        </p>

        {state === "Sign up" && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Full Name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-1">Password</p>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
          {state === "Sign up" ? "Create Account" : "Log In"}
        </button>

        {state === "Sign up" ? (
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-primary font-semibold cursor-pointer underline"
              onClick={() => setState("Login")}
            >
              Log in
            </span>
          </p>
        ) : (
          <p className="mt-4 text-sm text-gray-600">
            Create a new account{" "}
            <span
              className="text-primary font-semibold cursor-pointer underline"
              onClick={() => setState("Sign up")}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
