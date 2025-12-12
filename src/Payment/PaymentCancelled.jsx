import React from 'react';
import { Link } from 'react-router';
import { FaTimesCircle } from 'react-icons/fa';

const PaymentCancelled = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
            <FaTimesCircle className="text-red-600 w-24 h-24 mb-6 animate-pulse" />
            <h2 className="text-4xl font-extrabold text-red-700 mb-4">Payment Cancelled</h2>
            <p className="text-lg text-red-800 mb-6">
                Your payment was not completed. Please try again.
            </p>
            <Link to="/dashboard/my-bookings">
                <button className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-red-700 transition">
                    Try Again
                </button>
            </Link>
        </div>
    );
};

export default PaymentCancelled;
