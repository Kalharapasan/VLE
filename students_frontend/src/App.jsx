import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Organisms/Header';
import Footer from './components/Organisms/Footer';
import DashboardLayout from './components/Dashboard/Admin/DashboardLayout';
import Login from './components/Pages/Login.jsx';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="flex-grow-1 d-flex">
          <Routes>
            {/* <Route path="/" element={<DashboardLayout />} /> */}
            {/* <Route path="/dashboard" element={<DashboardLayout />} /> */}
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}




export default App;
