import React from 'react';
import { motion } from 'framer-motion';
import teamImage from '../../public/assets/team.webp';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10"
        >
          About Us
        </motion.h1>

        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-8 mb-12"
        >
          <div className="md:w-1/2">
            <img
              src={teamImage}
              alt="Team"
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
          <div className="md:w-1/2 text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="mb-4">
              Welcome to Smart Home Ceremony Decoration! We specialize in creating
              unforgettable experiences for weddings, sangeet nights, and all
              kinds of celebrations. Our passion is transforming spaces into
              magical environments that leave lasting memories.
            </p>
            <p>
              With years of experience in event decoration and a dedicated
              team, we bring creativity, precision, and elegance to every
              project. Your happiness is our top priority!
            </p>
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Our Mission</h3>
            <p>
              To provide exceptional decoration services that combine beauty,
              innovation, and personalized touches to make every event
              extraordinary.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-purple-600">Our Vision</h3>
            <p>
              To become the leading event decoration service known for
              creativity, reliability, and excellence, bringing joy and
              unforgettable moments to our clients.
            </p>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mt-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Meet Our Team</h2>
          <p className="text-gray-600 mb-8">
            A group of passionate and talented individuals dedicated to making
            your celebrations perfect.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white rounded-xl shadow-lg p-4 w-40">
              <img
                src="https://www.brides.com/thmb/xOxmPHLsnoyKK2i2hJmFKegFzIY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/coordinator-fixes-flowers-getty-09-19-fc218affe8b74f31a86f89fbb58557e9.jpg"
                alt="Team Member"
                className="rounded-full mb-2"
              />
              <h4 className="font-semibold">Aarushi</h4>
              <p className="text-gray-500 text-sm">Founder & CEO</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 w-40">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2XZ5GhkbjwOVblD7AxdjU8ZWOTPEllEp9jg&s"
                alt="Team Member"
                className="rounded-full mb-2"
              />
              <h4 className="font-semibold">Ms. Diana</h4>
              <p className="text-gray-500 text-sm">Creative Head</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 w-40">
              <img
                src="https://www.instituteofweddings.com/register/wp-content/uploads/2016/04/wedding-planner-2.jpg"
                alt="Team Member"
                className="rounded-full mb-2"
              />
              <h4 className="font-semibold"> Smitha</h4>
              <p className="text-gray-500 text-sm">Event Manager</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
