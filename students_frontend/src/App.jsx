import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Organisms/Header';
import Footer from './components/Organisms/Footer';
import DashboardLayout from './components/Dashboard/Admin/DashboardLayout';
import Home from './components/Pages/HomePage.jsx';
import About from './components/Pages//AboutPage.jsx';
import Contact from './components/Pages/ContactPage.jsx';

function App() {
  return (
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <div className="flex-grow-1 d-flex">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<DashboardLayout />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
