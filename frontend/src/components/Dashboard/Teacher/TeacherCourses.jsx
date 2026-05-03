import React, { useEffect, useState } from 'react';
import { getTeacherCourses, createTeacherCourse, deleteTeacherCourse } from '../../Service/Teacher/teacherService';
import { Card, Col, Row, Spinner, Badge, Button, Modal, Form } from 'react-bootstrap';

export default function TeacherCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ course_id: '', teacher_id: '' });

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      const res = await getTeacherCourses();
      setCourses(res.data || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
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
      await createTeacherCourse(formData);
      setShowForm(false);
      setFormData({ course_id: '', teacher_id: '' });
      fetchCourses();
    } catch (err) {
      alert('Error enrolling in course: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this course enrollment?')) return;
    try {
      await deleteTeacherCourse(id);
      fetchCourses();
    } catch (err) {
      alert('Error removing enrollment');
    }
  };

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">My Courses</h3>
        <div>
          <Badge bg="info" className="me-2">{courses.length} Courses</Badge>
          <Button variant="primary" onClick={() => setShowForm(true)}>Enroll in Course</Button>
        </div>
      </div>
      {courses.length === 0 ? (
        <p className="text-muted text-center p-4">No courses assigned yet.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {courses.map((course, idx) => (
            <Col key={course.course_id || idx}>
              <Card className="h-100 shadow-sm border-0 dashboard-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <Badge bg="primary" className="badge-pill">{course.course_Index}</Badge>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(course.id)}>Remove</Button>
                  </div>
                  <Card.Title className="h5">{course.course_name}</Card.Title>
                  <Card.Text className="text-muted">
                    {course.description || 'No description available.'}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enroll in Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Course ID</Form.Label>
              <Form.Control type="number" name="course_id" value={formData.course_id} onChange={handleChange} required />
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
