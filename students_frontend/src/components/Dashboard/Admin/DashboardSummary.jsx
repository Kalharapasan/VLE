// src/components/Dashboard/DashboardSummary.jsx
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
import './DashboardSummary.css';

export default function DashboardSummary() {
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
    { title: 'Admins', key: 'admins', text: 'System admins', icon: '👥', bg: 'bg-white text-dark' },
    { title: 'Faculties', key: 'faculties', text: 'Faculty list', icon: '🏛️', bg: 'bg-light text-dark' },
    { title: 'Departments', key: 'departments', text: 'Departments listed', icon: '🏢', bg: 'bg-warning-subtle text-dark' },
    { title: 'Courses', key: 'courses', text: 'Available courses', icon: '📚', bg: 'bg-info-subtle text-dark' },
    { title: 'Students', key: 'students', text: 'Registered students', icon: '🎓', bg: 'bg-success-subtle text-dark' },
    { title: 'Subjects', key: 'subjects', text: 'Subjects offered', icon: '📘', bg: 'bg-light text-dark' },
    { title: 'Exams', key: 'exams', text: 'Scheduled exams', icon: '📝', bg: 'bg-danger-subtle text-dark' },
    { title: 'Teachers', key: 'teachers', text: 'Active teachers', icon: '👩‍🏫', bg: 'bg-secondary-subtle text-dark' },
    { title: 'Timetables', key: 'timetables', text: 'Class schedules', icon: '🗓️', bg: 'bg-light text-dark' }
  ];

  return (
      <div className="container-fluid dashboard-summary">
        <div className="row g-4">
          {cards.map((card, index) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                <div
                    className={`card text-center border-0 shadow-sm rounded-4 p-3 ${card.bg} hover-card`}
                    style={{ minHeight: '180px' }}
                >
                  <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <div className="display-5 mb-2">{card.icon}</div>
                    <h5 className="fw-semibold fs-5">{card.title}</h5>
                    <h3 className="fw-bold">{summary[card.key]}</h3>
                    <p className="text-muted small mb-0">{card.text}</p>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}
