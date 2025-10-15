import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div className="px-6 md:px-20 py-12">
      {/* Title */}
      <div className="text-center mb-10">
        <p className="text-3xl font-bold text-gray-800">
          Contact <span className="text-gray-700">Us</span>
        </p>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <img
          src={assets.contact_image}
          alt="Contact"
          className="w-full md:w-1/2 rounded-2xl shadow-lg"
        />

        {/* Contact Details */}
        <div className="bg-white p-6 rounded-2xl shadow-md md:w-1/2 space-y-3">
          <p className="text-2xl font-semibold text-gray-900">Our Office</p>
          <p className="text-gray-600">Kolkata, Sector 4</p>
          <p className="text-gray-600">Phone: 8617463209</p>
          <p className="text-gray-600">email: rahulkar2001@gmail.com</p>

          <p className="text-gray-700 mt-4">
            Learn more about our <span className="font-semibold">team</span> and{" "}
            <span className="font-semibold">job openings</span>.
          </p>

          <button className="mt-4 px-6 py-3 bg-primary text-white rounded-xl shadow hover:bg-indigo-700 transition">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
