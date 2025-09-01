// src/components/Dashboard/Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';
import {
  FaTachometerAlt,
  FaUserShield,
  FaUniversity,
  FaBuilding,
  FaBook,
  FaChalkboardTeacher,
  FaClipboardList,
  FaUserGraduate,
  FaClock,
  FaTable,
  FaBookOpen,
  FaRegCalendarAlt,
  FaUser
} from 'react-icons/fa';

export default function Sidebar({ view, setView }) {
  const linkClass = (name) => `sidebar-link nav-link ${view === name ? 'active' : ''}`;

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-title">Teacher Dashboard</div>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('dashboard')} className={linkClass('dashboard')}>
          <FaTachometerAlt /> Dashboard
        </Nav.Link>
        <Nav.Link onClick={() => setView('teacher-profile')} className={linkClass('teacher-profile')}>
          <FaUser /> My Profile
        </Nav.Link>
        <Nav.Link onClick={() => setView('teacher-course')} className={linkClass('teacher-course')}>
          <FaBook /> My Courses
        </Nav.Link>
        <Nav.Link onClick={() => setView('teacher-subject')} className={linkClass('teacher-subject')}>
          <FaBookOpen /> My Subjects
        </Nav.Link>
        <Nav.Link onClick={() => setView('teacher-students')} className={linkClass('teacher-students')}>
          <FaUserGraduate /> My Students
        </Nav.Link>
        <Nav.Link onClick={() => setView('teacher-exam')} className={linkClass('teacher-exam')}>
          <FaClock /> Exams
        </Nav.Link>
        <Nav.Link onClick={() => setView('teacher-timetable')} className={linkClass('teacher-timetable')}>
          <FaRegCalendarAlt /> My TimeTable
        </Nav.Link>
      </Nav>
    </div>
  );
}
