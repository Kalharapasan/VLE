import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getStudentExams, getStudentMarks } from '../../Service/Student/studentService';

export default function StudentResults() {
  const [exams, setExams] = useState([]);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [examsRes, marksRes] = await Promise.all([
        getStudentExams(),
        getStudentMarks(),
      ]);
      setExams(examsRes.data || []);
      setMarks(marksRes.data || []);
    } catch (err) {
      console.error('Error fetching results:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading results...</div>;

  return (
    <div className="container mt-4">
      <h3>My Results</h3>

      <h5 className="mt-4">Exams</h5>
      {exams.length === 0 ? (
        <p className="text-muted">No exams found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Exam Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, idx) => (
              <tr key={exam.exam_id || idx}>
                <td>{idx + 1}</td>
                <td>{exam.exam_name}</td>
                <td>{exam.exam_date}</td>
                <td>{exam.status || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <h5 className="mt-4">Marks</h5>
      {marks.length === 0 ? (
        <p className="text-muted">No marks recorded yet.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark, idx) => (
              <tr key={mark.id || idx}>
                <td>{idx + 1}</td>
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
