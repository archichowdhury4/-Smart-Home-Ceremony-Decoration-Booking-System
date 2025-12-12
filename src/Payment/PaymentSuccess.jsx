import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const axiosSecure = useAxiosSecure();
  const [message, setMessage] = useState("Processing payment...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      setMessage("Booking ID not found!");
      setLoading(false);
      return;
    }

    axiosSecure.patch(`/payment-success/${bookingId}`)
      .then(() => setMessage("Payment successful! Your booking is confirmed."))
      .catch((err) => {
        console.error(err);
        setMessage("Payment processed but failed to update booking.");
      })
      .finally(() => setLoading(false));
  }, [bookingId, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto mt-32 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-3xl font-bold mb-4">{message}</h2>
      <Link to="/dashboard/my-bookings">
        <button className="btn btn-primary text-black mt-4">Go to My Bookings</button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
