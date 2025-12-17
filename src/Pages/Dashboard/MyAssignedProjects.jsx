import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyAssignedProjects = () => {
  const { token } = useAuth(); // Firebase token
  const axiosSecure = useAxiosSecure(); // axios instance with auth header
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!token) return;

    axiosSecure
      .get("/decorator/my-bookings")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Error fetching assigned projects:", err));
  }, [token, axiosSecure]);

  if (!projects.length)
    return (
      <p className="p-6 text-center text-lg text-gray-500">
        No assigned projects yet.
      </p>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Assigned Projects</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-center table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Service</th>
              <th className="border px-4 py-2">Client</th>
              <th className="border px-4 py-2">Payment</th>
              <th className="border px-4 py-2">Assigned At</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{p.serviceName}</td>
                <td className="border px-4 py-2">{p.userEmail}</td>
               
                <td className="border px-4 py-2">
                  {p.paymentStatus === "paid" ? (
                    <span className="badge badge-success">Paid</span>
                  ) : (
                    <span className="badge badge-error">Unpaid</span>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {p.decoratorAssigned?.assignedAt
                    ? new Date(p.decoratorAssigned.assignedAt).toLocaleString()
                    : new Date(p.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssignedProjects;
