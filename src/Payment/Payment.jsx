import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Payment = () => {
    const { bookingId } = useParams(); 
    const axiosSecure = useAxiosSecure();

    
    const { isLoading, data: booking } = useQuery({
        queryKey: ['bookings', bookingId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${bookingId}`);
            return res.data;
        }
    });

    const handlePayment = async () => {
        if (!booking) return;

        const paymentInfo = {
            price: booking.price,            
            bookingId: booking._id,           
            userEmail: booking.userEmail,     
            serviceName: booking.serviceName, 
            serviceType: booking.serviceType, 
            date: booking.date,              
        };

        try {
            const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

            if (res.data?.url) {
                window.location.href = res.data.url;
            } else {
                alert('Payment session failed!');
            }
        } catch (err) {
            console.error('Payment error:', err);
            alert('Payment failed. Check console for details.');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-infinity loading-xl"></span>
            </div>
        );
    }

    if (!booking?._id) {
        return <div>Booking not found!</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
                Please Pay ${booking.price} for: {booking.serviceName}
            </h2>
            <button 
                onClick={handlePayment} 
                className="btn btn-primary text-black"
            >
                Pay
            </button>
        </div>
    );
};

export default Payment;
