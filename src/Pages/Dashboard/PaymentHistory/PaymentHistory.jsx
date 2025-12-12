import { useQuery } from '@tanstack/react-query'; 
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,

    queryFn: async () => {
      const token = await user.getIdToken();  // 🔥 Firebase token

      const res = await axiosSecure.get(`/payments?email=${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`  // 🔥 Token send to backend
        }
      });

      return res.data;
    }
  });

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Payment History: {payments.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Amount</th>
              <th>Paid Time</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, i) => (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>{p.serviceName}</td>
                <td>${p.amount}</td>
                <td>{new Date(p.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
