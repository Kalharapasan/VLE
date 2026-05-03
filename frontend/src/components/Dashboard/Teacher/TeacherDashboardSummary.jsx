import React, { useEffect, useState } from 'react';
import {
  getTeacherCourses,
  getTeacherSubjects,
  getStudentAttendance,
  getStudentMarks,
  getTimeTable,
} from '../../Service/Teacher/teacherService';
import {
  FaBook, FaClipboardList, FaUserGraduate, FaChartBar, FaCalendarAlt, FaTachometerAlt
} from 'react-icons/fa';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import './DashboardLayout.css';

export default function TeacherDashboardSummary() {
  const [summary, setSummary] = useState({
    courses: 0,
    subjects: 0,
    attendance: 0,
    marks: 0,
    timetable: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [coursesRes, subjectsRes, attendanceRes, marksRes, timetableRes] = await Promise.all([
          getTeacherCourses(),
          getTeacherSubjects(),
          getStudentAttendance(),
          getStudentMarks(),
          getTimeTable(),
        ]);

        setSummary({
          courses: coursesRes.data?.length || 0,
          subjects: subjectsRes.data?.length || 0,
          attendance: attendanceRes.data?.length || 0,
          marks: marksRes.data?.length || 0,
          timetable: timetableRes.data?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching teacher dashboard summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <div className="text-center p-5"><Spinner animation="border" /></div>;
  }

  const cards = [
    { icon: <FaTachometerAlt />, title: 'Dashboard', value: '', text: 'Welcome to your dashboard', bg: 'primary' },
    { icon: <FaBook />, title: 'My Courses', value: summary.courses, text: 'Courses you teach', bg: 'success' },
    { icon: <FaClipboardList />, title: 'My Subjects', value: summary.subjects, text: 'Subjects assigned', bg: 'info' },
    { icon: <FaUserGraduate />, title: 'Attendance', value: summary.attendance, text: 'Student attendance records', bg: 'warning' },
    { icon: <FaChartBar />, title: 'Marks', value: summary.marks, text: 'Student marks recorded', bg: 'danger' },
    { icon: <FaCalendarAlt />, title: 'Timetable', value: summary.timetable, text: 'Your class schedule', bg: 'secondary' },
  ];

  return (
    <div className="container-fluid dashboard-summary">
      <Row className="g-4">
        {cards.map((card, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className={`dashboard-card border-0 shadow-sm h-100 bg-${card.bg} text-white`} style={{ minHeight: '160px' }}>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center">
                <div className="display-6 mb-2">{card.icon}</div>
                <h5 className="fw-semibold">{card.title}</h5>
                {card.value !== '' && <h3 className="fw-bold">{card.value}</h3>}
                <p className="small mb-0 opacity-75">{card.text}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
