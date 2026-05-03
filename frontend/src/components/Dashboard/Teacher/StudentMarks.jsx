import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getStudentMarks } from '../../Service/Teacher/teacherService';

export default function StudentMarks() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {
      const res = await getStudentMarks();
      setMarks(res.data || []);
    } catch (err) {
      console.error('Error fetching marks:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading marks...</div>;

  return (
    <div className="container mt-4">
      <h3>Student Marks</h3>
      {marks.length === 0 ? (
        <p className="text-muted">No marks recorded yet.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark, idx) => (
              <tr key={mark.id || idx}>
                <td>{idx + 1}</td>
                <td>{mark.student_name || 'N/A'}</td>
                <td>{mark.subject_name || 'N/A'}</td>
                <td>{mark.marks}</td>
                <td>{mark.grade || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
