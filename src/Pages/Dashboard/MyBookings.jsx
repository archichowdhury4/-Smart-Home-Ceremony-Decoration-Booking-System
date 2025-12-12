import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ['my-bookings', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    }
  });

  const handleBookingDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will remove your booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/bookings/${id}`);
        if (res.data.deletedCount) {
          refetch();
          Swal.fire("Deleted!", "Your booking has been removed.", "success");
        }
      } catch (err) {
        Swal.fire("Error", "Failed to delete booking.", "error");
      }
    }
  };

  const handlePayment = async (booking) => {
    const paymentInfo = {
      price: booking.price,
      bookingId: booking._id,
      userEmail: booking.userEmail,
      serviceName: booking.serviceName,
    };

    try {
      const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
      if (res.data?.url) window.location.assign(res.data.url);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to create payment session.", "error");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Bookings: {bookings.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={b._id}>
                <td>{i + 1}</td>
                <td>{b.serviceName}</td>
                <td>${b.price}</td>
                <td>{b.date}</td>
                <td>
                  {b.paymentStatus === "paid" ? (
                    <span className="text-green-700 font-semibold">Paid</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-primary text-black"
                      onClick={() => handlePayment(b)}
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleBookingDelete(b._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
