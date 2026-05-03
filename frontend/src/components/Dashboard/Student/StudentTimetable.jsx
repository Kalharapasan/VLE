import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getTimeTable } from '../../Service/Student/studentService';

export default function StudentTimetable() {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const res = await getTimeTable();
      setTimetable(res.data || []);
    } catch (err) {
      console.error('Error fetching timetable:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading timetable...</div>;

  return (
    <div className="container mt-4">
      <h3>Exam Timetable</h3>
      {timetable.length === 0 ? (
        <p className="text-muted">No timetable entries found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((item, idx) => (
              <tr key={item.timetable_id || idx}>
                <td>{idx + 1}</td>
                <td>{item.day}</td>
                <td>{item.time}</td>
                <td>{item.subject_name}</td>
                <td>{item.room}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
