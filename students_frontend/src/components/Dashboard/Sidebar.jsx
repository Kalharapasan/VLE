import React from 'react';
import { Nav } from 'react-bootstrap';
import App from '../App.jsx';

const Sidebar = () => {
  return (
    <>
      <h5 className="text-white mb-4">Menu</h5>
      <Nav className="flex-column">
        <Nav.Link href="/App" className="text-white">Dashboard</Nav.Link>
        <Nav.Link href="" className="text-white">Courses</Nav.Link>
        <Nav.Link href="" className="text-white">Students</Nav.Link>
        <Nav.Link href="" className="text-white">Settings</Nav.Link>
      </Nav>
    </>
  );
};

export default Sidebar;
