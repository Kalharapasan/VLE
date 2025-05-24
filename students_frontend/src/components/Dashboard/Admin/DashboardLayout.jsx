// src/components/Dashboard/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import DashboardSummary from './DashboardSummary';
import AdminTable from '../../Table/Admin/AdminTable';
import StudentTable from '../../Table/Admin/StudentTable';
import './DashboardLayout.css';
import Department from '../../Table/Admin/DepartmentTable.jsx';
import Exam from '../../Table/Admin/ExamTable.jsx';
import Faculty from '../../Table/Admin/FacultyTable.jsx';
import Teacher from '../../Table/Admin/TeacherTable.jsx';
import TimeTable from '../../Table/Admin/TimeTable';
import Subject from '../../Table/Admin/SubjectTable.jsx';
import Course from '../../Table/Admin/CourseTable'

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
        {view === 'faculty' && <Faculty />}
        {view === 'department' && <Department />}
        {view === 'course' && <Course />}
        {view === 'student' && <StudentTable />}
        {view === 'teacher' && <Teacher />}
        {view === 'exam' && <Exam />}
        {view === 'timetable' && <TimeTable />}
        {view === 'subject' && <Subject />}

      </div>
    </div>
  );
}
