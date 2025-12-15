import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignDecorator = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ['paid-bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings');
      return res.data.filter(b => b.paymentStatus === 'paid');
    }
  });

  const handleAssign = async (bookingId) => {
    const res = await axiosSecure.patch(`/bookings/${bookingId}`, {
      decorator: 'Decorator A',
      status: 'assigned'
    });

    if (res.data.modifiedCount) {
      refetch();
      Swal.fire('Assigned!', 'Decorator assigned successfully', 'success');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">
        Assign Decorator (Paid Bookings)
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>User</th>
              <th>Payment</th>
              <th>Assign Decorator</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => {
              const isAssigned =
                booking.status === 'assigned' || booking.decorator;

              return (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.serviceName}</td>
                  <td>{booking.userEmail}</td>
                  <td>
                    <span className="badge badge-success">
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      disabled={isAssigned}
                      onClick={() => handleAssign(booking._id)}
                      className={`btn btn-sm ${
                        isAssigned
                          ? 'btn-disabled bg-gray-200'
                          : 'btn-primary'
                      }`}
                    >
                      {isAssigned ? 'Assigned' : 'Assign'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignDecorator;
