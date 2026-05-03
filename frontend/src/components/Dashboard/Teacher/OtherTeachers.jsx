import React, { useEffect, useState } from 'react';
import { getTeachers } from '../../Service/Teacher/teacherService';
import { Card, Col, Row, Form, Badge, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function OtherTeachers({ currentTeacherId }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await getTeachers();
      setTeachers(res.data || []);
    } catch (err) {
      console.error('Error fetching teachers:', err);
    } finally {
      setLoading(false);
    }
  };

  const faculties = [...new Set(teachers.map(t => t.faculty_name).filter(Boolean))];
  const departments = [...new Set(teachers.map(t => t.department_name).filter(Boolean))];

  const filteredTeachers = teachers.filter((teacher) => {
    if (teacher.teacher_id === currentTeacherId) return false;
    const name = `${teacher.teacher_fname} ${teacher.teacher_lname}`.toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase()) ||
      (teacher.teacher_email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFaculty = !selectedFaculty || teacher.faculty_name === selectedFaculty;
    const matchesDepartment = !selectedDepartment || teacher.department_name === selectedDepartment;
    return matchesSearch && matchesFaculty && matchesDepartment;
  });

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Other Teachers</h3>
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Search teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '250px' }}
          />
          <Form.Select
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="">All Faculties</option>
            {faculties.map((f) => <option key={f} value={f}>{f}</option>)}
          </Form.Select>
          <Form.Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="">All Departments</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </Form.Select>
        </div>
      </div>

      {filteredTeachers.length === 0 ? (
        <p className="text-muted text-center p-4">No other teachers found.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredTeachers.map((teacher) => (
            <Col key={teacher.teacher_id}>
              <Card className="h-100 shadow-sm border-0 dashboard-card">
                <Card.Body className="text-center">
                  {teacher.teacher_img ? (
                    <Card.Img
                      variant="top"
                      src={`http://127.0.0.1:8000/storage/${teacher.teacher_img}`}
                      alt="Profile"
                      className="rounded-circle mx-auto mt-3"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      className="bg-secondary rounded-circle mx-auto mt-3 d-flex align-items-center justify-content-center"
                      style={{ width: '100px', height: '100px', color: '#fff', fontSize: '1.5rem' }}
                    >
                      {teacher.teacher_fname?.[0]}{teacher.teacher_lname?.[0]}
                    </div>
                  )}
                  <Card.Title className="mt-3">
                    {teacher.teacher_fname} {teacher.teacher_lname}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {teacher.teacher_Index}
                  </Card.Subtitle>
                  <div className="mb-2">
                    <Badge bg="info" className="me-1">{teacher.faculty_name}</Badge>
                    <Badge bg="secondary">{teacher.department_name}</Badge>
                  </div>
                  <Card.Text className="text-muted small">
                    {teacher.teacher_email}
                  </Card.Text>
                  {teacher.description && (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>{teacher.description}</Tooltip>}
                    >
                      <Card.Text className="text-truncate small text-muted">
                        {teacher.description}
                      </Card.Text>
                    </OverlayTrigger>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
