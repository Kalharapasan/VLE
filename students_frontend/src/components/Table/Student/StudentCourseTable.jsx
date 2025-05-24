import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import StudentCourseAddForm from './StudentCourseAddForm'; // adjust the path if needed

export default function StudentCourseTable() {
  const [studentCourses, setStudentCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Fetch list of student-course-subjects
  const fetchStudentCourses = async () => {
    try {
      const res = await fetch('/api/student-courses');
      const data = await res.json();
      setStudentCourses(data);
    } catch (err) {
      console.error('Error fetching student-course data:', err);
    }
  };

  useEffect(() => {
    fetchStudentCourses();
  }, []);

  // Create subject-course mapping
  const handleCreate = async (formData) => {
    try {
      await fetch('/api/student-courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      fetchStudentCourses(); // refresh list
    } catch (err) {
      console.error('Error creating mapping:', err);
    }
  };

  // Filter logic
  const filteredList = studentCourses.filter(
    (item) =>
      item.subject_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Student-Course Mappings</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button onClick={() => setShowForm(true)}>Add Subject-Course</Button>
        <Form.Control
          type="text"
          placeholder="Search by course or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '300px' }}
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Course Name</th>
            <th>Subject Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((item, idx) => (
            <tr key={item.id || idx}>
              <td>{idx + 1}</td>
              <td>{item.course_name}</td>
              <td>{item.subject_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <StudentCourseAddForm
        show={showForm}
        handleClose={() => setShowForm(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
