import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";

// React Icons
import { FaStar, FaMoneyBillWave, FaUserFriends } from "react-icons/fa";
import { MdLocationOn, MdCheckCircle, MdCancel } from "react-icons/md";
import { BiCategory } from "react-icons/bi";

const ServiceDetails = () => {
  const [service, setService] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(`https://smart-home-ceremony-deccoration-boo.vercel.app/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [id]);

  const handleBook = () => {
  if (!user) {
    navigate("/login", { state: { from: location.pathname } });
    return;
  }
  navigate(`/book/${id}`); 
};

  if (!service) {
    return <p className="text-center mt-10">Loading service details...</p>;
  }

  return (
    <div className="px-6 md:px-16 py-12">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left Image */}
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />

        {/* Right Side Info */}
        <div>
          <h2 className="text-3xl font-bold">{service.name}</h2>
          <p className="text-gray-600 mt-3">{service.description}</p>

          {/* Type */}
          <p className="flex items-center gap-2 text-lg mt-4">
            <BiCategory className="text-purple-600 text-xl" />
            <span className="font-semibold">Type:</span> {service.type}
          </p>

          {/* Location */}
          <p className="flex items-center gap-2 text-lg mt-2">
            <MdLocationOn className="text-red-500 text-xl" />
            <span className="font-semibold">Location:</span> {service.location}
          </p>

          {/* Rating */}
          <p className="flex items-center gap-2 text-lg mt-2">
            <FaStar className="text-yellow-500 text-lg" />
            <span className="font-semibold">Rating:</span> {service.rating}
            <FaUserFriends /> ({service.reviews} reviews)
          </p>

          {/* Availability */}
          <p className="flex items-center gap-2 text-lg mt-2">
            {service.available ? (
              <>
                <MdCheckCircle className="text-green-600 text-xl" />
                <span className="font-bold text-green-700">Available</span>
              </>
            ) : (
              <>
                <MdCancel className="text-red-600 text-xl" />
                <span className="font-bold text-red-700">Not Available</span>
              </>
            )}
          </p>

          {/* Price */}
          <p className="flex items-center gap-2 text-3xl font-bold text-purple-600 mt-6">
            <FaMoneyBillWave />  {service.price}
          </p>

          {/* Button */}
          <NavLink
            onClick={handleBook}
            className="btn bg-purple-600 text-white mt-8 hover:bg-purple-700"
          >
            Book This Service
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
