import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layouts/MainLayout';
import LoginLayout from './components/Layouts/LoginLayout';
import RequireAuth from './components/Auth/RequireAuth';

import Home from './components/Pages/HomePage';
import About from './components/Pages/AboutPage';
import Contact from './components/Pages/ContactPage';
import Academic from './components/Pages/AcademicPage';
import AdminDashboard from './components/Dashboard/Admin/DashboardLayout.jsx';
import StudentDashboard from './components/Dashboard/Student/DashboardLayoutStudent.jsx';
import TeacherDashboard from './components/Dashboard/Teacher/DashboardLayout.jsx';
import NotFound from './components/Pages/HomePage.jsx';
import Unauthorized from './components/Pages/Unauthorized.jsx';

import Login from './components/User/Login';
import Register from './components/User/Register';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<LoginLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/academic" element={<Academic />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route
                        path="/admin"
                        element={
                            <RequireAuth allowedRoles={['admin']}>
                                <AdminDashboard />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/student"
                        element={
                            <RequireAuth allowedRoles={['student']}>
                                <StudentDashboard />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/teacher"
                        element={
                            <RequireAuth allowedRoles={['teacher']}>
                                <TeacherDashboard />
                            </RequireAuth>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
