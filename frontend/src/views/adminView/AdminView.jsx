import React from 'react';
import AdminUsersMemories from '../../components/adminUserMemories/AdminUsersMemories';
import './AdminView.scss';

const AdminView = () => {
  return (
    <div className="admin-view-wrapper">
      <AdminUsersMemories />
    </div>
  );
};

export default AdminView;
