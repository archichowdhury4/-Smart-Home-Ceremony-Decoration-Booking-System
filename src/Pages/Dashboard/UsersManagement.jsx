import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState('');


  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    }
  });

  const filteredUsers = users.filter(user =>
    user.displayName?.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchText.toLowerCase())
  );


  const handleMakeAdmin = user => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be promoted to Admin',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, make admin'
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user.email}`, { role: 'admin' })
          .then(res => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${user.displayName} is now Admin`,
                showConfirmButton: false,
                timer: 2000
              });
            }
          });
      }
    });
  };


  const handleRemoveAdmin = user => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Admin role will be removed',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove admin'
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user.email}`, { role: 'user' })
          .then(res => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${user.displayName} is now User`,
                showConfirmButton: false,
                timer: 2000
              });
            }
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl mb-4">
        Manage Users: {filteredUsers.length}
      </h2>

      {/* Search */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        <input
          type="search"
          className="grow"
          placeholder="Search by name or email"
          onChange={e => setSearchText(e.target.value)}
        />
      </label>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                          alt="avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>
                <td className="font-semibold">{user.role}</td>

                <td>
                  {user.role === 'admin' ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn btn-sm bg-red-300"
                    >
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm bg-green-400"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
