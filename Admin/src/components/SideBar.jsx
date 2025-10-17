import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const SideBar = () => {
  const { atoken } = useContext(AdminContext)
  const { dtoken } = useContext(DoctorContext)
  const [isOpen, setIsOpen] = useState(false)

  const adminNavLinks = [
    { path: '/admin-dashboard', icon: assets.home_icon, label: 'Dashboard' },
    { path: '/add-doctor', icon: assets.add_icon, label: 'Add Doctor' },
    { path: '/doctor-list', icon: assets.people_icon, label: 'Doctors List' },
  ]

  const doctorNavLinks = [
    { path: '/doctor-dashboard', icon: assets.home_icon, label: 'Dashboard' },
    { path: '/doctor-appointments', icon: assets.appointment_icon, label: 'Appointments' },
    { path: '/doctor-profile', icon: assets.people_icon, label: 'Profile' },
  ]

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Hamburger Menu Button - Only visible on mobile */}
      <button
        onClick={toggleSidebar}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle Menu"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay - Only visible on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0  bg-opacity-50 z-30 transition-opacity"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`min-h-screen w-64 bg-white border-r border-gray-200 shadow-sm flex-col sticky top-0 z-40 
        sm:flex 
        ${isOpen ? 'fixed flex' : 'hidden'} 
        transition-transform duration-300 ease-in-out`}
      >
        {atoken && (
          <ul className="mt-6 space-y-1 text-gray-700 font-medium px-2">
            {adminNavLinks.map(({ path, icon, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer 
                  ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
              >
                <img src={icon} alt={label} className="w-5 h-5" />
                <p className="text-sm">{label}</p>
              </NavLink>
            ))}
          </ul>
        )}

        {dtoken && (
          <ul className="mt-6 space-y-1 text-gray-700 font-medium px-2">
            {doctorNavLinks.map(({ path, icon, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer 
                  ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
              >
                <img src={icon} alt={label} className="w-5 h-5" />
                <p className="text-sm">{label}</p>
              </NavLink>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default SideBar
