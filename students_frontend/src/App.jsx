import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Organisms/Header';
import Footer from './components/Organisms/Footer';
import DashboardLayoutStudent from './components/Dashboard/Student/DashboardLayoutStudent';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="flex-grow-1 d-flex">
          <Routes>
            <Route path="/" element={<DashboardLayoutStudent />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
