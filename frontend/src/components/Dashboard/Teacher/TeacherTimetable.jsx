import React, { useEffect, useState } from 'react';
import { getTimeTable } from '../../Service/Teacher/teacherService';
import { Table, Spinner, Badge } from 'react-bootstrap';
import { FaClock, FaMapMarkerAlt, FaBook } from 'react-icons/fa';

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function TeacherTimetable() {
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

  const groupedByDay = timetable.reduce((acc, item) => {
    const day = item.day || 'Unknown';
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {});

  const sortedDays = Object.keys(groupedByDay).sort(
    (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
  );

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;

  return (
    <div className="container-fluid mt-4">
      <h3 className="mb-4">My Timetable</h3>
      {timetable.length === 0 ? (
        <p className="text-muted text-center p-4">No timetable entries found.</p>
      ) : (
        sortedDays.map((day) => (
          <div key={day} className="mb-4">
            <h5 className="mb-3">
              <Badge bg="info" className="me-2">{day}</Badge>
              <span className="text-muted small">{groupedByDay[day].length} classes</span>
            </h5>
            <Table className="modern-table" striped hover>
              <thead>
                <tr>
                  <th><FaClock className="me-1" />Time</th>
                  <th><FaBook className="me-1" />Subject</th>
                  <th><FaMapMarkerAlt className="me-1" />Room</th>
                </tr>
              </thead>
              <tbody>
                {groupedByDay[day]
                  .sort((a, b) => (a.time || '').localeCompare(b.time || ''))
                  .map((item, idx) => (
                    <tr key={item.timetable_id || idx}>
                      <td className="fw-bold">{item.time}</td>
                      <td>{item.subject_name}</td>
                      <td>{item.room}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        ))
      )}
    </div>
  );
}
