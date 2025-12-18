import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ApproveDecorators = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedDecorator, setSelectedDecorator] = useState(null);

  const { refetch, data: decorators = [] } = useQuery({
    queryKey: ['decorators'],
    queryFn: async () => {
      const res = await axiosSecure.get('/decorators');
      return res.data;
    }
  });

  // approve / reject
  const updateDecoratorStatus = (decorator, status) => {
    axiosSecure
      .patch(`/decorators/${decorator._id}`, { status })
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Decorator ${status}`,
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
  };

  // delete
  const handleDelete = decorator => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This decorator will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete'
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/decorators/${decorator._id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire('Deleted!', 'Decorator removed', 'success');
            }
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl mb-6 font-bold">
        Decorators: {decorators.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {decorators.map((decorator, index) => (
              <tr key={decorator._id}>
                <th>{index + 1}</th>
                <td>{decorator.name}</td>
                <td>{decorator.email}</td>
                <td>{decorator.phone}</td>
                <td>{decorator.serviceCategory}</td>
                <td>
                  <span
                    className={`font-semibold ${
                      decorator.status === 'approved'
                        ? 'text-green-600'
                        : decorator.status === 'rejected'
                        ? 'text-red-500'
                        : 'text-orange-500'
                    }`}
                  >
                    {decorator.status}
                  </span>
                </td>

                <td className="flex gap-2">
                  {/* Eye */}
                  <button
                    className="btn btn-sm"
                    onClick={() => setSelectedDecorator(decorator)}
                  >
                    <FaEye />
                  </button>

                  {/* Approve */}
                  <button
                    onClick={() => updateDecoratorStatus(decorator, 'approved')}
                    className="btn btn-sm btn-success"
                  >
                    <FaUserCheck />
                  </button>

                  {/* Reject */}
                  <button
                    onClick={() => updateDecoratorStatus(decorator, 'rejected')}
                    className="btn btn-sm btn-warning"
                  >
                    <IoPersonRemoveSharp />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(decorator)}
                    className="btn btn-sm btn-error"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL*/} 
      {selectedDecorator && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-2xl mb-4 text-center">
              Decorator Full Profile
            </h3>

            <div className="space-y-2">
              <p><strong>Name:</strong> {selectedDecorator.name}</p>
              <p><strong>Email:</strong> {selectedDecorator.email}</p>
              <p><strong>Phone:</strong> {selectedDecorator.phone}</p>
              <p><strong>Experience:</strong> {selectedDecorator.experience} years</p>
              <p><strong>Category:</strong> {selectedDecorator.serviceCategory}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className="font-semibold">
                  {selectedDecorator.status}
                </span>
              </p>
            </div>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setSelectedDecorator(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ApproveDecorators;
