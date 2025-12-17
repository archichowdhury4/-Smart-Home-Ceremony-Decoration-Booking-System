import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const MyAssignedProjects = () => {
  const { user, token } = useAuth(); // token must be Firebase ID token
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:3000/decorator/my-bookings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, [token]);

  if (!projects.length) return <p>No assigned projects yet.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Assigned Projects</h2>
      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Service</th>
            <th className="border px-4 py-2">Client</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Assigned At</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p._id}>
              <td className="border px-4 py-2">{p.serviceName}</td>
              <td className="border px-4 py-2">{p.userEmail}</td>
              <td className="border px-4 py-2">{p.paymentStatus}</td>
              <td className="border px-4 py-2">{new Date(p.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAssignedProjects;
