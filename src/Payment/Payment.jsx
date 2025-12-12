import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Payment = () => {
    const { bookingId } = useParams();
    const axiosSecure = useAxiosSecure();

    // Fetch booking by ID
    const { isLoading, data: booking } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${bookingId}`);
            return res.data;
        }
    });

    // Handle Stripe Payment
   const handlePayment = async () => {
    const paymentInfo = {
        price: booking.price,
        bookingId: booking._id,
        userEmail: booking.userEmail,
        serviceName: booking.serviceName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    window.location.href = res.data.url;
};


    if (isLoading) {
        return (
            <div className="flex justify-center items-center mt-10">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!booking?._id) {
        return <p className="text-center mt-8">Booking not found!</p>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">
                Pay ${booking.price}
            </h2>
            <p className="text-center text-gray-600 mb-4">
                Service: <strong>{booking.serviceName}</strong>
            </p>

            <button
                onClick={handlePayment}
                className="btn btn-primary w-full text-white"
            >
                Pay Now
            </button>
        </div>
    );
};

export default Payment;
