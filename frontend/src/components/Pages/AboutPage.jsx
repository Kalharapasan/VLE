import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getPageContents } from '../Service/pageContentService';

export default function AboutPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await getPageContents('about');
      setContent(res.data || []);
    } catch (err) {
      console.error('Error fetching about content:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSection = (key) => {
    if (!Array.isArray(content)) return null;
    const section = content.find(c => c.section_key === key);
    return section ? section.content : null;
  };

  const getImage = (key) => {
    if (!Array.isArray(content)) return null;
    const section = content.find(c => c.section_key === key);
    return section ? section.image_path : null;
  };

  if (loading) return <div className="text-center p-5"><div className="spinner-border" /></div>;

  return (
    <div className="about-page">
      {/* Header */}
      <div className="bg-secondary text-white py-5 text-center">
        <Container>
          <h1>{getSection('header_title') || 'About South Eastern University'}</h1>
        </Container>
      </div>

      <Container className="py-5">
        {/* Vision & Mission */}
        <Row className="mb-5">
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{getSection('vision_title') || 'Our Vision'}</Card.Title>
                <Card.Text>{getSection('vision') || 'Vision statement here...'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{getSection('mission_title') || 'Our Mission'}</Card.Title>
                <Card.Text>{getSection('mission') || 'Mission statement here...'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* History */}
        <section className="mb-5">
          <h2>{getSection('history_title') || 'History'}</h2>
          <p>{getSection('history') || 'University history...'}</p>
        </section>

        {/* Contact Info */}
        <section className="mb-5">
          <h2>{getSection('contact_title') || 'Contact Information'}</h2>
          <p><strong>Address:</strong> {getSection('address') || 'University Park, Oluvil'}</p>
          <p><strong>Phone:</strong> {getSection('phone') || '+94 67 2255062'}</p>
          <p><strong>Email:</strong> {getSection('email') || 'info@seu.ac.lk'}</p>
        </section>

        {/* Image */}
        {getImage('about_image') && (
          <div className="text-center mb-5">
            <img src={getImage('about_image')} alt="University" className="img-fluid rounded" />
          </div>
        )}
      </Container>
    </div>
  );
}
