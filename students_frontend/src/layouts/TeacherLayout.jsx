import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Teacher/Sidebar';
import { Container } from 'react-bootstrap';

const TeacherLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main-content">
        <Container fluid>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default TeacherLayout;
