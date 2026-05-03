import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const Header = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [imgError, setImgError] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchProfile = async () => {
      try {
        if (user.role === 'student') {
          const res = await axios.get(`${API_URL}/student/by-index/${user.index_number}`, { headers });
          setProfile({ ...res.data, _type: 'student' });
        } else if (user.role === 'admin') {
          const res = await axios.get(`${API_URL}/admin`, { headers });
          const found = res.data.find(a => a.admin_Index === user.index_number);
          if (found) setProfile({ ...found, _type: 'admin' });
        } else if (user.role === 'teacher') {
          const res = await axios.get(`${API_URL}/teacher`, { headers });
          const found = res.data.find(t => t.teacher_Index === user.index_number);
          if (found) setProfile({ ...found, _type: 'teacher' });
        }
      } catch (err) {
        // ignore profile fetch errors
      }
    };

    fetchProfile();
  }, [isLoggedIn, user?.index_number]);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/authController/logout`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setProfile(null);
      navigate('/Home');
    } catch (err) {
      alert('Logout failed');
    }
  };

  const getProfileImage = () => {
    if (!profile || imgError) return null;
    const imgField = profile._type === 'student' ? profile.student_img
      : profile._type === 'teacher' ? profile.teacher_img
      : null;
    return imgField ? `http://127.0.0.1:8000/storage/${imgField}` : null;
  };

  const getFullName = () => {
    if (!profile) return user?.role || 'User';
    if (profile._type === 'student') return `${profile.student_fname || ''} ${profile.student_lname || ''}`.trim();
    if (profile._type === 'teacher') return `${profile.teacher_fname || ''} ${profile.teacher_lname || ''}`.trim();
    if (profile._type === 'admin') return `${profile.admin_fname || ''} ${profile.admin_lname || ''}`.trim();
    return user?.role || 'User';
  };

  const getInitials = () => {
    const name = getFullName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getIndexNumber = () => {
    if (!profile) return user?.index_number || '';
    if (profile._type === 'student') return profile.student_Index;
    if (profile._type === 'teacher') return profile.teacher_Index;
    if (profile._type === 'admin') return profile.admin_Index;
    return user?.index_number || '';
  };

  const profileImg = getProfileImage();

  const handleUserClick = () => {
    if (!isLoggedIn || !user) return;
    if (user.role === 'admin') navigate('/admin');
    else if (user.role === 'student') navigate('/student');
    else if (user.role === 'teacher') navigate('/teacher');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-blue">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>🎓 Student Learning System</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/contact">Contact Us</Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-link-custom dropdown-toggle"
                href="#"
                id="academicDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Academic
              </a>
              <ul className="dropdown-menu" aria-labelledby="academicDropdown">
                <li><Link className="dropdown-item" to="/faculty">Faculty</Link></li>
                <li><Link className="dropdown-item" to="/department">Department</Link></li>
                <li><Link className="dropdown-item" to="/teacher">Teacher</Link></li>
                <li><Link className="dropdown-item" to="/courses">Courses</Link></li>
              </ul>
            </li>
          </ul>

          <ul className="navbar-nav align-items-center gap-2">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-sm px-3 me-2" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm px-3" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item d-flex align-items-center">
                  <div className="user-info d-flex align-items-center gap-2" onClick={handleUserClick} role="button" title="Go to dashboard">
                    <div className="user-avatar">
                      {profileImg ? (
                        <img
                          src={profileImg}
                          alt="Profile"
                          className="rounded-circle"
                          onError={() => setImgError(true)}
                        />
                      ) : (
                        <div className="avatar-placeholder rounded-circle">
                          {getInitials()}
                        </div>
                      )}
                    </div>
                    <div className="user-details d-none d-md-flex flex-column">
                      <div className="user-name">{getFullName()}</div>
                      <div className="user-index">{getIndexNumber()}</div>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <span className="nav-link text-light role-badge">
                    <span className="badge bg-light text-dark text-capitalize">{user?.role}</span>
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger btn-sm px-3" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
