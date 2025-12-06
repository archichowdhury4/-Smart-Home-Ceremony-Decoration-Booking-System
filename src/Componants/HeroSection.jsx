import { motion } from "framer-motion";
import { useState, useEffect } from "react";


function Button({ children, variant = "solid", className }) {
  const base =
    "px-6 py-3 rounded-2xl font-semibold transition-transform duration-200 hover:scale-105";
  const styles =
    variant === "outline"
      ? "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
      : "bg-indigo-600 text-white hover:bg-indigo-700";
  return <button className={`${base} ${styles} ${className}`}>{children}</button>;
}

export default function HeroSection() {
  const images = [
    "https://evolveartisanal.com/wp-content/uploads/2021/07/3_Choose-Your-Items-Wisely-Minimalist-Living-Room-Design.jpg",
    "https://cdn.mos.cms.futurecdn.net/kP6C3xGjxeRtLKyiKPAzyY.jpg",
    "https://i.pinimg.com/736x/05/68/c4/0568c426e0d964e7c324ba64ffd98100.jpg",
       "https://www.valarflowers.com/cdn/shop/files/SKU-05_bf6606c9-51b1-44de-91f4-ddba67cc80b6.jpg?v=1724051780&width=1500",
    "https://sc04.alicdn.com/kf/A6818ed52336f4cbc8b725aa4e8bd4a6dC.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 gap-10 bg-white">
      
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 max-w-xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
          Transform Your Space with <span className="text-indigo-600">DecoraNest</span>
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Premium Smart Home & Ceremony Decoration Booking System to elevate your lifestyle. Bring elegance, comfort, and modern design into every corner of your home and events.
        </p>

        <div className="flex gap-4 mt-4">
          <Button className="rounded-2xl px-6 py-3 text-lg">Book Now</Button>
          <Button variant="outline" className="rounded-2xl px-6 py-3 text-lg">
            Learn More
          </Button>
        </div>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
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
