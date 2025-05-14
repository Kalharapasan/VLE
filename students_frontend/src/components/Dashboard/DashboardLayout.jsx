import React from 'react';
import { Nav } from 'react-bootstrap';

const DashboardLayout = () => {
  return (
    <div className="d-flex w-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ minWidth: '220px', minHeight: '100%' }}>
        <h5 className="mb-4">Menu</h5>
        <Nav defaultActiveKey="/dashboard" className="flex-column">
          <Nav.Link href="/dashboard" className="text-white">Dashboard</Nav.Link>
          <Nav.Link href="/courses" className="text-white">Courses</Nav.Link>
          <Nav.Link href="/students" className="text-white">Students</Nav.Link>
          <Nav.Link href="/settings" className="text-white">Settings</Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="p-4 flex-grow-1">
        <h2>Dashboard</h2>
        <p>Welcome to the Student Learning System Dashboard!</p>
      </div>
    </div>
  );
};

export default DashboardLayout;
