import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DecoratorEarnings = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
  queryKey: ["decoratorEarnings"],
  queryFn: async () => {
    const res = await axiosSecure.get("/decorator/earnings");
    console.log("Backend response:", res.data); 
    return res.data;
  },
});


  if (isLoading)
    return <p className="text-center mt-10 animate-pulse">Loading earnings...</p>;

  if (isError)
    return <p className="text-center mt-10 text-red-500">Failed to load earnings.</p>;

  const { total, count, payments } = data;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
        Earnings Summary
      </h2>

      <div className="mb-6 flex justify-around">
        <div className="text-center">
          <p className="text-gray-500">Total Payments</p>
          <p className="text-xl font-semibold">{count}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Total Earnings</p>
          <p className="text-xl font-semibold">${total}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Payment History</h3>
      <div className="max-h-96 overflow-y-auto">
        {payments.length === 0 ? (
          <p className="text-gray-500">No payments received yet.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Service</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="text-center">
                  <td className="p-2 border">{p.serviceName}</td>
                  <td className="p-2 border">${p.amount}</td>
                  <td className="p-2 border">
                    {new Date(p.paidAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DecoratorEarnings;
