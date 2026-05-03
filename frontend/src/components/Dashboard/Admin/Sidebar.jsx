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
  FaTable
} from 'react-icons/fa';

export default function Sidebar({ view, setView }) {
  const linkClass = (name) => `sidebar-link nav-link ${view === name ? 'active' : ''}`;

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-title">Admin Dashboard</div>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('dashboard')} className={linkClass('dashboard')}>
          <FaTachometerAlt /> Dashboard
        </Nav.Link>
        <Nav.Link onClick={() => setView('admin')} className={linkClass('admin')}>
          <FaUserShield /> Admins
        </Nav.Link>
        <Nav.Link onClick={() => setView('faculty')} className={linkClass('faculty')}>
          <FaUniversity /> Faculties
        </Nav.Link>
        <Nav.Link onClick={() => setView('department')} className={linkClass('department')}>
          <FaBuilding /> Departments
        </Nav.Link>
        <Nav.Link onClick={() => setView('course')} className={linkClass('course')}>
          <FaBook /> Courses
        </Nav.Link>
        <Nav.Link onClick={() => setView('teacher')} className={linkClass('teacher')}>
          <FaChalkboardTeacher /> Teachers
        </Nav.Link>
        <Nav.Link onClick={() => setView('subject')} className={linkClass('subject')}>
          <FaClipboardList /> Subjects
        </Nav.Link>
        <Nav.Link onClick={() => setView('student')} className={linkClass('student')}>
          <FaUserGraduate /> Students
        </Nav.Link>
        <Nav.Link onClick={() => setView('exam')} className={linkClass('exam')}>
          <FaClock /> Exams
        </Nav.Link>
        <Nav.Link onClick={() => setView('timetable')} className={linkClass('timetable')}>
          <FaTable /> TimeTable
        </Nav.Link>
      </Nav>
    </div>
  );
}
