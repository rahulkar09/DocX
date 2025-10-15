import React from 'react'

const Dashboard = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">System Overview & Management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total Doctors */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Doctors</p>
              <h3 className="text-3xl font-bold text-gray-900">24</h3>
              <p className="text-sm text-green-600 mt-2">+3 this month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Patients */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Patients</p>
              <h3 className="text-3xl font-bold text-gray-900">1,847</h3>
              <p className="text-sm text-blue-600 mt-2">+142 this month</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Appointments</p>
              <h3 className="text-3xl font-bold text-gray-900">685</h3>
              <p className="text-sm text-orange-600 mt-2">48 today</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <h3 className="text-3xl font-bold text-gray-900">₹3.2L</h3>
              <p className="text-sm text-green-600 mt-2">+24% this month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Doctors */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Doctors</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">AS</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Dr. Ankit Sharma</p>
                <p className="text-sm text-gray-500">Cardiologist</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Active
              </span>
            </div>

            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-sm">PM</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Dr. Priya Mehta</p>
                <p className="text-sm text-gray-500">Dermatologist</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Active
              </span>
            </div>

            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">RV</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Dr. Rahul Verma</p>
                <p className="text-sm text-gray-500">Orthopedic</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                Pending
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold text-sm">NK</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Dr. Neha Kapoor</p>
                <p className="text-sm text-gray-500">Pediatrician</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Latest Appointments */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Latest Appointments</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">SS</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Sanjay Singh</p>
                <p className="text-sm text-gray-500">Dr. Sharma • Today 10:00 AM</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Confirmed
              </span>
            </div>

            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-sm">MG</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Maya Gupta</p>
                <p className="text-sm text-gray-500">Dr. Mehta • Today 11:30 AM</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                In Progress
              </span>
            </div>

            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">AJ</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Arjun Joshi</p>
                <p className="text-sm text-gray-500">Dr. Verma • Today 2:00 PM</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                Pending
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold text-sm">RP</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Riya Patel</p>
                <p className="text-sm text-gray-500">Dr. Kapoor • Today 3:30 PM</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Confirmed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">94%</div>
            <p className="text-sm text-gray-600">Doctor Availability</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">87%</div>
            <p className="text-sm text-gray-600">Appointment Success</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">4.8</div>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">12min</div>
            <p className="text-sm text-gray-600">Avg Wait Time</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
