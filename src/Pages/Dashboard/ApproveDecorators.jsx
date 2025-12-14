import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ApproveDecorators = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: decorators = [] } = useQuery({
    queryKey: ['decorators', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/decorators');
      return res.data;
    }
  });

  const updateDecoratorStatus = (decorator, status) => {
    const updateInfo = {
      status: status,
      email: decorator.email
    };

    axiosSecure.patch(`/decorators/${decorator._id}`, updateInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Decorator status set to ${status}`,
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
  };

  const handleApproval = decorator => {
    updateDecoratorStatus(decorator, 'approved');
  };

  const handleRejection = decorator => {
    updateDecoratorStatus(decorator, 'rejected');
  };

  const handleDelete = decorator => {
  Swal.fire({
    title: "Are you sure?",
    text: "This decorator will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure.delete(`/decorators/${decorator._id}`)
        .then(res => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire(
              "Deleted!",
              "Decorator has been deleted.",
              "success"
            );
          }
        });
    }
  });
};

  return (
    <div>
      <h2 className="text-5xl mb-6">
        Decorators Pending Approval: {decorators.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Experience</th>
              <th>Category</th>
              <th>Application Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              decorators.map((decorator, index) => (
                <tr key={decorator._id}>
                  <th>{index + 1}</th>
                  <td>{decorator.name}</td>
                  <td>{decorator.email}</td>
                  <td>{decorator.phone}</td>
                  <td>{decorator.experience} yrs</td>
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
                    <button className="btn btn-sm">
                      <FaEye />
                    </button>

                    <button
                      onClick={() => handleApproval(decorator)}
                      className="btn btn-sm btn-success"
                    >
                      <FaUserCheck />
                    </button>

                    <button
                      onClick={() => handleRejection(decorator)}
                      className="btn btn-sm btn-warning"
                    >
                      <IoPersonRemoveSharp />
                    </button>

                <button
                         onClick={() => handleDelete(decorator)}
                        className="btn btn-sm btn-error"
                    >
                     <FaTrashCan />
                    </button>

                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveDecorators;
