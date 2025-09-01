// src/components/Dashboard/Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';
import { FaChalkboardTeacher, FaUserGraduate, FaBook, FaBookOpen, FaRegCalendarAlt } from 'react-icons/fa';

export default function Sidebar({ view, setView }) {
  const linkClass = (name) => `sidebar-link nav-link ${view === name ? 'active' : ''}`;

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-title">Dashboard</div>
      
      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('teacher-profile')} className={linkClass('teacher-profile')}>
          <FaChalkboardTeacher /> My Profile
        </Nav.Link>
      </Nav>

      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('teacher-students')} className={linkClass('teacher-students')}>
          <FaUserGraduate /> My Students
        </Nav.Link>
      </Nav>

      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('teacher-course')} className={linkClass('teacher-course')}>
          <FaBook /> My Course
        </Nav.Link>
      </Nav>

      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('teacher-subject')} className={linkClass('teacher-subject')}>
          <FaBookOpen /> My Subject
        </Nav.Link>
      </Nav>

      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('teacher-timetable')} className={linkClass('teacher-timetable')}>
          <FaRegCalendarAlt /> My TimeTable
        </Nav.Link>
      </Nav>
    </div>
  );
}
