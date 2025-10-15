import React, { useContext, useEffect, useState } from 'react';
import { Appcontext } from '../context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointment = () => {
  const { token, backendUrl } = useContext(Appcontext);
  const [appointments, setAppointments] = useState([]);

  // ✅ Fetch user appointments
  const fetchAppointments = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/my-appointments`, {
        headers: { token },
      });

      if (data.success) setAppointments(data.appointments);
      else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch appointments');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [token]);

  // ✅ Cancel appointment
  const cancelAppointment = async (id) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/user/cancel-appointment/${id}`, {
        headers: { token },
      });

      if (data.success) {
        toast.success('Appointment cancelled successfully');
        fetchAppointments();
      } else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error('Failed to cancel appointment');
    }
  };

  // ✅ Mark appointment complete/incomplete
  const markCompleted = async (id, isCompleted) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/user/update-appointment-status/${id}`,
        { isCompleted },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(`Appointment marked as ${isCompleted ? 'completed' : 'not completed'}`);
        fetchAppointments();
      } else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update appointment');
    }
  };

  return (
    <div className="p-6">
      <p className="text-2xl font-bold mb-6">My Appointments</p>

      <div className="space-y-6">
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg shadow-sm p-4 bg-white"
            >
              {/* Doctor Image */}
              <div className="flex-shrink-0">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-20 h-20 rounded-full object-cover border"
                />
              </div>

              {/* Appointment Details */}
              <div className="flex-1 ml-4">
                <p className="font-semibold text-lg">{item.docData.name}</p>
                <p className="text-gray-600 text-sm">{item.docData.speciality}</p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Date & Time:</span> {item.slotDate} | {item.slotTime}
                </p>
                <p className="text-sm mt-1 text-gray-500">
                  <span className="font-medium">Amount:</span> ₹{item.amount}
                </p>
                <p className={`text-sm mt-1 font-medium ${item.isCompleted ? 'text-green-600' : 'text-yellow-600'}`}>
                  Status: {item.isCompleted ? "Completed" : "Booked"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                {!item.isComplete && (
                  <>
                    <button
                      className="px-4 py-2 border text-stone-700 hover:bg-primary rounded-xl hover:text-white duration-300 transition-all text-sm"
                    >
                      Pay Online
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="px-4 py-2 border text-stone-700 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 text-sm"
                    >
                      Cancel Appointment
                    </button>
                    <button
                      onClick={() => markCompleted(item._id, true)}
                      className="px-4 py-2 border text-stone-700 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300 text-sm"
                    >
                      Mark Completed
                    </button>
                  </>
                )}
                
              </div>
            </div>
          ))
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointment;
