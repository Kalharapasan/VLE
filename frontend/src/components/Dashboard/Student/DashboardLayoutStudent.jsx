import React, { useState, useEffect } from 'react';
import SidebarStudent from './SidebarStudent';
import DashboardSummaryStudent from './DashboardSummaryStudent';
import StudentProfile from './StudentProfile';
import StudentCourses from './StudentCourses';
import StudentResults from './StudentResults';
import StudentTimetable from './StudentTimetable';
import StudentGPA from './StudentGPA';
import StudentPayments from './StudentPayments';
import StudentLibrary from './StudentLibrary';
import StudentNotifications from './StudentNotifications';
import StudentCertificates from './StudentCertificates';
import StudentDashboardCharts from './StudentDashboardCharts';
import './DashboardLayoutStudent.css';
import { Button } from 'react-bootstrap';

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
              courses: 'My Courses',
              results: 'Results',
              gpa: 'My GPA',
              payments: 'My Payments',
              library: 'Library',
              timetable: 'Exam Timetable',
              notifications: 'Notifications',
              certificates: 'Certificates'
            }[view]}
          </h2>

          {/* ☀🌙 Dark Mode Toggle Button */}
          <Button variant={darkMode ? 'light' : 'dark'} onClick={toggleTheme}>
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </Button>
        </div>

        {/* Render views */}
        {view === 'dashboard' && (
          <>
            <DashboardSummaryStudent />
            <StudentDashboardCharts />
          </>
        )}
        {view === 'profile' && <StudentProfile />}
        {view === 'courses' && <StudentCourses />}
        {view === 'results' && <StudentResults />}
        {view === 'gpa' && <StudentGPA />}
        {view === 'payments' && <StudentPayments />}
        {view === 'library' && <StudentLibrary />}
        {view === 'timetable' && <StudentTimetable />}
        {view === 'notifications' && <StudentNotifications />}
        {view === 'certificates' && <StudentCertificates />}
      </div>
    </div>
  );
}
