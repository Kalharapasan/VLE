import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Card, Alert } from 'react-bootstrap';
import { getPageContents } from '../Service/pageContentService';

export default function ContactPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await getPageContents('contact');
      setContent(res.data || []);
    } catch (err) {
      console.error('Error fetching contact content:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSection = (key) => {
    if (!Array.isArray(content)) return null;
    const section = content.find(c => c.section_key === key);
    return section ? section.content : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to a backend endpoint
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  if (loading) return <div className="text-center p-5"><div className="spinner-border" /></div>;

  return (
    <div className="contact-page">
      {/* Header */}
      <div className="bg-info text-white py-5 text-center">
        <Container>
          <h1>{getSection('header_title') || 'Contact Us'}</h1>
          <p className="lead">{getSection('header_subtitle') || 'Get in touch with us'}</p>
        </Container>
      </div>

      <Container className="py-5">
        <Row>
          {/* Contact Info */}
          <Col md={5} className="mb-4">
            <h3>{getSection('info_title') || 'Contact Information'}</h3>
            <p><strong>Address:</strong><br />{getSection('address') || 'University Park, Oluvil'}</p>
            <p><strong>Phone:</strong><br />{getSection('phone') || '+94 67 2255062'}</p>
            <p><strong>Email:</strong><br />{getSection('email') || 'info@seu.ac.lk'}</p>
            <p><strong>Office Hours:</strong><br />{getSection('hours') || 'Mon-Fri: 8:00 AM - 4:30 PM'}</p>
          </Col>

          {/* Contact Form */}
          <Col md={7}>
            <Card className="shadow-sm">
              <Card.Body>
                <h3>Send us a Message</h3>
                {submitted && <Alert variant="success">Message sent successfully!</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Map placeholder */}
        <div className="mt-5 text-center">
          <div className="bg-light p-5 rounded">
            <p className="text-muted">{getSection('map_placeholder') || 'Map location would appear here'}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
