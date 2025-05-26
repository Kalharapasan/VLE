import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/authController/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/Home');
    } catch (err) {
      alert('Logout failed');
    }
  };

  return (
      <nav className="navbar navbar-expand-lg navbar-blue">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">🎓 Student Learning System</a>

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
            <ul className="navbar-nav ms-auto align-items-center gap-2">
              <li className="nav-item">
                <Link className="nav-link nav-link-custom active" to="/">Home</Link>
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

              {!isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="btn btn-outline-light btn-sm px-3" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="btn btn-light btn-sm px-3" to="/register">Register</Link>
                    </li>
                  </>
              ) : (
                  <>
                    <li className="nav-item">
                      <span className="nav-link text-light">Welcome, {user?.role}</span>
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
