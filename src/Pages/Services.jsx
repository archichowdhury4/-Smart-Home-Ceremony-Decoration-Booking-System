import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      });
  }, []);

  const filteredServices = services.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? item.type === typeFilter : true;
    const matchesMin = minBudget ? item.price >= Number(minBudget) : true;
    const matchesMax = maxBudget ? item.price <= Number(maxBudget) : true;

    return matchesSearch && matchesType && matchesMin && matchesMax;
  });

  const serviceTypes = [...new Set(services.map((s) => s.type))];

  const handleViewDetails = (serviceId) => {
    if (user) navigate(`/services/${serviceId}`);
    else navigate("/login");
  };

  return (
    <div className="px-6 md:px-16 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by service name..."
          className="input input-bordered w-full focus:ring-2 focus:ring-purple-500 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full focus:ring-2 focus:ring-purple-500 transition"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          {serviceTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Budget"
          className="input input-bordered w-full focus:ring-2 focus:ring-purple-500 transition"
          value={minBudget}
          onChange={(e) => setMinBudget(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Budget"
          className="input input-bordered w-full focus:ring-2 focus:ring-purple-500 transition"
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
        />
      </div>

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
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="p-5 bg-white shadow-md rounded-xl border 
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover rounded-md hover:scale-105 transition"
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

      {!loading && filteredServices.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No services found based on your filters.
        </p>
      )}
    </div>
  );
};

export default ServicesPage;
