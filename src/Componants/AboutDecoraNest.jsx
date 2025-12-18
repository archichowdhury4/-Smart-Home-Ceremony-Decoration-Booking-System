import { motion } from "framer-motion";
import introImage from "../../public/assets/aboutdecor.jpg";

export default function AboutDecoraNest() {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
      
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Introduction
          </h2>
          <p className="text-gray-700 mb-4">
            <strong>Welcome to DecoraNest</strong> – your one-stop destination for stylish furniture and household essentials. 
            At DecoraNest, we believe every space deserves comfort, elegance, and functionality. 
            From modern furniture pieces to everyday home accessories, we offer designs that seamlessly blend quality with affordability. 
            Our mission is to make your home feel like a haven with products that define spaces and reflect your unique lifestyle.
          </p>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex justify-center"
        >
          <img
            src="https://decornest.co/wp-content/uploads/2025/09/16-819x1024.jpg"
            alt="DecoraNest introduction"
            className="w-full max-w-md rounded-[50%_20%] shadow-2xl object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
