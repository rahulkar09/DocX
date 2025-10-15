import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorAppointment = () => {
  const { dtoken, appointments, getAppointments, backendUrl } = useContext(DoctorContext)

  useEffect(() => {
    if (dtoken) getAppointments()
  }, [dtoken])

  // Cancel appointment
  const cancelAppointment = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/doctor/cancel-appointment/${id}`,
        {
          headers: { dtoken },
        }
      )

      if (data.success) {
        toast.success('Appointment cancelled successfully')
        getAppointments()
      } else toast.error(data.message)
    } 
    catch (err) {
      console.error(err)
      toast.error('Failed to cancel appointment')
    }
  }

  // Mark appointment completed/incomplete
  const markCompleted = async (id, isCompleted) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/doctor/update-appointment-status/${id}`,
        { isCompleted },
        {
          headers: { dtoken },
        }
      )

      if (data.success) {
        toast.success(`Appointment marked as ${isCompleted ? 'completed' : 'not completed'}`)
        getAppointments()
      } else toast.error(data.message)
    } catch (err) {
      console.error(err)
      toast.error('Failed to update appointment')
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
        <p className="text-gray-600">Manage your patient appointments</p>
      </div>

      {/* Appointments Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Stats Bar */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                Total: {appointments?.length || 0}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                Completed: {appointments?.filter(apt => apt.isCompleted).length || 0}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                Pending: {appointments?.filter(apt => !apt.isCompleted && !apt.cancelled).length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Table Header */}
        <div className="hidden lg:grid lg:grid-cols-[0.5fr_2.5fr_2fr_1.5fr_1fr_2fr] gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
          <span>#</span>
          <span>Patient</span>
          <span>Date & Time</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* Appointments List */}
        <div className="max-h-[70vh] overflow-y-auto">
          {appointments && appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-[0.5fr_2.5fr_2fr_1.5fr_1fr_2fr] gap-4 px-6 py-4 items-center">
                  <span className="text-sm font-medium text-gray-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Patient Info */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={item.userData?.image || '/default-user.png'}
                        alt="patient"
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.userData?.name || 'Unknown Patient'}
                      </p>
                      <p className="text-xs text-gray-500">ID: {item._id.slice(-6)}</p>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{item.slotDate}</p>
                    <p className="text-gray-500">{item.slotTime}</p>
                  </div>

                  {/* Amount */}
                  <div className="text-sm">
                    <span className="font-bold text-green-600">₹{item.amount}</span>
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.cancelled
                          ? 'bg-red-100 text-red-800'
                          : item.isCompleted
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {item.cancelled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Pending'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {!item.cancelled && (
                      <>
                        <button
                          onClick={() => markCompleted(item._id, !item.isCompleted)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all hover:shadow-md ${
                            item.isCompleted
                              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                        >
                          {item.isCompleted ? 'Undo' : 'Complete'}
                        </button>
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-all hover:shadow-md"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={item.userData?.image || '/default-user.png'}
                      alt="patient"
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {item.userData?.name || 'Unknown Patient'}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            item.cancelled
                              ? 'bg-red-100 text-red-800'
                              : item.isCompleted
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {item.cancelled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Date:</span> {item.slotDate}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {item.slotTime}
                        </div>
                        <div>
                          <span className="font-medium">Amount:</span> 
                          <span className="font-bold text-green-600 ml-1">₹{item.amount}</span>
                        </div>
                      </div>

                      {!item.cancelled && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => markCompleted(item._id, !item.isCompleted)}
                            className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                              item.isCompleted
                                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                : 'bg-green-500 hover:bg-green-600 text-white'
                            }`}
                          >
                            {item.isCompleted ? 'Mark Pending' : 'Mark Complete'}
                          </button>
                          <button
                            onClick={() => cancelAppointment(item._id)}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
              <p className="text-gray-500">Your appointments will appear here once patients book with you.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointment
