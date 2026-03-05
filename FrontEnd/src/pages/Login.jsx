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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try{
      if(state == "Sign up"){
        const {data} = await axios.post(backendUrl + '/api/user/register' , {name ,password,email})
        if(data.success) {
          localStorage.setItem('token' , data.token)
          setToken(data.token)
          toast.success(data.message)
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
      toast.error(error.response?.data?.message || error.message)
    }
    finally{
      setLoading(false);
    }
  };
   useEffect(()=>{
      if(token){
        navigate('/')

      }

    },[token,navigate])

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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                /* Eye-off icon */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                /* Eye icon */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className={`w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
          {loading ? (
            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            state === "Sign up" ? "Create Account" : "Log In"
          )}
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
