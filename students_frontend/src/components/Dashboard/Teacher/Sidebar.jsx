// src/components/Dashboard/Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';
import { FaChalkboardTeacher } from 'react-icons/fa';

export default function Sidebar({ view, setView }) {
  const linkClass = (name) => `sidebar-link nav-link ${view === name ? 'active' : ''}`;

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-title">Teacher Dashboard</div>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('teacher-profile')} className={linkClass('teacher-profile')}>
          <FaChalkboardTeacher /> My Profile
        </Nav.Link>
      </Nav>
    </div>
  );
}
