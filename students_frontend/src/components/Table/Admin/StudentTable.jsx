// src/components/Table/StudentTable.js
import { useState, useEffect } from 'react';
import {
  Table, Button, InputGroup, FormControl, Row, Col, Card
} from 'react-bootstrap';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../../Service/Admin/StudentService';
import StudentForm from "../../Frome/Admin/StudentsFrome";



export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students', err);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createStudent(data);
      fetchStudents();
    } catch (err) {
      console.error('Error creating student', err.response?.data || err.message);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateStudent(selectedStudent.student_id, data);
      fetchStudents();
    } catch (err) {
      console.error('Error updating student', err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        fetchStudents();
      } catch (err) {
        console.error('Error deleting student', err);
      }
    }
  };

  const filtered = students.filter((s) =>
    Object.values(s).join(' ').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Student List</h4>
        <InputGroup style={{ maxWidth: '300px' }}>
          <FormControl
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <Button onClick={() => { setSelectedStudent(null); setShowForm(true); }}>
          ➕ Add Student
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>NIC</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s, idx) => (
            <tr key={s.student_id}>
              <td>{idx + 1}</td>
              <td>{s.student_fname} {s.student_lname}</td>
              <td>{s.student_email}</td>
              <td>{s.student_nic}</td>
              <td>{s.student_gender}</td>
              <td>
                <Button size="sm" variant="warning" onClick={() => { setSelectedStudent(s); setShowForm(true); }} className="me-2">
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(s.student_id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Student Cards */}
      <h5 className="mt-4">Student </h5>
      <Row>
        {filtered.map((s) => (
          <Col md={4} key={s.student_id} className="mb-3">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{s.student_fname} {s.student_lname}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{s.student_email}</Card.Subtitle>
                <Card.Text>
                  NIC: {s.student_nic}<br />
                  Gender: {s.student_gender}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <StudentForm
        show={showForm}
        handleClose={() => { setShowForm(false); setSelectedStudent(null); }}
        initialData={selectedStudent}
        onSubmit={selectedStudent ? handleUpdate : handleCreate}
      />
    </div>
  );
}
