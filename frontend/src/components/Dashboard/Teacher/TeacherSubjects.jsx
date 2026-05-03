import React, { useEffect, useState } from 'react';
import { getTeacherSubjects } from '../../Service/Teacher/teacherService';
import { Card, Col, Row, Spinner, Badge } from 'react-bootstrap';

export default function TeacherSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await getTeacherSubjects();
      setSubjects(res.data || []);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;

  return (
    <div className="container-fluid mt-4">
      <h3 className="mb-4">My Subjects</h3>
      {subjects.length === 0 ? (
        <p className="text-muted text-center p-4">No subjects assigned yet.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {subjects.map((subject, idx) => (
            <Col key={subject.subject_id || idx}>
              <Card className="h-100 shadow-sm border-0 dashboard-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <Badge bg="success" className="badge-pill">{subject.subject_Index}</Badge>
                    <span className="text-muted small">#{idx + 1}</span>
                  </div>
                  <Card.Title className="h5">{subject.subject_name}</Card.Title>
                  <Card.Text className="text-muted">
                    {subject.description || 'No description available.'}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
