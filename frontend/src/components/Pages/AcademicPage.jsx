import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { getPageContents } from '../Service/pageContentService';

export default function AcademicPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await getPageContents('academic');
      setContent(res.data || []);
    } catch (err) {
      console.error('Error fetching academic content:', err);
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
    <div className="academic-page">
      {/* Hero */}
      <div className="bg-primary text-white py-5 text-center">
        <Container>
          <h1>{getSection('hero_title') || 'Academic Programs'}</h1>
          <p className="lead">{getSection('hero_subtitle') || 'Explore our programs'}</p>
        </Container>
      </div>

      <Container className="py-5">
        {/* Undergraduate */}
        <section className="mb-5">
          <h2>{getSection('ug_title') || 'Undergraduate Programs'}</h2>
          <Row>
            {['program_1', 'program_2', 'program_3'].map((key, idx) => {
              const section = content?.find(c => c.section_key === key);
              if (!section) return null;
              return (
                <Col md={4} key={idx} className="mb-3">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title>{section.title || `Program ${idx + 1}`}</Card.Title>
                      <Card.Text>{section.content}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </section>

        {/* Postgraduate */}
        <section className="mb-5">
          <h2>{getSection('pg_title') || 'Postgraduate Programs'}</h2>
          <Row>
            {['pg_1', 'pg_2'].map((key, idx) => {
              const section = content?.find(c => c.section_key === key);
              if (!section) return null;
              return (
                <Col md={6} key={idx} className="mb-3">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title>{section.title || `Program ${idx + 1}`}</Card.Title>
                      <Card.Text>{section.content}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </section>

        {/* Faculties */}
        <section className="mb-5">
          <h2>{getSection('faculties_title') || 'Our Faculties'}</h2>
          <p>{getSection('faculties_desc') || 'We have multiple faculties...'}</p>
        </section>

        {/* Accordion for departments */}
        <section>
          <h2>{getSection('dept_title') || 'Departments'}</h2>
          <Accordion>
            {['dept_1', 'dept_2', 'dept_3'].map((key, idx) => {
              const section = content?.find(c => c.section_key === key);
              if (!section) return null;
              return (
                <Accordion.Item eventKey={idx} key={idx}>
                  <Accordion.Header>{section.title || `Department ${idx + 1}`}</Accordion.Header>
                  <Accordion.Body>{section.content}</Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </section>
      </Container>
    </div>
  );
}
