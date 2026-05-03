import React, { useEffect, useState } from 'react';
import { getTeacherCourses } from '../../Service/Teacher/teacherService';
import { Card, Col, Row, Spinner, Badge } from 'react-bootstrap';

export default function TeacherCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

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

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;

  return (
    <div className="container-fluid mt-4">
      <h3 className="mb-4">My Courses</h3>
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
                    <span className="text-muted small">#{idx + 1}</span>
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
    </div>
  );
}
