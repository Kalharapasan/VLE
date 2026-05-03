import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getTeacherSubjects } from '../../Service/Teacher/teacherService';

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

  if (loading) return <div className="text-center p-4">Loading subjects...</div>;

  return (
    <div className="container mt-4">
      <h3>My Subjects</h3>
      {subjects.length === 0 ? (
        <p className="text-muted">No subjects assigned yet.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Subject Name</th>
              <th>Subject Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, idx) => (
              <tr key={subject.subject_id || idx}>
                <td>{idx + 1}</td>
                <td>{subject.subject_name}</td>
                <td>{subject.subject_Index}</td>
                <td>{subject.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
