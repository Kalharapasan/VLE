import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Organisms/Header';
import Footer from './components/Organisms/Footer';
import DashboardLayout from './components/Dashboard/DashboardLayout';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="flex-grow-1 d-flex">
          <DashboardLayout />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
