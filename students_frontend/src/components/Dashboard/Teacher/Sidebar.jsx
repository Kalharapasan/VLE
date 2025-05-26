// src/components/Dashboard/Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';

export default function Sidebar({ view, setView, darkMode }) {
  const linkClass = (name) =>
    `mb-2 nav-link ${view === name ? 'fw-bold active-link' : ''} ${darkMode ? 'text-white' : 'text-dark'}`;

  return (
    <div className={`p-3 sidebar ${darkMode ? 'bg-secondary' : 'bg-white'} border-end`} style={{ minWidth: '220px' }}>
      <h5 className="mb-4">Dashboard</h5>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('dashboard')} className={linkClass('dashboard')}>
          Dashboard
        </Nav.Link>
        <Nav.Link onClick={() => setView('admin')} className={linkClass('admin')}>
          Admins
        </Nav.Link>
        <Nav.Link onClick={() => setView('faculty')} className={linkClass('faculty')}>
          Facultys
        </Nav.Link>
        <Nav.Link onClick={() => setView('department')} className={linkClass('department')}>
          Departments
        </Nav.Link>
        <Nav.Link onClick={() => setView('course')} className={linkClass('course')}>
          Courses
        </Nav.Link>
        <Nav.Link onClick={() => setView('teacher')} className={linkClass('teacher')}>
          Teachers
        </Nav.Link>
        <Nav.Link onClick={() => setView('subject')} className={linkClass('subject')}>
          Subject
        </Nav.Link>
        <Nav.Link onClick={() => setView('student')} className={linkClass('student')}>
          Students
        </Nav.Link>
        <Nav.Link onClick={() => setView('exam')} className={linkClass('exam')}>
          Exams
        </Nav.Link>


        <Nav.Link onClick={() => setView('timetable')} className={linkClass('timetable')}>
          TimeTable
        </Nav.Link>

      </Nav>
    </div>
  );
}
