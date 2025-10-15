import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    experience: '',
    fees: '',
    speciality: '',
    degree: '', // Changed from education to degree
    address: '',
    about: '',
  })

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const { backendUrl, atoken } = useContext(AdminContext)

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    if (file) setPreview(URL.createObjectURL(file))
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (!image) {
        return toast.error('Please upload an image')
      }

      // Convert data into FormData object
      const data = new FormData()
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key])
      })
      data.append('image', image)

      const res = await axios.post(`${backendUrl}/api/admin/add-doctor`, data, {
        headers: {
          atoken,
          'Content-Type': 'multipart/form-data',
        }
      })

      if (res.data.success) {
        toast.success(res.data.message)
        setFormData({
          name: '',
          email: '',
          password: '',
          experience: '',
          fees: '',
          speciality: '',
          degree: '',   // Reset degree
          address: '',
          about: '',
        })
        setImage(null)
        setPreview(null)
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        Add Doctor
      </h2>

      {/* Upload Section */}
      <div className="flex flex-col items-center mb-8">
        <label
          htmlFor="doc-img"
          className="cursor-pointer flex flex-col items-center border-2 border-dashed border-gray-300 rounded-xl p-6 hover:bg-gray-50 transition-all duration-200"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-24 h-24 rounded-full object-cover mb-3" />
          ) : (
            <img src={assets.upload_area} alt="Upload" className="w-16 h-16 mb-3 opacity-80" />
          )}
          <p className="text-gray-600 text-sm text-center leading-5">
            <span className="font-medium text-blue-600">Click to upload</span> doctor picture
          </p>
        </label>
        <input type="file" id="doc-img" hidden onChange={handleImageChange} />
      </div>

      {/* Doctor Details - no map, all explicit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <div>
          <label className="block text-gray-700 mb-2">Doctor Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Doctor Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Doctor Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Fees</label>
          <input
            type="number"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            placeholder="Enter fees"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Degree</label>
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="e.g. MBBS, MD"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Clinic or Hospital address"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Experience Dropdown */}
        <div>
          <label className="block text-gray-700 mb-2">Experience</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={`${i + 1} year${i > 0 ? 's' : ''}`}>
                {i + 1} Year{i > 0 ? 's' : ''}
              </option>
            ))}
            <option value="10+ years">10+ Years</option>
          </select>
        </div>

        {/* Speciality Dropdown */}
        <div>
          <label className="block text-gray-700 mb-2">Speciality</label>
          <select
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="General Physician">General Physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-6">
        <label className="block text-gray-700 mb-2">About</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          placeholder="Write about doctor..."
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-8">
        <button
          type="submit"
          className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          Add Doctor
        </button>
      </div>
    </form>
  )
}

export default AddDoctor
