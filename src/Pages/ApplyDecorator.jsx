import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ApplyDecorator = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleApply = (data) => {
  const decoratorData = {
    name: user?.displayName,
    email: user?.email,
    phone: data.phone,
    experience: data.experience,
    serviceCategory: data.serviceCategory,
  };

  axiosSecure.post('/decorators', decoratorData)
    .then(res => {
      if (res.data.insertedId) {
        Swal.fire(
          'Applied!',
          'Your decorator application is under review',
          'success'
        );
      }
    })
    .catch(err => {
      Swal.fire(
        'Error',
        err.response?.data?.message || 'Already applied',
        'error'
      );
    });
};


  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Apply as Decorator
      </h2>

      <form onSubmit={handleSubmit(handleApply)}>

        {/* Name */}
        <div className="mb-4">
          <label className="label">Name</label>
          <input
            type="text"
            defaultValue={user?.displayName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="label">Email</label>
          <input
            type="email"
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="label">Phone</label>
          <input
            type="text"
            {...register('phone', { required: true })}
            className="input input-bordered w-full"
          />
          {errors.phone && <p className="text-red-500">Phone is required</p>}
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="label">Experience (Years)</label>
          <input
            type="number"
            {...register('experience', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Service Category */}
        <div className="mb-4">
          <label className="label">Service Category</label>
          <select
            {...register('serviceCategory', { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            <option value="Wedding">Wedding</option>
            <option value="Home">Smart Home</option>
            <option value="Office">Birthday</option>
            <option value="Seminar">Outdoor</option>
            <option value="Seminar">Anniversary</option>
            <option value="Seminar">Baby shower</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
        >
          Apply as Decorator
        </button>
      </form>
    </div>
  );
};

export default ApplyDecorator;
