import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Revenue = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ['revenue'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/revenue');
      return res.data;
    }
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Revenue Monitoring</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat shadow-lg bg-base-200 p-4 rounded-lg text-center">
          <div className="stat-title text-lg">Total Revenue</div>
          <div className="stat-value text-green-600 text-2xl">
            ${data?.totalRevenue || 0}
          </div>
          <div className="stat-desc">From Paid Bookings</div>
        </div>

        <div className="stat shadow-lg bg-base-200 p-4 rounded-lg text-center">
          <div className="stat-title text-lg">Paid Bookings</div>
          <div className="stat-value text-blue-600 text-2xl">
            {data?.totalPaidBookings || 0}
          </div>
          <div className="stat-desc">Total Paid</div>
        </div>

        <div className="stat shadow-lg bg-base-200 p-4 rounded-lg text-center">
          <div className="stat-title text-lg">Unpaid Bookings</div>
          <div className="stat-value text-red-600 text-2xl">
            {data?.totalUnpaidBookings || 0}
          </div>
          <div className="stat-desc">Pending Payment</div>
        </div>

        <div className="stat shadow-lg bg-base-200 p-4 rounded-lg text-center">
          <div className="stat-title text-lg">Total Bookings</div>
          <div className="stat-value text-purple-600 text-2xl">
            {data?.totalBookings || 0}
          </div>
          <div className="stat-desc">All Bookings</div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
