import { useQuery } from '@tanstack/react-query';
import React, { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [sortKey, setSortKey] = useState(''); 
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ['my-bookings', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    }
  });

  
  const sortedBookings = useMemo(() => {
    if (!sortKey) return bookings;

    return [...bookings].sort((a, b) => {
      let aVal, bVal;

      if (sortKey === 'date') {
        aVal = new Date(a.date);
        bVal = new Date(b.date);
      } else if (sortKey === 'status') {
        aVal = a.paymentStatus;
        bVal = b.paymentStatus;
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [bookings, sortKey, sortOrder]);

  
  const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);
  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedBookings.slice(start, end);
  }, [sortedBookings, currentPage]);

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

      
      <div className="mb-4 flex gap-2 items-center">
        <span>Sort by:</span>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="select select-bordered select-sm"
        >
          <option value="">None</option>
          <option value="date">Date</option>
          <option value="status">Payment Status</option>
        </select>

        {sortKey && (
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? 'Asc' : 'Desc'}
          </button>
        )}
      </div>

      
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
            {paginatedBookings.map((b, i) => (
              <tr key={b._id}>
                <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
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

    
      <div className="mt-4 flex justify-center items-center gap-2">
        <button
          className="btn btn-sm btn-outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-sm btn-outline"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyBookings;
