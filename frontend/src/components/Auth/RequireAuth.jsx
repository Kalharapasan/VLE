import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children, allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({ isAuth: false, user: null });
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token) {
      setAuth({ isAuth: false, user: null });
      setLoading(false);
      return;
    }

    try {
      const user = JSON.parse(userStr || '{}');
      setAuth({ isAuth: true, user });
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setAuth({ isAuth: false, user: null });
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!auth.isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(auth.user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default RequireAuth;
