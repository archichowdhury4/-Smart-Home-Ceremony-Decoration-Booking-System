import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/users/${user.email}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user, axiosSecure]);

  if (!user?.email) return <p className="text-center mt-8">Please log in to view your profile.</p>;
  if (loading) return <span className="loading loading-spinner loading-lg flex justify-center mt-8"></span>;
  if (!profile) return <p className="text-center mt-8">Profile not found</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">My Profile</h2>

      {/* Profile Info */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={profile.image || 'https://via.placeholder.com/100'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        <div>
          <h3 className="text-xl font-semibold">{profile.name || user.displayName}</h3>
          <p className="text-gray-500">{profile.email || user.email}</p>
        </div>
      </div>

      {/* Extra Info */}
      <div className="space-y-2 text-gray-700">
        <p><strong>Phone:</strong> {profile.phone || 'N/A'}</p>
        <p><strong>Address:</strong> {profile.address || 'N/A'}</p>
        <p><strong>Member Since:</strong> {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</p>
      </div>

      <button className="mt-6 btn btn-primary text-white w-full">
        Edit Profile
      </button>
    </div>
  );
};

export default MyProfile;
