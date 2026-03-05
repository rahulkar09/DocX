import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Appcontext } from '../context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets_frontend/assets';

const Appointments = () => {
  const { docid } = useParams();
  const { doctors, currency, token, backendUrl, getDoctorsData } = useContext(Appcontext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch doctor info from context
  const fetchDocInfo = () => {
    const foundDoc = doctors.find((doc) => doc._id === docid);
    setDocInfo(foundDoc || null);
    setLoading(false);
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docid]);

  // Generate 7-day slots dynamically, excluding already-booked times
  const getAvailableSlots = () => {
    if (!docInfo) return;

    const allSlots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Build the slot date string as "day_month_year" to match backend format
      const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;

      const times = [];

      // Start at 10:00 AM, end at 9:00 PM
      let startHour = 10;
      const endHour = 21;

      // If today, skip past hours
      if (i === 0) {
        const nowHour = today.getHours();
        if (nowHour >= startHour) {
          startHour = nowHour + 1; // start from next hour
        }
      }

      for (let hour = startHour; hour < endHour; hour++) {
        // Two slots per hour: :00 and :30
        for (const minutes of ['00', '30']) {
          const h = hour > 12 ? hour - 12 : hour;
          const ampm = hour >= 12 ? 'PM' : 'AM';
          const displayHour = h === 0 ? 12 : h;
          const timeStr = `${displayHour}:${minutes} ${ampm}`;

          // Check if this slot is already booked (using doctor's slot_booked data)
          const bookedForDate = docInfo.slot_booked?.[slotDate] || [];
          if (!bookedForDate.includes(timeStr)) {
            times.push(timeStr);
          }
        }
      }

      if (times.length > 0) {
        allSlots.push({ date: slotDate, times });
      }
    }

    setDocSlots(allSlots);
  };

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

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

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId: docid, slotDate: docSlots[slotIndex].date, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success('Appointment booked successfully!');
        setSlotTime('');
        // Refresh doctor data so slot_booked is up-to-date
        if (getDoctorsData) getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  // Doctor not found
  if (!docInfo) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Doctor not found.</p>
      </div>
    );
  }

  return (
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
                  {(() => {
                    const [d, m, y] = day.date.split('_');
                    return new Date(y, m - 1, d).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    });
                  })()}
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <div className="flex flex-wrap gap-2">
              {docSlots[slotIndex]?.times.map((time, i) => (
                <button
                  key={i}
                  onClick={() => setSlotTime(time)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                    slotTime === time
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  {time}
                </button>
              ))}
              {docSlots[slotIndex]?.times.length === 0 && (
                <p className="text-gray-500 text-sm">No available slots for this day.</p>
              )}
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
  );
};

export default Appointments;
