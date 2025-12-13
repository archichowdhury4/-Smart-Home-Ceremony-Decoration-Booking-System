import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name:'', phone:'', address:'', imageFile:null, imageUrl:'' });

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/users/${user.email}`)
      .then(res => {
        const data = res.data;
        setProfile(data);
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          address: data.address || '',
          imageFile: null,
          imageUrl: data.image || user.photoURL || ''
        });
      })
      .catch(err => console.error("User fetch error:", err))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData(prev => ({ ...prev, imageFile: files[0] }));
    else setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      let updatedData = { name: formData.name, phone: formData.phone, address: formData.address };
      if (formData.imageFile) {
        const imgData = new FormData();
        imgData.append('image', formData.imageFile);
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`, imgData);
        updatedData.image = res.data.data.url;
      } else updatedData.image = formData.imageUrl;

      const response = await axiosSecure.patch(`/users/${user.email}`, updatedData);
      if (response.data.modifiedCount) {
        setProfile({ ...profile, ...updatedData });
        setEditMode(false);
      }
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  if (!user?.email) return <p className="text-center mt-8">Please log in to view your profile.</p>;
  if (loading) return <span className="loading loading-spinner loading-lg flex justify-center mt-8"></span>;
  if (!profile) return <p className="text-center mt-8">Profile not found</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">My Profile</h2>

      <div className="flex items-center space-x-4 mb-6">
        <div>
          <img
            src={formData.imageFile ? URL.createObjectURL(formData.imageFile) : (formData.imageUrl || 'https://via.placeholder.com/100')}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-2"
          />
          {editMode && (
            <input type="file" name="image" onChange={handleChange} className="file-input file-input-bordered w-full" />
          )}
        </div>
        <div className="flex-1">
          {editMode ? (
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full mb-2" />
          ) : (
            <h3 className="text-xl font-semibold">{profile.name || user.displayName}</h3>
          )}
          <p className="text-gray-500">{profile.email || user.email}</p>
        </div>
      </div>

      <div className="space-y-2 text-gray-700">
        {editMode ? (
          <>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="input input-bordered w-full" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input input-bordered w-full" />
          </>
        ) : (
          <>
            <p><strong>Phone:</strong> {profile.phone || 'N/A'}</p>
            <p><strong>Address:</strong> {profile.address || 'N/A'}</p>
          </>
        )}
        <p><strong>Member Since:</strong> {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</p>
      </div>

      <button className="mt-6 btn btn-primary text-white w-full" onClick={() => editMode ? handleSave() : setEditMode(true)}>
        {editMode ? 'Save Profile' : 'Edit Profile'}
      </button>
    </div>
  );
};

export default MyProfile;
