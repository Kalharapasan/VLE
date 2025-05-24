import { useEffect, useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import StudentForm from '../../Frome/Admin/StudentsFrome.jsx';
import StudentCard from '../../Card/Admin/StudentCard.jsx';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../../Service/Admin/StudentService.js';

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await createStudent(formData);
      fetchStudents();
    } catch (err) {
      console.error('Error creating student:', err.response?.data || err.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent.student_id, formData);
        fetchStudents();
        setSelectedStudent(null);
      }
    } catch (err) {
      console.error('Error updating student:', err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        fetchStudents();
      } catch (err) {
        console.error('Error deleting student:', err);
      }
    }
  };

  const filteredStudents = students.filter((student) =>
      `${student.student_fname} ${student.student_lname} ${student.student_email}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
  );

  return (
      <div className="container mt-4">
        <h2>Student List</h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button onClick={() => setShowForm(true)}>Add Student</Button>
          <Form.Control
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '300px' }}
          />
        </div>

        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>NIC</th>
            <th>Birthday</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {filteredStudents.map((student, idx) => (
              <tr key={student.student_id}>
                <td>{idx + 1}</td>
                <td>{student.student_fname} {student.student_lname}</td>
                <td>{student.student_email}</td>
                <td>{student.student_nic}</td>
                <td>{student.student_birthday}</td>
                <td>{student.student_gender}</td>
                <td>
                  <Button
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowForm(true);
                      }}
                  >
                    Edit
                  </Button>
                  <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(student.student_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>

        <h4 className="mt-5">Student Cards</h4>
        <div className="row">
          {filteredStudents.map((student) => (
              <div className="col-md-4" key={student.student_id}>
                <StudentCard
                    student={student}
                    onEdit={() => {
                      setSelectedStudent(student);
                      setShowForm(true);
                    }}
                    onDelete={() => handleDelete(student.student_id)}
                />
              </div>
          ))}
        </div>

        <StudentForm
            show={showForm}
            handleClose={() => {
              setShowForm(false);
              setSelectedStudent(null);
            }}
            onSubmit={selectedStudent ? handleUpdate : handleCreate}
            initialData={selectedStudent}
        />
      </div>
  );
}
