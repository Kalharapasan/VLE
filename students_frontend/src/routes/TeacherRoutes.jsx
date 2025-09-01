import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TeacherDashboard from './Pages/Teacher/TeacherDashboard';
import TeacherProfile from './Pages/Teacher/TeacherProfile';
import TeacherCourse from './Pages/Teacher/TeacherCourse';
import TeacherSubject from './Pages/Teacher/TeacherSubject';
import TeacherStudent from './Pages/Teacher/TeacherStudent';
import TeacherExam from './Pages/Teacher/TeacherExam';
import TeacherTimeTable from './Pages/Teacher/TeacherTimeTable';

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/teacher">
        <Route index element={<Navigate to="/teacher/dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="profile" element={<TeacherProfile />} />
        <Route path="courses" element={<TeacherCourse />} />
        <Route path="subjects" element={<TeacherSubject />} />
        <Route path="students" element={<TeacherStudent />} />
        <Route path="exams" element={<TeacherExam />} />
        <Route path="timetable" element={<TeacherTimeTable />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoutes;
