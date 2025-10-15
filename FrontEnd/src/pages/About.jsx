import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div className="px-6 md:px-20 py-12">
      {/* About Us Title */}
      <div className="text-center mb-10">
        <p className="text-3xl font-bold text-gray-800">
          About <span className="text-indigo-600">Us</span>
        </p>
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
        <img
          src={assets.about_image}
          alt="About"
          className="w-full md:w-1/2 rounded-2xl shadow-lg"
        />
        <div className="text-gray-700 space-y-4 md:w-1/2">
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health record
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way
          </p>
          <b className="block text-lg text-gray-900">Our Vision</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it
          </p>
        </div>
      </div>

      {/* Why Choose Us Title */}
      <div className="text-center mb-10">
        <p className="text-3xl font-bold text-gray-800">
          Why <span className="text-primary">CHOOSE US</span>
        </p>
      </div>

      {/* Why Choose Us Features */}
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <b className="text-xl text-primary">Efficiency</b>
          <p className="text-gray-600 mt-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dolore
            nam quasi consectetur reiciendis quos fugiat obcaecati, expedita
            perferendis qui?
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <b className="text-xl text-primary">Personalisation</b>
          <p className="text-gray-600 mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
            molestiae libero? Ipsam minima dolore obcaecati fuga repellendus
            harum rerum cum.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <b className="text-xl text-primary">Convenience</b>
          <p className="text-gray-600 mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos omnis
            quisquam aliquam unde, molestias esse vero modi saepe explicabo ut?
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
