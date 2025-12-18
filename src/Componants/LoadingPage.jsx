import React from "react";
import { motion } from "framer-motion";

const LoadingPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br 
        from-blue-200/40 via-purple-200/40 to-pink-200/40 px-4">

            
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, yoyo: Infinity }}
                className="p-10 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl flex flex-col items-center"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-12 h-12 border-4 border-t-blue-500 border-l-transparent border-r-transparent border-b-transparent rounded-full mb-4"
                ></motion.div>

                <p className="text-gray-800 font-medium text-lg">Loading...</p>
            </motion.div>

        </div>
    );
};

export default LoadingPage;
