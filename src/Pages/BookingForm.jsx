import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router";

const BookingForm = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [bookingInfo, setBookingInfo] = useState({ date: "", message: "" });
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!user) return <p className="text-red-500">Login to book this service</p>;
  if (!service) return <p className="text-center mt-10">Loading service...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo({ ...bookingInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      userName: user.displayName,
      userEmail: user.email,
      serviceName: service.name,
      serviceType: service.type,
      price: service.price,
      date: bookingInfo.date,
      message: bookingInfo.message,
    };

    fetch("http://localhost:3000/bookings", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then(() => {
        setSuccess("Booking successful!");
        setBookingInfo({ date: "", message: "" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mt-10">
      <h3 className="text-2xl font-bold mb-4">Book This Service</h3>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="text" value={user.displayName} readOnly className="input input-bordered w-full" />
        <input type="email" value={user.email} readOnly className="input input-bordered w-full" />
        <input type="text" value={service.name} readOnly className="input input-bordered w-full" />
        <input type="text" value={service.type} readOnly className="input input-bordered w-full" />
        <input type="text" value={` ${service.price}`} readOnly className="input input-bordered w-full" />

        <input type="date" name="date" value={bookingInfo.date} onChange={handleChange} className="input input-bordered w-full" required />
        <textarea name="message" value={bookingInfo.message} onChange={handleChange} placeholder="Special request or message..." className="textarea textarea-bordered w-full" />

        <button type="submit" className="btn bg-purple-600 text-white hover:bg-purple-700 mt-2">
          Confirm Booking
        </button>

        {success && <p className="text-green-600 mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default BookingForm;
