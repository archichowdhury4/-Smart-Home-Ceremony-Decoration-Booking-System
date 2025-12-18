import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedDecorator, setSelectedDecorator] = useState({});

  const { data: bookings = [] } = useQuery({
    queryKey: ['paid-bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings');
      return res.data.filter(b => b.paymentStatus === 'paid');
    },
  });

  const { data: decorators = [] } = useQuery({
    queryKey: ['decorators'],
    queryFn: async () => {
      const res = await axiosSecure.get('/decorators?status=approved');
      return res.data;
    },
  });

  const assignMutation = useMutation({
    mutationFn: ({ bookingId, decoratorEmail }) =>
      axiosSecure.patch(`/bookings/${bookingId}/assign-decorator`, {
        decoratorEmail,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['paid-bookings']); // 🔥 KEY FIX
      Swal.fire('Assigned!', 'Decorator assigned successfully', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to assign decorator', 'error');
    },
  });

  const handleAssign = (bookingId) => {
    const decorator = selectedDecorator[bookingId];
    if (!decorator) {
      return Swal.fire('Error', 'Please select a decorator first', 'error');
    }

    assignMutation.mutate({
      bookingId,
      decoratorEmail: decorator.email,
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Assign Decorator (Paid Bookings)</h2>

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
            const isAssigned = booking.decoratorAssigned;

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
                  {isAssigned ? (
                    booking.decoratorAssigned.decoratorName
                  ) : (
                    <select
                      className="select select-sm"
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
                          {d.name}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
                <td>
                  <button
                    disabled={isAssigned || assignMutation.isLoading}
                    onClick={() => handleAssign(booking._id)}
                    className="btn btn-sm btn-primary"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AssignDecorator;
