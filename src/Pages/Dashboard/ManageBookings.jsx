import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: bookings = [] } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings');
      return res.data;
    }
  });

  const handleDelete = (booking) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Booking for ${booking.serviceName} will be deleted!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete'
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${booking._id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire('Deleted!', 'Booking removed', 'success');
            }
          });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-4">Manage Bookings</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Service</th>
              <th>Price</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.userName}</td>
                <td>{booking.userEmail}</td>
                <td>{booking.serviceName}</td>
                <td>${booking.price}</td>
                <td>
                  <span className={`font-semibold ${
                    booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {booking.paymentStatus}
                  </span>
                </td>
                <td>
                  <button onClick={() => handleDelete(booking)} className="btn btn-sm btn-error">
                    <FaTrash />
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

export default ManageBookings;
