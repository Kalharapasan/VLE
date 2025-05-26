import React from 'react';
import { Nav } from 'react-bootstrap';

export default function SidebarStudent({ view, setView, darkMode }) {
  const linkClass = (name) =>
    `mb-2 nav-link ${view === name ? 'fw-bold active-link' : ''} ${
      darkMode ? 'text-white' : 'text-dark'
    }`;

  return (
    <div
      className={`p-3 sidebar ${darkMode ? 'bg-secondary' : 'bg-white'} border-end`}
      style={{ minWidth: '220px' }}
    >
      <h5 className="mb-4">Student Menu</h5>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setView('dashboard')} className={linkClass('dashboard')}>
          Dashboard
        </Nav.Link>
        <Nav.Link onClick={() => setView('profile')} className={linkClass('profile')}>
          Profile
        </Nav.Link>
        <Nav.Link onClick={() => setView('courses')} className={linkClass('courses')}>
          My Courses
        </Nav.Link>
        <Nav.Link onClick={() => setView('results')} className={linkClass('results')}>
          Results
        </Nav.Link>
        <Nav.Link onClick={() => setView('timetable')} className={linkClass('timetable')}>
          Exam Timetable
        </Nav.Link>
        <Nav.Link onClick={() => setView('certificates')} className={linkClass('certificates')}>
          Certificates
        </Nav.Link>
        <Nav.Link onClick={() => setView('notifications')} className={linkClass('notifications')}>
          Notifications
        </Nav.Link>
      </Nav>
    </div>
  );
}
