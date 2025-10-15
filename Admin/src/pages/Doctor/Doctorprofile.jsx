import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Doctorprofile = () => {
  const { dtoken, profileData, getProfileData, setProfileData, backendUrl } = useContext(DoctorContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }
      
      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        updateData,
        { headers: { dtoken } }
      )
      
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dtoken) {
      getProfileData()
    }
  }, [dtoken])

  return (
    profileData && (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your professional information</p>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <img
                      src={profileData.image}
                      alt={profileData.name}
                      className="w-40 h-40 rounded-2xl object-cover shadow-lg mx-auto"
                    />
                    <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${profileData.available ? 'bg-green-500' : 'bg-gray-400'}`}>
                      {profileData.available ? 'ACTIVE' : 'OFFLINE'}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{profileData.name}</h2>
                  <p className="text-blue-600 font-semibold mb-2">{profileData.speciality}</p>
                  <p className="text-sm text-gray-500 mb-4">{profileData.degree}</p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg py-2 px-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">{profileData.experience} Years Experience</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Patients Treated</span>
                    <span className="font-bold text-gray-900">500+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="font-bold text-green-600">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rating</span>
                    <span className="font-bold text-yellow-600">4.9 ★</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  About Me
                </h3>
                <p className="text-gray-700 leading-relaxed">{profileData.about}</p>
              </div>

              {/* Professional Details Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    Professional Details
                  </h3>
                  
                  {!isEdit && (
                    <button
                      onClick={() => setIsEdit(true)}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  )}
                </div>

                <div className="space-y-5">
                  {/* Consultation Fee */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                    <label className="text-sm font-semibold text-green-800 mb-2 block">Consultation Fee</label>
                    {isEdit ? (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-700">₹</span>
                        <input
                          type="number"
                          value={profileData.fees}
                          onChange={(e) =>
                            setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                          }
                          className="flex-1 px-4 py-2 text-2xl font-bold text-green-700 bg-white border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    ) : (
                      <p className="text-3xl font-bold text-green-700">₹{profileData.fees}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                    <label className="text-sm font-semibold text-purple-800 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Clinic Address
                    </label>
                    {isEdit ? (
                      <textarea
                        value={profileData.address}
                        onChange={(e) =>
                          setProfileData((prev) => ({ ...prev, address: e.target.value }))
                        }
                        rows="3"
                        className="w-full px-4 py-3 bg-white border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-gray-700"
                        placeholder="Enter your clinic address"
                      />
                    ) : (
                      <p className="text-gray-700 font-medium leading-relaxed">{profileData.address}</p>
                    )}
                  </div>

                  {/* Availability */}
                  <div className={`rounded-xl p-5 border-2 ${profileData.available ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300' : 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-300'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className={`text-sm font-semibold mb-1 block ${profileData.available ? 'text-blue-800' : 'text-gray-700'}`}>
                          Availability Status
                        </label>
                        <p className={`text-lg font-bold ${profileData.available ? 'text-blue-700' : 'text-gray-600'}`}>
                          {profileData.available ? 'Currently Available' : 'Currently Unavailable'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.available}
                          onChange={() =>
                            isEdit && setProfileData((prev) => ({ ...prev, available: !prev.available }))
                          }
                          disabled={!isEdit}
                          className="sr-only peer"
                        />
                        <div className={`w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600 ${!isEdit ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isEdit && (
                  <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={updateProfile}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEdit(false)
                        getProfileData()
                      }}
                      className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Doctorprofile
