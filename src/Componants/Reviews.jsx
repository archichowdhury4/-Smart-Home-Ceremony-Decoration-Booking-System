import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Reviews() {
  const reviews = [
    {
      name: "Sadia Rahman",
      feedback: "Very professional team, loved the wedding stage!",
      rating: 5,
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rashed Ahmed",
      feedback: "Smart home setup was completed perfectly.",
      rating: 4.5,
      photo: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      name: "Farzana Akter",
      feedback: "Amazing decoration service, highly recommend!",
      rating: 5,
      photo: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Customer Reviews
        </h2>
        <p className="text-gray-600 mb-12">Real feedback builds trust.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center 
                         transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {review.photo && (
                <img
                  src={review.photo}
                  alt={review.name}
                  className="w-16 h-16 rounded-full mb-4 object-cover"
                />
              )}
              <div className="flex text-yellow-400 mb-2">
                {[...Array(Math.floor(review.rating))].map((_, i) => (
                  <FaStar key={i} />
                ))}
                {review.rating % 1 !== 0 && <FaStarHalfAlt />}
                {[...Array(5 - Math.ceil(review.rating))].map((_, i) => (
                  <FaRegStar key={i} />
                ))}
              </div>
              <p className="text-gray-700 mb-2">"{review.feedback}"</p>
              <h3 className="text-gray-900 font-semibold">{review.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
