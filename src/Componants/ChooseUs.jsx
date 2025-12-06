import { FaUsers, FaClock, FaPalette, FaMoneyBillWave, FaCheckCircle, FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ChooseUs() {
  const points = [
    {
      icon: <FaUsers className="text-indigo-600 w-8 h-8" />,
      title: "Professional Decoration Team",
    },
    {
      icon: <FaMoneyBillWave className="text-indigo-600 w-8 h-8" />,
      title: "Affordable Packages",
    },
    {
      icon: <FaPalette className="text-indigo-600 w-8 h-8" />,
      title: "Custom Theme Design",
    },
    {
      icon: <FaHeadset className="text-indigo-600 w-8 h-8" />,
      title: "24/7 Support",
    },
    {
      icon: <FaClock className="text-indigo-600 w-8 h-8" />,
      title: "On-time Delivery",
    },
    {
      icon: <FaCheckCircle className="text-indigo-600 w-8 h-8" />,
      title: "1000+ Happy Clients",
    },
  ];

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center"
            >
              <div className="mb-4">{point.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{point.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
