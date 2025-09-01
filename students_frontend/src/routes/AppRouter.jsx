import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import StudentDashboard from '../components/student/Dashboard';
import TeacherDashboard from '../components/teacher/Dashboard';
import AdminDashboard from '../components/admin/Dashboard';
import Layout from '../components/layout/Layout';

const AppRouter = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/student/*"
          element={
            <PrivateRoute>
              <Layout userType="student">
                <Routes>
                  <Route path="dashboard" element={<StudentDashboard />} />
                  {/* Add other student routes here */}
                </Routes>
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/teacher/*"
          element={
            <PrivateRoute>
              <Layout userType="teacher">
                <Routes>
                  <Route path="dashboard" element={<TeacherDashboard />} />
                  {/* Add other teacher routes here */}
                </Routes>
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <Layout userType="admin">
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  {/* Add other admin routes here */}
                </Routes>
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Default Route */}
        <Route
          path="/"
          element={
            userType ? (
              <Navigate to={`/${userType}/dashboard`} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
