import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Appcontext } from '../context/Context'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterdoc, setFilterDoc] = useState([])

  const { doctors } = useContext(Appcontext)
  const navigate = useNavigate()

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter(
          (doc) =>
            doc.speciality.toLowerCase() === speciality.toLowerCase() &&
            doc.available === true
        )
      )
    } else {
      setFilterDoc(doctors.filter((doc) => doc.available === true))
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  // ✅ Full speciality names
  const specialities = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ]

  return (
    <div>
      <p className='text-gray-600'>Browse the doctors specialist</p>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

        {/* Left side filter menu */}
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <Link
            to="/doctors"
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer transition-all ${
              !speciality ? "bg-blue-100 border-blue-400 text-blue-600" : "border-gray-300"
            }`}
          >
            All Doctors
          </Link>

          {specialities.map((item, index) => (
            <Link
              key={index}
              to={`/doctors/${item}`}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer transition-all ${
                speciality?.toLowerCase() === item.toLowerCase()
                  ? "bg-blue-100 border-blue-400 text-blue-600"
                  : "border-gray-300"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 gap-y-6">
          {filterdoc.map((item, index) => (
            <div
              onClick={() => item.available && navigate(`/appointment/${item._id}`)}
              className={`border rounded-xl overflow-hidden transition-all duration-500 ${
                item.available
                  ? "border-blue-200 cursor-pointer hover:translate-y-[-10px]"
                  : "border-gray-300 opacity-50 cursor-not-allowed"
              }`}
              key={item._id}
            >
              <img
                className='bg-blue-50 w-full h-40 object-contain'
                src={item.image}
                alt={item.name}
              />
              <div className='p-4'>
                <div
                  className={`flex items-center gap-2 text-sm ${
                    item.available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></p>
                  <p>{item.available ? "Available" : "Unavailable"}</p>
                </div>
                <p className='font-medium'>{item.name}</p>
                <p className='text-gray-500 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
