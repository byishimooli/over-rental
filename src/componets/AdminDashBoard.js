import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './AdminDashboard.css';
import  UserManagement  from './UsersManagement'; // Correct import
import PropertyTable from './PropertyTable';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="users" element={<UserManagement />} /> {/* Corrected component */}
          <Route path="properties" element={<PropertyManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

const Sidebar = () => (
  <div className="sidebar">
    <h2>Admin Panel</h2>
    <ul>
      <li><Link to=".">Overview</Link></li>
      <li><Link to="users">Manage Users</Link></li>
      <li><Link to="properties">Manage Properties</Link></li>
      <li><Link to="reports">Reports</Link></li>
    </ul>
  </div>
);

const Header = () => {
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <header className="header">
      <h1>Welcome, Admin</h1>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

const Overview = () => (
  <div className="dashboard-section">
    <h2>Dashboard Overview</h2>
    <p>Quick stats and insights about the platform.</p>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Users</h3>
        <p>1200 Active Users</p>
      </div>
      <div className="stat-card">
        <h3>Properties</h3>
        <p>450 Active Listings</p>
      </div>
      <div className="stat-card">
        <h3>Reports</h3>
        <p>25 Issues Reported</p>
      </div>
    </div>
  </div>
);

const PropertyManagement = () => (
  <div className="dashboard-section">
    <h2>Manage Properties</h2>
    <p>View, approve, or delete property listings.</p>
    <PropertyTable /> {/* Add the actual Property Management component */}
  </div>
);

const Reports = () => (
  <div className="dashboard-section">
    <h2>Reports</h2>
    <p>View and manage reported issues.</p>
    {/* Table or Report Management Component */}
  </div>
);

export default AdminDashboard;