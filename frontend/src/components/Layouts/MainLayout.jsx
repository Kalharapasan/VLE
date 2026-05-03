import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../Organisms/Header.jsx';
import Footer from '../Organisms/Footer.jsx';
import { Spinner } from 'react-bootstrap';

const MainLayout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleEnd = () => setLoading(false);

    // Listen to route changes
    return () => {
      // cleanup
    };
  }, []);

  return (
    <>
      {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <Header />
      <main className="min-vh-100">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
