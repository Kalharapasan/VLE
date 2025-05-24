import { useEffect, useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import TeacherForm from '../../Frome/Admin/TeacherFrome';
import TeacherCard from '../../Card/Admin/TeacherCard';
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '../../Service/Admin/TeacherService';

export default function TeacherTable() {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTeachers = async () => {
    try {
      const res = await getTeachers();
      setTeachers(res.data);
    } catch (err) {
      console.error('Error fetching teachers', err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await createTeacher(formData);
      fetchTeachers();
    } catch (err) {
      console.error('Error creating teacher', err.response?.data || err.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      if (selectedTeacher) {
        await updateTeacher(selectedTeacher.teacher_id, formData);
        fetchTeachers();
        setSelectedTeacher(null);
      }
    } catch (err) {
      console.error('Error updating teacher', err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await deleteTeacher(id);
        fetchTeachers();
      } catch (err) {
        console.error('Error deleting teacher', err);
      }
    }
  };

  const filteredTeachers = teachers.filter(
      (teacher) =>
          teacher.teacher_fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.teacher_lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.teacher_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="container mt-4">
        <h2>Teacher List</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button onClick={() => setShowForm(true)}>Add Teacher</Button>
          <Form.Control
              type="text"
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '300px' }}
          />
        </div>

        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Teacher Index</th>
            <th>Name</th>
            <th>Email</th>
            <th>NIC</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {filteredTeachers.map((teacher, idx) => (
              <tr key={teacher.teacher_id}>
                <td>{idx + 1}</td>
                <td>{teacher.teacher_Index}</td>
                <td>{teacher.teacher_fname} {teacher.teacher_lname}</td>
                <td>{teacher.teacher_email}</td>
                <td>{teacher.teacher_nic}</td>
                <td>
                  <Button
                      size="sm"
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setShowForm(true);
                      }}
                      className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(teacher.teacher_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>

        <h4 className="mt-5">Teacher Cards</h4>
        <div className="row">
          {filteredTeachers.map((teacher) => (
              <div className="col-md-4" key={teacher.teacher_id}>
                <TeacherCard
                    teacher={teacher}
                    onEdit={() => {
                      setSelectedTeacher(teacher);
                      setShowForm(true);
                    }}
                    onDelete={() => handleDelete(teacher.teacher_id)}
                />
              </div>
          ))}
        </div>

        <TeacherForm
            show={showForm}
            handleClose={() => {
              setShowForm(false);
              setSelectedTeacher(null);
            }}
            onSubmit={selectedTeacher ? handleUpdate : handleCreate}
            initialData={selectedTeacher}
        />
      </div>
  );
}
