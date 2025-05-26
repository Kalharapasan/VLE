import React from 'react';
import './header.css';

const Header = ({ darkMode }) => (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark-mode' : 'navbar-light bg-light-mode'}`}>
      <div className="container-fluid">
        <a className="navbar-brand fw-bold fs-4" href="#">🎓 Student Learning System</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
                aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll gap-3" style={{ '--bs-scroll-height': '100px' }}>
            <li className="nav-item">
              <a className="nav-link nav-link-custom active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="#">Contact</a>
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
          <form className="d-flex ms-3" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-primary" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
);

export default Header;
