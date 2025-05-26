import React, { useEffect, useState } from 'react';
import {
  getAdminCount,
  getStudents,
  getCourses,
  getDepartments,
  getExams,
  getFaculties,
  getTeachers,
  getTimetables,
  getSubjects
} from '../../Service/Admin/DashbordService.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DashboardSummary.css'; // Import the custom CSS

export default function DashboardSummary({ darkMode }) {
  const [summary, setSummary] = useState({
    admins: 0, students: 0, courses: 0, departments: 0,
    exams: 0, faculties: 0, teachers: 0, timetables: 0, subjects: 0
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [
          admins, students, courses, departments,
          exams, faculties, teachers, timetables, subjects
        ] = await Promise.all([
          getAdminCount(),
          getStudents(),
          getCourses(),
          getDepartments(),
          getExams(),
          getFaculties(),
          getTeachers(),
          getTimetables(),
          getSubjects()
        ]);

        setSummary({
          admins: admins.data.admin_count,
          students: students.data.student_count,
          courses: courses.data.course_count,
          departments: departments.data.department_count,
          exams: exams.data.exam_count,
          faculties: faculties.data.faculty_count,
          teachers: teachers.data.teacher_count,
          timetables: timetables.data.timeTable_count,
          subjects: subjects.data.subject_count
        });
      } catch (error) {
        console.error('Error fetching dashboard summary:', error);
      }
    };

    fetchSummary();
  }, []);

  const cards = [
    { title: 'Admins', key: 'admins', text: 'System admins', icon: '👥', border: 'primary', bg: 'bg-white text-dark' },
    { title: 'Faculties', key: 'faculties', text: 'Faculty list', icon: '🏛️', border: 'secondary', bg: 'bg-secondary-subtle text-dark' },
    { title: 'Departments', key: 'departments', text: 'Departments listed', icon: '🏢', border: 'warning', bg: 'bg-warning-subtle text-dark' },
    { title: 'Courses', key: 'courses', text: 'Available courses', icon: '📚', border: 'info', bg: 'bg-info-subtle text-dark' },
    { title: 'Students', key: 'students', text: 'Registered students', icon: '🎓', border: 'success', bg: 'bg-success-subtle text-dark' },
    { title: 'Subjects', key: 'subjects', text: 'Subjects offered', icon: '📘', border: 'dark', bg: 'bg-light text-dark' },
    { title: 'Exams', key: 'exams', text: 'Scheduled exams', icon: '📝', border: 'danger', bg: 'bg-danger-subtle text-dark' },
    { title: 'Teachers', key: 'teachers', text: 'Active teachers', icon: '👩‍🏫', border: 'secondary', bg: 'bg-secondary-subtle text-dark' },
    { title: 'Timetables', key: 'timetables', text: 'Class schedules', icon: '🗓️', border: 'info', bg: 'bg-light text-dark' }
  ];

  return (
      <div className="container-fluid dashboard-summary">
        <div className="row g-3">
          {cards.map((card, index) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                <div
                    className={`card custom-card border-2 border-${card.border} ${darkMode ? 'bg-dark text-light' : card.bg}`}
                >
                  <div className="card-body">
                    <h5 className="card-title"><span className="card-icon">{card.icon}</span> {card.title}</h5>
                    <h3 className="card-count">{summary[card.key]}</h3>
                    <p className="card-text">{card.text}</p>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}
