import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedService, setSelectedService] = useState(null);
  const [editService, setEditService] = useState(null);

  const { refetch, data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await axiosSecure.get('/services');
      return res.data;
    }
  });

  const handleDelete = service => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This service will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete'
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/services/${service._id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire('Deleted!', 'Service removed', 'success');
            }
          });
      }
    });
  };

  const handleEditSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const updatedService = {
      name: form.name.value,
      type: form.type.value,
      price: Number(form.price.value),
      description: form.description.value,
      image: form.image.value,
      rating: Number(form.rating.value),
      location: form.location.value,
      featured: form.featured.checked
    };

    axiosSecure.patch(`/services/${editService._id}`, updatedService)
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
          setEditService(null);
          Swal.fire('Updated!', 'Service updated successfully', 'success');
        }
      });
  };

  const handleAddSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const newService = {
      name: form.name.value,
      type: form.type.value,
      price: Number(form.price.value),
      description: form.description.value,
      image: form.image.value,
      rating: Number(form.rating.value),
      location: form.location.value,
      featured: form.featured.checked,
      available: true,
      createdAt: new Date()
    };

    axiosSecure.post('/services', newService)
      .then(res => {
        if (res.data.insertedId) {
          refetch();
          form.reset();
          Swal.fire('Added!', 'Service added successfully', 'success');
        }
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-4">Manage Services & Packages</h2>

      {/* Add Service Form */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h3 className="text-2xl mb-2 font-semibold">Add New Service</h3>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleAddSubmit}>
          <input type="text" name="name" placeholder="Service Name" className="input input-bordered" required />
          <input type="text" name="type" placeholder="Category (Wedding/Home/Office)" className="input input-bordered" required />
          <input type="number" name="price" placeholder="Price (BDT)" className="input input-bordered" required />
          <input type="text" name="location" placeholder="Location" className="input input-bordered" required />
          <input type="text" name="description" placeholder="Description" className="input input-bordered col-span-1 md:col-span-3" required />
          <input type="text" name="image" placeholder="Image URL" className="input input-bordered" />
          <input type="number" name="rating" placeholder="Rating" className="input input-bordered" step="0.1" min="0" max="5" />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="featured" className="checkbox" />
            Featured
          </label>
          <button type="submit" className="btn btn-primary col-span-1 md:col-span-3">Add Service</button>
        </form>
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Location</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service, index) => (
              <tr key={service._id}>
                <td>{index + 1}</td>
                <td>{service.name}</td>
                <td>{service.type}</td>
                <td>{service.price}</td>
                <td>{service.rating}</td>
                <td>{service.location}</td>
                <td>{service.featured ? 'Yes' : 'No'}</td>
                <td className="flex gap-2">
                  <button onClick={() => setSelectedService(service)} className="btn btn-sm"><FaEye /></button>
                  <button onClick={() => setEditService(service)} className="btn btn-sm btn-warning"><FaEdit /></button>
                  <button onClick={() => handleDelete(service)} className="btn btn-sm btn-error"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selectedService && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-2xl mb-4">Service Details</h3>
            <p><strong>Name:</strong> {selectedService.name}</p>
            <p><strong>Category:</strong> {selectedService.type}</p>
            <p><strong>Price:</strong> {selectedService.price}</p>
            <p><strong>Location:</strong> {selectedService.location}</p>
            <p><strong>Description:</strong> {selectedService.description}</p>
            <p><strong>Rating:</strong> {selectedService.rating}</p>
            <p><strong>Featured:</strong> {selectedService.featured ? 'Yes' : 'No'}</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedService(null)}>Close</button>
            </div>
          </div>
        </dialog>
      )}

      {/* Edit Modal */}
      {editService && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-2xl mb-4">Edit Service</h3>
            <form className="space-y-2" onSubmit={handleEditSubmit}>
              <input type="text" name="name" defaultValue={editService.name} className="input input-bordered w-full" required />
              <input type="text" name="type" defaultValue={editService.type} className="input input-bordered w-full" required />
              <input type="number" name="price" defaultValue={editService.price} className="input input-bordered w-full" required />
              <input type="text" name="location" defaultValue={editService.location} className="input input-bordered w-full" required />
              <input type="text" name="description" defaultValue={editService.description} className="input input-bordered w-full" required />
              <input type="text" name="image" defaultValue={editService.image} className="input input-bordered w-full" />
              <input type="number" name="rating" defaultValue={editService.rating} className="input input-bordered w-full" step="0.1" min="0" max="5" />
              <label className="flex items-center gap-2">
                <input type="checkbox" name="featured" defaultChecked={editService.featured} className="checkbox" />
                Featured
              </label>
              <div className="modal-action">
                <button type="submit" className="btn btn-success">Update</button>
                <button type="button" className="btn" onClick={() => setEditService(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageServices;
