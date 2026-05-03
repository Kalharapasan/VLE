import React, { useEffect, useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { getStudentAttendance } from '../../Service/Teacher/teacherService';

export default function StudentAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await getStudentAttendance();
      setAttendance(res.data || []);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading attendance...</div>;

  return (
    <div className="container mt-4">
      <h3>Student Attendance</h3>
      {attendance.length === 0 ? (
        <p className="text-muted">No attendance records found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record, idx) => (
              <tr key={record.id || idx}>
                <td>{idx + 1}</td>
                <td>{record.student_name || 'N/A'}</td>
                <td>{record.date}</td>
                <td>{record.status}</td>
                <td>{record.remarks || '-'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
