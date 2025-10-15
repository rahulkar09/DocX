import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {
  const { doctors, atoken, getAllDoctors, changeAvailablity } = useContext(AdminContext)

  useEffect(() => {
    if (atoken) {
      getAllDoctors()
    }
  }, [atoken])

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Doctors</h1>
        <p className="text-gray-600 mt-2">Manage doctor profiles and availability</p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
          >
            {/* Image Section */}
            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content Section */}
            <div className="p-5">
              {/* Name & Specialty */}
              <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{item.speciality}</p>

              {/* Divider */}
              <div className="border-t border-gray-100 mb-4"></div>

              {/* Availability Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Availability</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvailablity(item._id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Status Badge */}
              <div className="mt-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium w-full justify-center ${
                    item.available
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.available ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></span>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {doctors.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No doctors found</p>
          <p className="text-gray-400 text-sm mt-1">Add doctors to get started</p>
        </div>
      )}
    </div>
  )
}

export default DoctorList
