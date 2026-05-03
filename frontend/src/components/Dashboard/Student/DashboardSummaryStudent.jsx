import React, { useEffect, useState } from 'react';
import {
  getStudentCount,
  getCourseCount,
  getExamCount,
  getTimetableCount,
} from '../../Service/Admin/DashboardService.js';
import {
  FaUserGraduate, FaBook, FaClipboardList, FaClock,
  FaBell, FaCertificate, FaTable
} from 'react-icons/fa';
import './DashboardLayoutStudent.css';

export default function DashboardSummaryStudent() {
  const [summary, setSummary] = useState({
    profile: {},
    courses: 0,
    exams: 0,
    timetables: 0,
    notifications: 0,
    certificates: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [coursesRes, examsRes, timetablesRes] = await Promise.all([
          getCourseCount(),
          getExamCount(),
          getTimetableCount(),
        ]);

        setSummary({
          profile: { student_fname: 'Student' },
          courses: coursesRes.data?.course_count || 0,
          exams: examsRes.data?.exam_count || 0,
          timetables: timetablesRes.data?.timeTable_count || 0,
          notifications: 0,
          certificates: 0,
        });
      } catch (error) {
        console.error('Error fetching student dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  const cards = [
    {
      icon: <FaUserGraduate />,
      title: 'My Profile',
      value: summary.profile?.student_fname || 'Student',
      text: 'View personal details',
      bg: 'profile-card',
    },
    {
      icon: <FaBook />,
      title: 'My Courses',
      value: summary.courses,
      text: 'Enrolled courses',
      bg: 'course-card',
    },
    {
      icon: <FaClipboardList />,
      title: 'Results',
      value: summary.exams,
      text: 'View exam results',
      bg: 'result-card',
    },
    {
      icon: <FaClock />,
      title: 'Exams',
      value: summary.exams,
      text: 'Upcoming exams',
      bg: 'exam-card',
    },
    {
      icon: <FaTable />,
      title: 'Timetable',
      value: summary.timetables,
      text: 'Class schedule',
      bg: 'timetable-card',
    },
    {
      icon: <FaBell />,
      title: 'Notifications',
      value: summary.notifications,
      text: 'Latest updates',
      bg: 'notification-card',
    },
    {
      icon: <FaCertificate />,
      title: 'Certificates',
      value: summary.certificates,
      text: 'Download certificates',
      bg: 'certificate-card',
    },
  ];

  return (
    <div className="container-fluid dashboard-summary">
      <div className="row g-4">
        {cards.map((card, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
            <div className={`card text-center border-0 shadow-sm rounded-4 p-3 ${card.bg} hover-card`} style={{ minHeight: '180px' }}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <div className="display-5 mb-2">{card.icon}</div>
                <h5 className="fw-semibold fs-5">{card.title}</h5>
                <h3 className="fw-bold">{typeof card.value === 'string' ? card.value : card.value}</h3>
                <p className="text-muted small mb-0">{card.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
