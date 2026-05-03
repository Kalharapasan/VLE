import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getPageContents } from '../../Service/pageContentService';
import './footer.css';

const Footer = () => {
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const res = await getPageContents('contact');
      setContactData(res.data || []);
    } catch (err) {
      console.error('Error fetching contact data for footer:', err);
    }
  };

  const getSection = (key) => {
    if (!Array.isArray(contactData)) return null;
    const section = contactData.find(c => c.section_key === key);
    return section ? section.content : null;
  };

  return (
    <footer className="footer bg-dark text-white pt-5 pb-4">
      <Container>
        <Row className="text-md-left">
          {/* University Info */}
          <Col md={4} className="mb-4">
            <img src="/logo.png" alt="University Logo" className="footer-logo mb-3" style={{ width: '60px' }} />
            <h5 className="text-uppercase fw-bold mb-3">South Eastern University</h5>
            <p className="tamil-text">இலங்கை தென்கிழக்கு பல்கலைக்கழகம்</p>
            <p className="mb-2">
              <i className="fas fa-map-marker-alt me-2"></i>
              {getSection('address') || 'University Park, Oluvil, #32360, Sri Lanka.'}
            </p>
            <p className="mb-2">
              <i className="fas fa-phone me-2"></i>
              {getSection('phone') || '+94 67 2255062'}
            </p>
            <p className="mb-3">
              <i className="fas fa-envelope me-2"></i>
              {getSection('email') || 'info@seu.ac.lk'}
            </p>
            <div className="social-links d-flex gap-3">
              <a href="#" className="text-white social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-white social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white social-icon"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="text-white social-icon"><i className="fab fa-youtube"></i></a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={2} className="mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact Us</a></li>
              <li><a href="/faculty" className="text-white text-decoration-none">Faculty</a></li>
              <li><a href="/courses" className="text-white text-decoration-none">Courses</a></li>
              <li><a href="/login" className="text-white text-decoration-none">Login</a></li>
            </ul>
          </Col>

          {/* Faculties */}
          <Col md={3} className="mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Faculties</h6>
            <ul className="list-unstyled footer-links">
              <li>Arts and Culture</li>
              <li>Management and Commerce</li>
              <li>Applied Sciences</li>
              <li>Islamic Studies & Arabic Language</li>
              <li>Engineering</li>
              <li>Technology</li>
            </ul>
          </Col>

          {/* Units & Centers */}
          <Col md={3} className="mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Units & Centers</h6>
            <ul className="list-unstyled footer-links">
              <li>Postgraduate Unit - FMC</li>
              <li>Postgraduate Unit - FAC</li>
              <li>EDPL</li>
              <li>RIC</li>
              <li>SDC</li>
              <li>ICT Centre</li>
              <li>Career Guidance Unit</li>
              <li>OTS / AHEAD</li>
            </ul>
          </Col>
        </Row>

        <hr className="border-secondary" />

        <div className="text-center pt-3 pb-2">
          <p className="mb-0">
            <small>&copy; {new Date().getFullYear()} South Eastern University of Sri Lanka. All rights reserved.</small>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
