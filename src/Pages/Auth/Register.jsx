import React from 'react';
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from './SocialLogin';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser } = useAuth();

    const handleRegistration = (data) => {
        registerUser(data.email, data.password)
            .then(result => console.log(result.user))
            .catch(error => console.log(error));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br 
        from-blue-200/40 via-purple-200/40 to-pink-200/40 px-4">

            {/* GLASS CARD */}
            <motion.form
                onSubmit={handleSubmit(handleRegistration)}
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="p-10 w-full max-w-sm rounded-3xl shadow-2xl border 
                bg-white/20 backdrop-blur-xl border-white/30"
            >
                {/* TITLE */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-semibold text-center mb-8 text-gray-800 tracking-wide"
                >
                    Create your Account
                </motion.h2>

                {/* EMAIL */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mb-6"
                >
                    <label className="block text-gray-800 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-2xl bg-white/40 backdrop-blur-sm 
                        border border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 
                        transition-all"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">Email is required</p>
                    )}
                </motion.div>

                {/* PASSWORD */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.32 }}
                    className="mb-6"
                >
                    <label className="block text-gray-800 font-medium mb-2">Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                        })}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 rounded-2xl bg-white/40 backdrop-blur-sm 
                        border border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.password?.type === "required" && (
                        <p className='text-red-500 text-sm mt-1'>Password is required</p>
                    )}
                    {errors.password?.type === "minLength" && (
                        <p className='text-red-500 text-sm mt-1'>At least 6 characters required</p>
                    )}
                    {errors.password?.type === "pattern" && (
                        <p className='text-red-500 text-sm mt-1'>
                            Must include uppercase, lowercase, number & special character
                        </p>
                    )}
                </motion.div>

                {/* BUTTON */}
                <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 180 }}
                    type="submit"
                    className="w-full bg-blue-600/80 text-white py-3 rounded-2xl font-semibold mb-4
                    hover:bg-blue-700/90 transition shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                    Register
                </motion.button>

                 <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.42 }}
                    className="text-right mb-2"
                >
                   <SocialLogin></SocialLogin>
                </motion.div>


            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-center text-gray-800 text-sm"
            >
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-blue-600 font-medium hover:underline"
                >
                   Login
                </Link>
            </motion.div>
            </motion.form>

        
        </div>
    );
};

export default Register;
