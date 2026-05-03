import React, { useEffect, useState } from 'react';
import { getPageContents } from '../Service/pageContentService';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaCalendarAlt } from 'react-icons/fa';

export default function HomePage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await getPageContents('home');
      setContent(res.data || []);
    } catch (err) {
      console.error('Error fetching home content:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSection = (key) => {
    if (!Array.isArray(content)) return null;
    const section = content.find(c => c.section_key === key);
    return section ? section.content : null;
  };

  if (loading) return <div className="text-center p-5"><div className="spinner-border" /></div>;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section text-white text-center py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Container>
          <h1 className="display-4 fw-bold">{getSection('hero_title') || 'Welcome to VLE'}</h1>
          <p className="lead">{getSection('hero_subtitle') || 'Virtual Learning Environment'}</p>
          <a href="/login" className="btn btn-light btn-lg mt-3">Get Started</a>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Our Features</h2>
        <Row>
          <Col md={3} className="mb-4">
            <Card className="h-100 text-center p-4 shadow-sm">
              <div className="mb-3" style={{ fontSize: '3rem', color: '#667eea' }}>
                <FaUserGraduate />
              </div>
              <Card.Body>
                <h5>Student Management</h5>
                <p className="text-muted">Comprehensive student information system</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100 text-center p-4 shadow-sm">
              <div className="mb-3" style={{ fontSize: '3rem', color: '#667eea' }}>
                <FaChalkboardTeacher />
              </div>
              <Card.Body>
                <h5>Faculty Portal</h5>
                <p className="text-muted">Dedicated tools for faculty members</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100 text-center p-4 shadow-sm">
              <div className="mb-3" style={{ fontSize: '3rem', color: '#667eea' }}>
                <FaBook />
              </div>
              <Card.Body>
                <h5>Course Management</h5>
                <p className="text-muted">Easy course registration and tracking</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100 text-center p-4 shadow-sm">
              <div className="mb-3" style={{ fontSize: '3rem', color: '#667eea' }}>
                <FaCalendarAlt />
              </div>
              <Card.Body>
                <h5>Exam System</h5>
                <p className="text-muted">Online exams and results</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* About Preview */}
      <div className="bg-light py-5">
        <Container>
          <Row>
            <Col md={6}>
              <h3>{getSection('about_title') || 'About Our University'}</h3>
              <p>{getSection('about_description') || 'We are committed to providing quality education...'}</p>
              <a href="/about" className="btn btn-primary">Learn More</a>
            </Col>
            <Col md={6}>
              {getSection('about_image') && (
                <img src={getSection('about_image')} alt="About" className="img-fluid rounded" />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Stats Section */}
      <div className="py-5" style={{ backgroundColor: '#667eea', color: 'white' }}>
        <Container>
          <Row className="text-center">
            <Col md={3}>
              <h2>5000+</h2>
              <p>Students</p>
            </Col>
            <Col md={3}>
              <h2>200+</h2>
              <p>Faculty Members</p>
            </Col>
            <Col md={3}>
              <h2>50+</h2>
              <p>Programs</p>
            </Col>
            <Col md={3}>
              <h2>25+</h2>
              <p>Years of Excellence</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
