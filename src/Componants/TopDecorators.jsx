import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function TopDecorators() {
  const decorators = [
    {
      name: "Ayesha Karim",
      specialty: "Wedding & Event Decor",
      rating: 5,
      photo: "https://randomuser.me/api/portraits/women/21.jpg",
    },
    {
      name: "Rashed Alam",
      specialty: "Smart Home Interiors",
      rating: 4.5,
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Farzana Akter",
      specialty: "Birthday & Party Decorations",
      rating: 5,
      photo: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Imran Hossain",
      specialty: "Corporate Events",
      rating: 4.5,
      photo: "https://randomuser.me/api/portraits/men/50.jpg",
    },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {halfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
    );
  };

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Top Decorators
        </h2>
        <p className="text-gray-600 mb-12">
          Meet our best decorators with excellent ratings and specialties.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {decorators.map((decorator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 p-6 rounded-2xl shadow-md flex flex-col items-center 
                         transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={decorator.photo}
                alt={decorator.name}
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{decorator.name}</h3>
              <p className="text-gray-600 mb-2 text-sm">{decorator.specialty}</p>
              {renderStars(decorator.rating)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
