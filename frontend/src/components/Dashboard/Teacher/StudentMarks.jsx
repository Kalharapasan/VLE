import React, { useEffect, useState } from 'react';
import { Table, Spinner, Badge, ProgressBar } from 'react-bootstrap';
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

  const getGradeBadge = (grade) => {
    const variants = {
      'A+': 'success', 'A': 'success', 'A-': 'success',
      'B+': 'primary', 'B': 'primary', 'B-': 'primary',
      'C+': 'info', 'C': 'info', 'C-': 'info',
      'D+': 'warning', 'D': 'warning', 'D-': 'warning',
      'F': 'danger',
    };
    return variants[grade] || 'secondary';
  };

  const getMarksVariant = (marks) => {
    if (marks >= 75) return 'success';
    if (marks >= 60) return 'primary';
    if (marks >= 45) return 'warning';
    return 'danger';
  };

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Student Marks</h3>
        <Badge bg="info" pill>{marks.length} Records</Badge>
      </div>
      {marks.length === 0 ? (
        <p className="text-muted text-center p-4">No marks recorded yet.</p>
      ) : (
        <Table className="modern-table" striped hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Progress</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark, idx) => (
              <tr key={mark.id || idx}>
                <td>{idx + 1}</td>
                <td className="fw-bold">{mark.student_name || 'N/A'}</td>
                <td>{mark.subject_name || 'N/A'}</td>
                <td className="fw-bold">{mark.marks}</td>
                <td style={{ minWidth: '150px' }}>
                  <ProgressBar
                    now={mark.marks}
                    max={100}
                    variant={getMarksVariant(mark.marks)}
                    label={`${mark.marks}%`}
                  />
                </td>
                <td>
                  <Badge bg={getGradeBadge(mark.grade)} className="badge-pill">
                    {mark.grade || 'N/A'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
