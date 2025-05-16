// src/components/Dashboard/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import DashboardSummary from './DashboardSummary';
import AdminTable from '../../Table/Admin/AdminTable';
import StudentTable from '../../Table/Admin/StudentTable';
import './DashboardLayout.css';
import Department from '../../Table/Admin/Department';
import Exam from '../../Table/Admin/Exam';
import Faculty from '../../Table/Admin/Faculty';
import Teacher from '../../Table/Admin/Teacher';
import TimeTable from '../../Table/Admin/TimeTable';
import Subject from '../../Table/Admin/Subject';

export default function DashboardLayout() {
  const [view, setView] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className={`dashboard-layout ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Sidebar view={view} setView={setView} darkMode={darkMode} />

      <div className="main-content">
        <div className="header">
          <h2>
            {{
              dashboard: 'System Dashboard',
              admin: 'Admin Management',
              student: 'Student Management',
              course: 'Course Management',
              department: 'Department Management',
              exam: 'Exam Management',
              faculty: 'Faculty Management',
              teacher: 'Teacher Management',
              timetable: 'TimeTable Management',
              subject: 'Subject Management'
            }[view]}
          </h2>
          <Button variant={darkMode ? 'light' : 'dark'} onClick={toggleTheme}>
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </Button>
        </div>

        {view === 'dashboard' && <DashboardSummary />}
        {view === 'admin' && <AdminTable />}
        {view === 'student' && <StudentTable />}
        {view === 'department' && <Department />}
        {view === 'exam' && <Exam />}
        {view === 'faculty' && <Faculty />}
        {view === 'teacher' && <Teacher />}
        {view === 'timetable' && <TimeTable />}
        {view === 'subject' && <Subject />}
        {view === 'course' && <p>Course management coming soon...</p>}
      </div>
    </div>
  );
}
