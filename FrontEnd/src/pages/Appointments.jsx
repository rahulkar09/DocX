import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Appcontext } from '../context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets_frontend/assets';

const Appointments = () => {
  const { docid } = useParams();
  const { doctors, currency, token, backendUrl } = useContext(Appcontext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]); // ✅ Track booked slots

  // Fetch doctor info from context
  const fetchDocInfo = () => {
    const foundDoc = doctors.find((doc) => doc._id === docid);
    setDocInfo(foundDoc || null);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docid]);

  // ✅ Fetch booked appointments for this doctor
  const fetchBookedSlots = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/doctor-booked-slots/${docid}`
      );

      if (data.success) {
        // Store booked slots as array of "date|time" strings for quick lookup
        const bookedSlotKeys = data.appointments.map(
          (apt) => `${apt.slotDate}|${apt.slotTime}`
        );
        setBookedSlots(bookedSlotKeys);
      }
    } catch (err) {
      console.error('Error fetching booked slots:', err);
    }
  };

  useEffect(() => {
    if (docid) {
      fetchBookedSlots();
    }
  }, [docid]);

  // Generate 7-day slots dynamically
  const getAvailableSlots = () => {
    if (!docInfo) return;

    const today = new Date();
    const slots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const dateString = currentDate.toISOString().split('T')[0];
      const daySlots = [];

      // Clinic hours: 10 AM – 8 PM, every 1 hour slot
      for (let hour = 10; hour < 20; hour++) {
        const timeString = `${hour}:00 - ${hour + 1}:00`;
        daySlots.push(timeString);
      }

      slots.push({ date: dateString, times: daySlots });
    }

    setDocSlots(slots);
  };

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  // ✅ Check if a slot is already booked
  const isSlotBooked = (date, time) => {
    return bookedSlots.includes(`${date}|${time}`);
  };

  // Book appointment API
  const bookAppointment = async () => {
    if (!token) {
      toast.error('Please login first');
      return;
    }

    if (!slotTime) {
      toast.error('Please select a slot time');
      return;
    }

    // ✅ Check if slot is already booked before making API call
    const selectedDate = docSlots[slotIndex].date;
    if (isSlotBooked(selectedDate, slotTime)) {
      toast.error('This slot is already booked. Please select another time.');
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId: docid, slotDate: docSlots[slotIndex].date, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success('Appointment booked successfully!');
        // ✅ Add the newly booked slot to local state
        setBookedSlots([...bookedSlots, `${docSlots[slotIndex].date}|${slotTime}`]);
        setSlotTime(''); // Clear selection
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    docInfo && (
      <div className="w-full flex flex-col md:flex-row gap-8 p-6">
        {/* Doctor Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-72 h-72 object-cover rounded-2xl shadow-lg border border-gray-200"
          />
        </div>

        {/* Doctor Details */}
        <div className="flex-1 space-y-4">
          {/* Name + Verified */}
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold text-gray-800">{docInfo.name}</p>
            <img src={assets.verified_icon} alt="verified" className="w-5 h-5" />
          </div>

          {/* Degree + Speciality + Experience */}
          <div className="flex flex-wrap items-center gap-3 text-gray-600">
            <p className="text-lg">
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
              {docInfo.experience}
            </button>
          </div>

          {/* About Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-700">About</p>
              <img src={assets.info_icon} alt="info" className="w-4 h-4" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{docInfo.about}</p>

            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{' '}
              <span className="text-gray-600">
                {currency}
                {docInfo.fees}
              </span>
            </p>
          </div>

          {/* Available Slots */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Available Slots</h3>

            {/* Date Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {docSlots.map((day, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime('');
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    slotIndex === index
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white border border-gray-300 text-gray-600 hover:border-blue-400'
                  }`}
                >
                  {new Date(day.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <div className="flex flex-wrap gap-2">
              {docSlots[slotIndex]?.times.map((time, i) => {
                const isBooked = isSlotBooked(docSlots[slotIndex].date, time);
                
                return (
                  <button
                    key={i}
                    onClick={() => !isBooked && setSlotTime(time)}
                    disabled={isBooked}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      isBooked
                        ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed line-through'
                        : slotTime === time
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    {time}
                    {isBooked && (
                      <span className="ml-1 text-xs">🔒</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ✅ Selected Slot Info */}
            {slotTime && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Selected:</strong> {docSlots[slotIndex].date} at {slotTime}
                </p>
              </div>
            )}

            {/* Book Button */}
            <button
              onClick={bookAppointment}
              disabled={!slotTime}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                slotTime
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {slotTime ? 'Book Appointment' : 'Please Select a Time Slot'}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Appointments;
