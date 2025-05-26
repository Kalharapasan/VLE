import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layouts/MainLayout';
import LoginLayout from './components/Layouts/LoginLayout';

import Home from './components/Pages/HomePage';
import About from './components/Pages/AboutPage';
import Contact from './components/Pages/ContactPage';
import AdminDashboard from './components/Dashboard/Admin/DashboardLayout.jsx';
import StudentDashboard from './components/Dashboard/Student/DashboardLayoutStudent.jsx';
import TeacherDashboard from './components/Dashboard/Teacher/DashboardLayout.jsx';
import NotFound from './components/Pages/HomePage.jsx';

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
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/student" element={<StudentDashboard />} />
                    <Route path="/teacher" element={<TeacherDashboard />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
