import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Appcontext } from '../context/Context'

const Navbar = () => {
  const navigate = useNavigate()

  const {token , setToken , userData} = useContext(Appcontext)
  

  const [showMenu, setShowMenu] = useState(false)

  const logout = ()=>{
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">
      {/* Logo */}
      <img
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
        onClick={() => navigate('/')}
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
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
              `flex flex-col items-center ${
                isActive ? 'text-primary font-semibold' : 'text-gray-700'
              }`
            }
          >
            <li className="py-1">{link.name}</li>
            <hr
              className={`border-none outline-none bg-primary w-3/5 m-auto transition-all duration-300 ${
                location.pathname === link.path ? 'h-[2px] visible' : 'h-0 invisible'
              }`}
            />
          </NavLink>
        ))}
      </ul>

      {/* Profile / Login */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              src={userData.image}
              alt="profile"
              className="w-8 rounded-full"
            />
            <img src={assets.dropdown_icon} alt="" className="w-2.5" />

            {/* Dropdown */}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow">
                <p
                  onClick={() => navigate('/myprofile')}
                  className="hover:text-black cursor-pointer"
                >
                  My profile
                </p>
                <p
                  onClick={() => navigate('/myappointment')}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-indigo-700 transition"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu"
        />
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-30 flex flex-col p-6">
          <div className="flex items-center justify-between mb-6">
            <img src={assets.logo} alt="logo" className="w-32" />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="close"
              className="w-6 cursor-pointer"
            />
          </div>
          <ul className="flex flex-col gap-4 text-lg font-medium">
            <NavLink to="/" onClick={() => setShowMenu(false)}>
              Home
            </NavLink>
            <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
              All Doctors
            </NavLink>
            <NavLink to="/about" onClick={() => setShowMenu(false)}>
              About
            </NavLink>
            <NavLink to="/contact" onClick={() => setShowMenu(false)}>
              Contact
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Navbar
