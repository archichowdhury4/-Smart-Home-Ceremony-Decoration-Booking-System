import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const TopServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/top-services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (serviceId) => {
    if (user) navigate(`/services/${serviceId}`);
    else navigate("/login");
  };

  return (
    <div className="px-6 md:px-16 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Top Services</h2>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="p-5 bg-white border rounded-xl shadow animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200 rounded-md"></div>
              <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="mt-3 h-3 bg-gray-200 rounded w-full"></div>
              <div className="mt-3 h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="mt-5 flex justify-between">
                <div className="h-4 bg-gray-200 w-16 rounded"></div>
                <div className="h-8 bg-gray-300 w-20 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Services Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-5 bg-white shadow-md rounded-xl border 
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover rounded-md hover:scale-105 transition duration-300"
              />

              <h3 className="text-xl font-semibold mt-4">{service.name}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>

              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold text-purple-600">
                  ৳ {service.price}
                </p>
                <button
                  className="btn btn-sm bg-purple-600 text-white hover:bg-purple-700"
                  onClick={() => handleViewDetails(service.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && services.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No services found.</p>
      )}
    </div>
  );
};

export default TopServices;
