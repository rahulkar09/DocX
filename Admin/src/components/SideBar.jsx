import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const SideBar = () => {
  const { atoken } = useContext(AdminContext)
  const { dtoken } = useContext(DoctorContext)

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

  return (
    <div className="min-h-screen w-64 bg-white border-r border-gray-200 shadow-sm hidden sm:flex flex-col sticky top-0">
      {atoken && (
        <ul className="mt-6 space-y-1 text-gray-700 font-medium">
          {adminNavLinks.map(({ path, icon, label }) => (
            <NavLink
              key={path}
              to={path}
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
        <ul className="mt-6 space-y-1 text-gray-700 font-medium">
          {doctorNavLinks.map(({ path, icon, label }) => (
            <NavLink
              key={path}
              to={path}
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
  )
}

export default SideBar
