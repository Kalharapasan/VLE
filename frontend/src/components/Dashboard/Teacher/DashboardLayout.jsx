import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TeacherProfile from '../../Pages/Teacher/TeacherProfile';
import TeacherCourses from './TeacherCourses';
import TeacherSubjects from './TeacherSubjects';
import StudentAttendance from './StudentAttendance';
import StudentMarks from './StudentMarks';
import TeacherTimetable from './TeacherTimetable';
import TeacherDashboardCharts from './TeacherDashboardCharts';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const [view, setView] = useState('teacher-profile');
  const [selectedTeacherId] = useState(1); // default teacher ID - should come from logged in user

  return (
    <div className="dashboard-layout">
      <Sidebar view={view} setView={setView} />

      <div className="main-content">
        <div className="header">
          <h2>
            {{
              'teacher-profile': 'Teacher Profile',
              'teacher-courses': 'My Courses',
              'teacher-subjects': 'My Subjects',
              'student-attendance': 'Student Attendance',
              'student-marks': 'Student Marks',
              'teacher-timetable': 'My Timetable',
            }[view]}
          </h2>
        </div>

        {view === 'teacher-profile' && (
          <>
            <TeacherProfile teacherId={selectedTeacherId} />
            <TeacherDashboardCharts />
          </>
        )}
        {view === 'teacher-courses' && <TeacherCourses />}
        {view === 'teacher-subjects' && <TeacherSubjects />}
        {view === 'student-attendance' && <StudentAttendance />}
        {view === 'student-marks' && <StudentMarks />}
        {view === 'teacher-timetable' && <TeacherTimetable />}
      </div>
    </div>
  );
}
