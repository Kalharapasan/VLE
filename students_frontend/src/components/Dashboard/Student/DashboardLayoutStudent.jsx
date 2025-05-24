import React, { useState, useEffect } from 'react';
import SidebarStudent from './SidebarStudent';
import DashboardSummaryStudent from './DashboardSummaryStudent';
import './DashboardLayoutStudent.css';
import { Button } from 'react-bootstrap';

//import StudentCourseTable from '../../Table/Student/StudentCourseTable.jsx'; //nnnn





export default function DashboardLayoutStudent() {
  const [view, setView] = useState('dashboard');
  

  // 🌙 Dark mode toggle setup
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className={`dashboard-layout ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <SidebarStudent view={view} setView={setView} darkMode={darkMode} />

      <div className="main-content">
        <div className="header">
          <h2>
            {{
              dashboard: 'Student Dashboard',
              profile: 'My Profile',
              results: 'Results',
              timetable: 'Timetable',
              notifications: 'Notifications',
              courses: 'Courses',
              certificates: 'Certificates'
            }[view]}
          </h2>

          {/* ☀🌙 Dark Mode Toggle Button */}
          <Button variant={darkMode ? 'light' : 'dark'} onClick={toggleTheme}>
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </Button>
        </div>

        {/* Render views */}
        {view === 'dashboard' && <DashboardSummaryStudent />}
        {view === 'profile' && <p>My profile info...</p>}
        {view === 'courses' && <StudentCourseTable/>}
        {view === 'results' && <p>Result table here...</p>}
        {view === 'timetable' && <p>Timetable here...</p>}
        {view === 'notifications' && <p>Notifications here...</p>}
        {view === 'certificates' && <p>Certificate downloads...</p>}
      </div>
    </div>
  );
}

