import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedDecorator, setSelectedDecorator] = useState({});

  // Fetch paid bookings
  const { data: bookings = [], refetch: refetchBookings } = useQuery({
    queryKey: ['paid-bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings');
      return res.data.filter(b => b.paymentStatus === 'paid');
    },
  });

  // Fetch approved decorators
  const { data: decorators = [] } = useQuery({
    queryKey: ['decorators'],
    queryFn: async () => {
      const res = await axiosSecure.get('/decorators?status=approved');
      return res.data;
    },
  });

  const handleAssign = async (bookingId) => {
    if (!selectedDecorator[bookingId]) {
      return Swal.fire('Error', 'Please select a decorator first', 'error');
    }

    const decorator = selectedDecorator[bookingId];

    try {
      const res = await axiosSecure.patch(`/bookings/${bookingId}/assign-decorator`, {
        decoratorId: decorator._id,
        decoratorName: decorator.name,
        decoratorEmail: decorator.email
      });

      if (res.data.result?.modifiedCount) {
        refetchBookings();
        Swal.fire('Assigned!', 'Decorator assigned successfully', 'success');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to assign decorator', 'error');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Assign Decorator (Paid Bookings)</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>User</th>
              <th>Payment</th>
              <th>Decorator</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => {
              const isAssigned = booking.status === 'assigned' || booking.decoratorAssigned;

              return (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.serviceName}</td>
                  <td>{booking.userEmail}</td>
                  <td>
                    <span className="badge badge-success">{booking.paymentStatus}</span>
                  </td>
                  <td>
                    {isAssigned ? (
                      booking.decoratorAssigned?.decoratorName
                    ) : (
                      <select
                        className="select select-sm"
                        value={selectedDecorator[booking._id]?._id || ''}
                        onChange={(e) => {
                          const dec = decorators.find(d => d._id === e.target.value);
                          setSelectedDecorator(prev => ({
                            ...prev,
                            [booking._id]: dec
                          }));
                        }}
                      >
                        <option value="">Select</option>
                        {decorators.map(d => (
                          <option key={d._id} value={d._id}>
                            {d.name} ({d.email})
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td>
                    <button
                      disabled={isAssigned}
                      onClick={() => handleAssign(booking._id)}
                      className={`btn btn-sm ${
                        isAssigned ? 'btn-disabled bg-gray-200' : 'btn-primary'
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
