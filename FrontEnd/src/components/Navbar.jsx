import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Appcontext } from '../context/Context'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken, userData } = useContext(Appcontext)
  const [showMenu, setShowMenu] = useState(false)

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className="flex items-center justify-between text-sm py-3 sm:py-4 px-4 sm:px-6 lg:px-8 mb-5 border-b border-gray-400">
      {/* Logo */}
      <img
        className="w-32 sm:w-40 lg:w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
        onClick={() => navigate('/')}
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-start gap-3 lg:gap-5 font-medium text-xs lg:text-sm">
        {[
          { name: 'HOME', path: '/' },
          { name: 'ALL DOCTORS', path: '/doctors' },
          { name: 'ABOUT', path: '/about' },
          { name: 'CONTACT US', path: '/contact' },
        ].map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-colors duration-200 ${
                isActive ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'
              }`
            }
          >
            <li className="py-1">{link.name}</li>
            <hr
              className={`border-none outline-none bg-primary w-3/5 m-auto transition-all duration-300 ${
                window.location.pathname === link.path ? 'h-[2px]' : 'h-0'
              }`}
            />
          </NavLink>
        ))}
      </ul>

      {/* Profile / Login */}
      <div className="flex items-center gap-2 sm:gap-4">
        {token && userData ? (
          <div className="flex items-center gap-1 sm:gap-2 cursor-pointer group relative">
            <img
              src={userData.image}
              alt="profile"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
            />
            <img 
              src={assets.dropdown_icon} 
              alt="dropdown" 
              className="w-2 sm:w-2.5" 
            />

            {/* Dropdown */}
            <div className="absolute top-0 right-0 pt-12 sm:pt-14 text-sm sm:text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-40 sm:min-w-48 bg-stone-100 rounded-lg flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 shadow-lg">
                <p
                  onClick={() => navigate('/myprofile')}
                  className="hover:text-black cursor-pointer transition-colors duration-200"
                >
                  My profile
                </p>
                <p
                  onClick={() => navigate('/myappointment')}
                  className="hover:text-black cursor-pointer transition-colors duration-200"
                >
                  My Appointment
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer transition-colors duration-200"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-full text-xs sm:text-sm font-light hidden md:block hover:bg-indigo-700 transition-all duration-200 active:scale-95"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-5 sm:w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-30 transition-transform duration-300 ease-in-out ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col h-full p-5 sm:p-6">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <img 
              src={assets.logo} 
              alt="logo" 
              className="w-28 sm:w-32" 
            />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="close"
              className="w-5 sm:w-6 cursor-pointer"
            />
          </div>

          {/* Mobile Menu Links */}
          <ul className="flex flex-col gap-5 sm:gap-6 text-base sm:text-lg font-medium">
            <NavLink 
              to="/" 
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `py-2 border-b border-gray-200 transition-colors duration-200 ${
                  isActive ? 'text-primary font-semibold' : 'text-gray-700'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/doctors" 
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `py-2 border-b border-gray-200 transition-colors duration-200 ${
                  isActive ? 'text-primary font-semibold' : 'text-gray-700'
                }`
              }
            >
              All Doctors
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `py-2 border-b border-gray-200 transition-colors duration-200 ${
                  isActive ? 'text-primary font-semibold' : 'text-gray-700'
                }`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `py-2 border-b border-gray-200 transition-colors duration-200 ${
                  isActive ? 'text-primary font-semibold' : 'text-gray-700'
                }`
              }
            >
              Contact
            </NavLink>
          </ul>

          {/* Mobile Menu Login/Profile */}
          {!token && (
            <button
              onClick={() => {
                navigate('/login')
                setShowMenu(false)
              }}
              className="mt-8 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition-all duration-200 active:scale-95"
            >
              Create Account
            </button>
          )}

          {token && userData && (
            <div className="mt-8 space-y-4">
              {/* Profile Card */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <img
                  src={userData.image}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{userData.name}</p>
                  <p className="text-xs text-gray-500">{userData.email}</p>
                </div>
              </div>

              {/* Profile Navigation Links */}
              <div className="flex flex-col gap-3 px-2">
                <button
                  onClick={() => {
                    navigate('/myprofile')
                    setShowMenu(false)
                  }}
                  className="text-left py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors duration-200"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    navigate('/myappointment')
                    setShowMenu(false)
                  }}
                  className="text-left py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors duration-200"
                >
                  My Appointments
                </button>
                <button
                  onClick={() => {
                    logout()
                    setShowMenu(false)
                  }}
                  className="text-left py-3 px-4 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
