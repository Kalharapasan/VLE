// src/components/Dashboard/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TeacherProfile from '../../Teacher/TeacherProfile.jsx';
import { Button } from 'react-bootstrap';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const [view, setView] = useState('profile'); // Show profile by default
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
      <div className={`dashboard-layout ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <Sidebar view={view} setView={setView} darkMode={darkMode} />

        <div className="main-content p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              {{
                profile: 'Teacher Profile',
                dashboard: 'Dashboard'
              }[view] || 'Dashboard'}
            </h2>

            <Button variant={darkMode ? 'light' : 'dark'} onClick={toggleTheme}>
              {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
            </Button>
          </div>

          {view === 'profile' && <TeacherProfile />}
          {view === 'dashboard' && <p>Welcome to your dashboard.</p>}
        </div>
      </div>
  );
}
