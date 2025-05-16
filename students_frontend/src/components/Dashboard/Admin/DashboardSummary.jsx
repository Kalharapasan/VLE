// src/components/Dashboard/DashboardSummary.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DashboardLayout.css';

export default function DashboardSummary() {
  const [summary, setSummary] = useState({
    admins: 0,
    students: 0,
    courses: 0,
    departments: 0,
    exams: 0,
    faculties: 0,
    teachers: 0,
    timetables: 0,
    subjects: 0
  });

  const fetchSummary = async () => {
    try {
      const [
        adminsRes,
        studentsRes,
        coursesRes,
        departmentsRes,
        examsRes,
        facultiesRes,
        teachersRes,
        timetablesRes,
        subjectsRes
      ] = await Promise.all([
        axios.get('/api/admins'),
        axios.get('/api/students'),
        axios.get('/api/courses'),
        axios.get('/api/departments'),
        axios.get('/api/exams'),
        axios.get('/api/faculties'),
        axios.get('/api/teachers'),
        axios.get('/api/timetables'),
        axios.get('/api/subjects'),
      ]);

      setSummary({
        admins: adminsRes.data.length,
        students: studentsRes.data.length,
        courses: coursesRes.data.length,
        departments: departmentsRes.data.length,
        exams: examsRes.data.length,
        faculties: facultiesRes.data.length,
        teachers: teachersRes.data.length,
        timetables: timetablesRes.data.length,
        subjects: subjectsRes.data.length
      });
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="summary-cards">
      <div className="summary-card admin-card">
        <h5>👥 Admins</h5>
        <h2>{summary.admins}</h2>
        <p>Manage system administrators</p>
      </div>
      <div className="summary-card student-card">
        <h5>🎓 Students</h5>
        <h2>{summary.students}</h2>
        <p>Student profiles & management</p>
      </div>
      <div className="summary-card courses-card">
        <h5>📚 Courses</h5>
        <h2>{summary.courses}</h2>
        <p>Track & manage all courses</p>
      </div>
      <div className="summary-card department-card">
        <h5>🏢 Departments</h5>
        <h2>{summary.departments}</h2>
        <p>Manage all departments</p>
      </div>
      <div className="summary-card exam-card">
        <h5>📝 Exams</h5>
        <h2>{summary.exams}</h2>
        <p>Manage exams and schedules</p>
      </div>
      <div className="summary-card teacher-card">
        <h5>👨‍🏫 Teachers</h5>
        <h2>{summary.teachers}</h2>
        <p>Manage teacher records</p>
      </div>
      <div className="summary-card timetable-card">
        <h5>⏰ TimeTables</h5>
        <h2>{summary.timetables}</h2>
        <p>View class schedules</p>
      </div>
      <div className="summary-card subject-card">
        <h5>📘 Subjects</h5>
        <h2>{summary.subjects}</h2>
        <p>Manage subjects</p>
      </div>
    </div>
  );
}
