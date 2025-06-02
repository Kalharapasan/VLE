import React from 'react';
import './AboutPage.css'; // <-- Import the CSS file

const AboutPage = () => {
  return (
    <div className="about-container">
      {/* Header */}
      <header className="about-header">
        <h1>About South Eastern University of Sri Lanka</h1>
      </header>

      {/* Main Content */}
      <div className="about-content">
        {/* Top Section with image + three columns */}
        <div className="about-top-section">
          <div className="about-image">
            <img src="/images/university-building.jpg" alt="SEUSL"/>
          </div>

          <div className="about-links">
            <h2>About SEUSL</h2>
            <ul>
              <li><a href="#">History</a></li>
              <li><a href="#">Corporate Direction</a></li>
              <li><a href="#">Vision Mission</a></li>
              <li><a href="#">Corporate & Action Plan</a></li>
            </ul>
          </div>

          <div className="about-columns">
            <div>
              <h2>Governance</h2>
              <ul>
                <li><a href="#">Council</a></li>
                <li><a href="#">Senate</a></li>
                <li><a href="#">Code of Conduct</a></li>
              </ul>
            </div>
            <div>
              <h2>People</h2>
              <ul>
                <li><a href="#">Chancellor</a></li>
                <li><a href="#">Vice Chancellor</a></li>
                <li><a href="#">Past Chancellors</a></li>
                <li><a href="#">Past Vice-Chancellors</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="about-row">
          <div className="about-box vision">
            <h2>Our Vision</h2>
            <p>
              To be a centre of excellence in teaching, learning and research with a commitment to serve the society.
            </p>
          </div>
          <div className="about-box mission">
            <h2>Our Mission</h2>
            <p>
              To pursue education, research, and scholarship and enhance community engagement to meet national and global needs.
            </p>
          </div>
        </div>

        {/* Contact & History */}
        <div className="about-box contact">
          <h2>Contact Information</h2>
          <p><strong>Address:</strong> South Eastern University of Sri Lanka, University Park, Oluvil</p>
          <p><strong>Phone:</strong> +94 67 2255062</p>
          <p><strong>Email:</strong> info@seu.ac.lk</p>
        </div>

        <div className="about-box history">
          <h2>History</h2>
          <p>
            The South Eastern University of Sri Lanka (SEUSL) was established in 1995 and has since become a key institution in the Eastern Province.
            It offers numerous undergraduate and postgraduate programs while embracing diversity and academic excellence.
          </p>
        </div>

        {/* Events */}
        <div className="about-box events">
          <h2>Events and Academic Programs</h2>
          <ul>
            <li>Annual Convocation Ceremony</li>
            <li>Research Symposium</li>
            <li>Orientation Week</li>
            <li>Academic Conferences</li>
            <li>Undergraduate & Postgraduate Studies</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;



