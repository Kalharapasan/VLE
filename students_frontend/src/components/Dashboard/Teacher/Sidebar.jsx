// src/components/Dashboard/Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

export default function Sidebar({ view, setView, darkMode }) {
  const linkClass = (name) =>
    `d-flex align-items-center gap-2 mb-2 nav-link ${view === name ? 'fw-bold active-link bg-primary text-white rounded px-3 py-2' : ''} ${!view === name && darkMode ? 'text-white' : 'text-dark'}`;

  return (
    <div className={`p-3 sidebar min-vh-100 ${darkMode ? 'bg-dark' : 'bg-white'} border-end`} style={{ minWidth: '220px' }}>
      <div className="mb-4">
        <h5 className={`fw-bold ${darkMode ? 'text-white' : 'text-dark'}`}>Teacher</h5>
        <div className={`${darkMode ? 'text-white' : 'text-muted'}`}>Dashboard</div>
      </div>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('dashboard')} className={linkClass('dashboard')}>
          <MdDashboard size={20} />
          My Profile
        </Nav.Link>
      </Nav>
    </div>
  );
}
