import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const images = [
    "https://evolveartisanal.com/wp-content/uploads/2021/07/3_Choose-Your-Items-Wisely-Minimalist-Living-Room-Design.jpg",
    "https://cdn.mos.cms.futurecdn.net/kP6C3xGjxeRtLKyiKPAzyY.jpg",
    "https://i.pinimg.com/736x/05/68/c4/0568c426e0d964e7c324ba64ffd98100.jpg",
    "https://i2.wp.com/vltglight.com/wp-content/uploads/2021/09/wedding-decorations-lighting.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleCTA = () => {
    window.location.href = "/booking"; 
  };

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 gap-10 bg-white">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-6 max-w-xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
          Transform Your Space with <span className="text-indigo-600">DecoraNest</span>
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Premium Smart Home & Ceremony Decoration Booking System to elevate your lifestyle. 
          Elegance, comfort, and modern design in every corner of your home and events.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCTA}
          className="bg-indigo-600 text-white rounded-2xl px-8 py-3 font-semibold mt-4 hover:bg-indigo-700 transition"
        >
          Book Decoration Service
        </motion.button>
      </motion.div>

      {/* Right Image Carousel */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-[45%] h-[400px] md:h-[500px] relative overflow-hidden rounded-3xl shadow-xl"
      >
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute w-full h-full object-cover rounded-3xl"
          />
        ))}
      </motion.div>
    </section>
  );
}
