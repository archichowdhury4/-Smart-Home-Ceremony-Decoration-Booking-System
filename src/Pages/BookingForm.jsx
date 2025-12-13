import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useParams, useNavigate } from "react-router";

const BookingForm = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetch(`http://localhost:3000/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!user) return <p className="text-red-500">Login to book this service</p>;
  if (!service) return <p className="text-center mt-10">Loading service...</p>;

  const onSubmit = (data) => {
    const bookingData = {
      userName: user.displayName,
      userEmail: user.email,
      serviceName: service.name,
      serviceType: service.type,
      price: service.price,
      phone: data.phone,
      address: data.address,
      date: data.date,
      message: data.message,
    };

    fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Booking Successful!",
          text: `Your booking for ${service.name} is confirmed.`,
        }).then(() => {
          navigate("/services");
        });
        reset();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mt-10">
      <h3 className="text-2xl font-bold mb-4">Book This Service</h3>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" defaultValue={user?.displayName} readOnly className="input input-bordered w-full" />
        <input type="email" defaultValue={user?.email} readOnly className="input input-bordered w-full" />
        <input type="text" value={service.name} readOnly className="input input-bordered w-full" />
        <input type="text" value={service.type} readOnly className="input input-bordered w-full" />
        <input type="text" value={` ${service.price}`} readOnly className="input input-bordered w-full" />

        {/* Phone & Address Fields */}
        <input
          type="text"
          {...register("phone", { required: true })}
          placeholder="Your Phone Number"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          {...register("address", { required: true })}
          placeholder="Your Address"
          className="input input-bordered w-full"
        />

        <input
          type="date"
          {...register("date", { required: true })}
          className="input input-bordered w-full"
        />
        <textarea
          {...register("message")}
          placeholder="Special request or message..."
          className="textarea textarea-bordered w-full"
        />

        <button type="submit" className="btn bg-purple-600 text-white hover:bg-purple-700 mt-2">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
