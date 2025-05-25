import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

const Header = ({ darkMode }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark-mode' : 'navbar-light bg-light-mode'}`}>
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-4" to="/">🎓 University Management System</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
                  aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll gap-3" style={{ '--bs-scroll-height': '100px' }}>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/contact">Contact</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link nav-link-custom dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                   aria-expanded="false">
                  More
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Help</a></li>
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                </ul>
              </li>
            </ul>
            <div className="d-flex ms-3 gap-2">
              <button className="btn btn-outline-primary" onClick={handleLogin}>Login</button>
              <button className="btn btn-primary">Register</button>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Header;
