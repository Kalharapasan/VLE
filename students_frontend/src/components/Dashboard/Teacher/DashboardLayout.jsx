// src/components/Dashboard/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './DashboardLayout.css';
import TeacherProfile from '../../Teacher/TeacherProfile';
import Sidebar from './Sidebar'; // ✅ Import Sidebar

export default function DashboardLayout() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [view, setView] = useState('dashboard');

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className={`dashboard-layout ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* ✅ Sidebar added */}
      <Sidebar view={view} setView={setView} darkMode={darkMode} />

      {/* ✅ Right side content */}
      <div className="main-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">My Profile</h2>
          <Button variant={darkMode ? 'light' : 'dark'} onClick={toggleTheme}>
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </Button>
        </div>

        {view === 'dashboard' && <TeacherProfile />}
      </div>
    </div>
  );
}
