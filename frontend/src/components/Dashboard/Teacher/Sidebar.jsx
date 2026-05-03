// src/components/Dashboard/Teacher/Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';
import { FaTachometerAlt, FaChalkboardTeacher, FaBook, FaClipboardList, FaCalendarAlt, FaUserGraduate, FaUsers } from 'react-icons/fa';

export default function Sidebar({ view, setView }) {
  const linkClass = (name) => `sidebar-link nav-link ${view === name ? 'active' : ''}`;

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-title">Teacher Dashboard</div>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('dashboard')} className={linkClass('dashboard')}>
          <FaTachometerAlt /> Dashboard
        </Nav.Link>
      </Nav>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('teacher-profile')} className={linkClass('teacher-profile')}>
          <FaChalkboardTeacher /> My Profile
        </Nav.Link>
      </Nav>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('teacher-courses')} className={linkClass('teacher-courses')}>
          <FaBook /> My Courses
        </Nav.Link>
      </Nav>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('teacher-subjects')} className={linkClass('teacher-subjects')}>
          <FaClipboardList /> My Subjects
        </Nav.Link>
      </Nav>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('student-attendance')} className={linkClass('student-attendance')}>
          <FaUserGraduate /> Student Attendance
        </Nav.Link>
      </Nav>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('student-marks')} className={linkClass('student-marks')}>
          <FaClipboardList /> Student Marks
        </Nav.Link>
      </Nav>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('teacher-timetable')} className={linkClass('teacher-timetable')}>
          <FaCalendarAlt /> Timetable
        </Nav.Link>
      </Nav>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('other-teachers')} className={linkClass('other-teachers')}>
          <FaUsers /> Other Teachers
        </Nav.Link>
      </Nav>
    </div>
  );
}
