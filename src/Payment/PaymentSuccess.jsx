import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const bookingId = searchParams.get('bookingId');
    const axiosSecure = useAxiosSecure();

   useEffect(() => {
    if (!bookingId) {
        setMessage("Invalid booking ID");
        setLoading(false);
        return;
    }

    axiosSecure
        .patch(`/payment-success/${bookingId}`)
        .then(() => {
            setMessage("Payment successful! Booking is now confirmed.");
        })
        .catch(() => {
            setMessage("Payment processed but update failed.");
        })
        .finally(() => setLoading(false));
}, [bookingId]);


    if (loading) return (
        <div className="flex justify-center items-center mt-8">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );

    return (
        <div className="p-6 text-center max-w-md mx-auto mt-32 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-4">{message}</h2>
            <Link to="/dashboard/my-bookings">
                <button className="btn btn-primary text-black mt-4">Go to My Bookings</button>
            </Link>
        </div>
    );
};

export default PaymentSuccess;
