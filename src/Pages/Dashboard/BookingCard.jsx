import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";

const BookingCard = ({ booking }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [status, setStatus] = useState(booking.status);
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async () => {
    if (status === booking.status) return; 
    setLoading(true);
    try {
      await axiosSecure.patch(`/decorator/update-status/${booking._id}`, {
        status,
      });

      
      queryClient.setQueryData(["todaySchedule"], (oldData) => {
        return oldData.map((b) =>
          b._id === booking._id ? { ...b, status } : b
        );
      });

      alert("Status updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 border rounded-xl shadow hover:shadow-lg bg-white">
      <h3 className="font-semibold text-lg text-blue-600">{booking.serviceName}</h3>
      <p>Date: {booking.date}</p>
      <p>Payment: {booking.paymentStatus}</p>
      <p>
        <span className="font-medium">Status:</span> {status}
      </p>

      <div className="mt-2 flex gap-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="assigned">Assigned</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={handleUpdateStatus}
          disabled={loading}
          className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
