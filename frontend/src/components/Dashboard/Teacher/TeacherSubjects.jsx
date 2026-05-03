import React, { useEffect, useState } from 'react';
import { getTeacherSubjects, createTeacherSubject, deleteTeacherSubject } from '../../Service/Teacher/teacherService';
import { Card, Col, Row, Spinner, Badge, Button, Modal, Form } from 'react-bootstrap';

export default function TeacherSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ subject_id: '', teacher_id: '' });

  useEffect(() => { fetchSubjects(); }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTeacherSubject(formData);
      setShowForm(false);
      setFormData({ subject_id: '', teacher_id: '' });
      fetchSubjects();
    } catch (err) {
      alert('Error enrolling in subject: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this subject enrollment?')) return;
    try {
      await deleteTeacherSubject(id);
      fetchSubjects();
    } catch (err) {
      alert('Error removing enrollment');
    }
  };

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">My Subjects</h3>
        <div>
          <Badge bg="success" className="me-2">{subjects.length} Subjects</Badge>
          <Button variant="primary" onClick={() => setShowForm(true)}>Enroll in Subject</Button>
        </div>
      </div>
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
                    <Button size="sm" variant="danger" onClick={() => handleDelete(subject.id)}>Remove</Button>
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

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enroll in Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Subject ID</Form.Label>
              <Form.Control type="number" name="subject_id" value={formData.subject_id} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teacher ID</Form.Label>
              <Form.Control type="number" name="teacher_id" value={formData.teacher_id} onChange={handleChange} required />
            </Form.Group>
            <div className="text-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button variant="primary" type="submit">Enroll</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
