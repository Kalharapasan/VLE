import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardSummary from './DashboardSummary';
import AdminTable from '../../Table/Admin/AdminTable';
import FacultyTable from '../../Table/Admin/FacultyTable';
import DepartmentTable from '../../Table/Admin/DepartmentTable';
import CourseTable from '../../Table/Admin/CourseTable';
import TeacherTable from '../../Table/Admin/TeacherTable';
import SubjectTable from '../../Table/Admin/SubjectTable';
import StudentTable from '../../Table/Admin/StudentTable';
import ExamTable from '../../Table/Admin/ExamTable';
import TimeTable from '../../Table/Admin/TimeTable';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const [view, setView] = useState('dashboard');

  return (
    <div className="dashboard-layout">
      <Sidebar view={view} setView={setView} />

      <div className="main-content">
        <div className="header">
          <h2>
            {{
              dashboard: 'System Dashboard',
              admin: 'Admin Management',
              faculty: 'Faculty Management',
              department: 'Department Management',
              course: 'Course Management',
              teacher: 'Teacher Management',
              subject: 'Subject Management',
              student: 'Student Management',
              exam: 'Exam Management',
              timetable: 'Timetable Management'
            }[view]}
          </h2>
        </div>

        {view === 'dashboard' && <DashboardSummary setView={setView} />}
        {view === 'admin' && <AdminTable />}
        {view === 'faculty' && <FacultyTable />}
        {view === 'department' && <DepartmentTable />}
        {view === 'course' && <CourseTable />}
        {view === 'teacher' && <TeacherTable />}
        {view === 'subject' && <SubjectTable />}
        {view === 'student' && <StudentTable />}
        {view === 'exam' && <ExamTable />}
        {view === 'timetable' && <TimeTable />}
      </div>
    </div>
  );
}
