import React from 'react';

const UserViewModal = ({ user, onClose }) => {
  if (!user) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">User Details</h3>
          <button onClick={onClose} className="text-gray-600">Close</button>
        </div>
        <div className="flex gap-4">
          <img src={user.photo || 'https://placehold.co/100x100'} alt="photo" className="w-24 h-24 object-cover rounded" />
          <div>
            <div className="font-medium">{user.fullName}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
            <div className="text-sm text-gray-600">{user.phone}</div>
            <div className="text-sm text-gray-600">Role: {user.role}</div>
            <div className="text-sm text-gray-600">Status: {user.status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserViewModal;
