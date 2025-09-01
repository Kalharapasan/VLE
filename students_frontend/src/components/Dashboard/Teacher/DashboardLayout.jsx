import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TeacherProfile from '../../Pages/Teacher/TeacherProfile';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const [selectedTeacherId] = useState(1); // default teacher ID

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <TeacherProfile teacherId={selectedTeacherId} />
      </div>
    </div>
  );
}
