import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
            <FaCheckCircle className="text-green-600 w-24 h-24 mb-6 animate-bounce" />
            <h2 className="text-5xl font-extrabold text-green-700 mb-4">Payment Successful!</h2>
            <p className="text-lg text-green-800 mb-6">
                Thank you! Your payment has been processed successfully.
            </p>
            <button
                onClick={() => window.location.href = '/dashboard'}
                className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
            >
                Go to Dashboard
            </button>
        </div>
    );
};

export default PaymentSuccess;
