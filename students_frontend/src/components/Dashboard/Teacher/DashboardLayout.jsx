import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TeacherProfile from '../../Pages/Teacher/TeacherProfile';
import Mysubject from '../../Pages/Teacher/TeacherCourse';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const [selectedTeacherId] = useState(1); // default teacher ID
  const [view, setView] = useState('dashboard');

  return (
    <div className="dashboard-layout">
      <Sidebar view={view} setView={setView} />
      <div className="sidebar-content">
        {view === 'profile' && <TeacherProfile teacherId={selectedTeacherId} />}
        {view === 'courses' && <Mysubject teacherId={selectedTeacherId} />}
      </div>
    </div>
  );
}
