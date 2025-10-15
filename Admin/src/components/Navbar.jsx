import React, { useContext } from 'react'
import { assets } from "../assets/assets"
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
  const { atoken, setAToken } = useContext(AdminContext)
  const { dtoken, setDToken } = useContext(DoctorContext)

  const navigate = useNavigate()

  const logout = () => {
    // Admin logout
    if (atoken) {
      navigate('/')
      setAToken('')
      localStorage.removeItem('aToken')
    }
    // Doctor logout
    else if (dtoken) {
      navigate('/')
      setDToken('')
      localStorage.removeItem('dToken')
    }
  }

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-200 bg-white shadow-sm">
      {/* Left Side: Logo + Role */}
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="Admin Logo"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-400 text-gray-600 text-sm">
          {atoken ? "Admin" : "Doctor"}
        </p>
      </div>

      {/* Right Side: Logout Button */}
      <button
        onClick={logout}
        className="bg-blue-600 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-xl transition-all duration-200"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
