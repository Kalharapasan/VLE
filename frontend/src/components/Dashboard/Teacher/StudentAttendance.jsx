import React, { useEffect, useState } from 'react';
import { Table, Spinner, Badge } from 'react-bootstrap';
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

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'danger';
      case 'late': return 'warning';
      default: return 'secondary';
    }
  };

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Student Attendance</h3>
        <Badge bg="info" pill>{attendance.length} Records</Badge>
      </div>
      {attendance.length === 0 ? (
        <p className="text-muted text-center p-4">No attendance records found.</p>
      ) : (
        <Table className="modern-table" striped hover responsive>
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
                <td className="fw-bold">{record.student_name || 'N/A'}</td>
                <td>{record.date}</td>
                <td>
                  <Badge bg={getBadgeVariant(record.status)} className="badge-pill text-capitalize">
                    {record.status}
                  </Badge>
                </td>
                <td className="text-muted">{record.remarks || '-'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
