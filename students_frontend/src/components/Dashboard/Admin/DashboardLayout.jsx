// src/components/Dashboard/DashboardLayout.jsx
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import DashboardSummary from './DashboardSummary';
import AdminTable from '../../Table/Admin/AdminTable';
import './DashboardLayout.css';


export default function DashboardLayout() {
  const [view, setView] = useState('dashboard');

  return (
      <div className="dashboard-layout">
        <Sidebar view={view} setView={setView} />

        <div className="main-content">
          <div className="header">
            <h2>
              {{
                dashboard: 'System Dashboard',
                admin: 'Admin Management',
               
              }[view]}
            </h2>
          </div>

          {view === 'dashboard' && <DashboardSummary />}
          {view === 'admin' && <AdminTable />}
        
        </div>
      </div>
  );
}
