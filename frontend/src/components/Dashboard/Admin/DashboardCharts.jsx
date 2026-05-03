import React, { useEffect, useState } from 'react';
import {
  getStudentCount,
  getCourseCount,
  getTeacherCount,
  getDepartmentCount,
  getFacultyCount,
  getExamCount,
  getSubjectCount,
  getTimetableCount,
} from '../../Service/Admin/DashboardService';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import './DashboardSummary.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#6BCB77'];

export default function DashboardCharts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          students, courses, teachers, departments, faculties, exams, subjects, timetables,
        ] = await Promise.all([
          getStudentCount(),
          getCourseCount(),
          getTeacherCount(),
          getDepartmentCount(),
          getFacultyCount(),
          getExamCount(),
          getSubjectCount(),
          getTimetableCount(),
        ]);

        setData({
          students: students.data.student_count,
          courses: courses.data.course_count,
          teachers: teachers.data.teacher_count,
          departments: departments.data.department_count,
          faculties: faculties.data.faculty_count,
          exams: exams.data.exam_count,
          subjects: subjects.data.subject_count,
          timetables: timetables.data.timeTable_count,
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-5">Loading charts...</div>;
  }

  if (!data) {
    return <div className="text-center p-5">No data available</div>;
  }

  const pieData = [
    { name: 'Students', value: data.students },
    { name: 'Teachers', value: data.teachers },
    { name: 'Courses', value: data.courses },
    { name: 'Subjects', value: data.subjects },
    { name: 'Exams', value: data.exams },
  ];

  const barData = [
    { name: 'Students', count: data.students },
    { name: 'Teachers', count: data.teachers },
    { name: 'Courses', count: data.courses },
    { name: 'Departments', count: data.departments },
    { name: 'Faculties', count: data.faculties },
    { name: 'Subjects', count: data.subjects },
    { name: 'Exams', count: data.exams },
    { name: 'Timetables', count: data.timetables },
  ];

  return (
    <div className="container-fluid mt-4">
      <h3 className="mb-4">Analytics Overview</h3>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-3">
            <h5 className="mb-3">Entity Distribution</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-3">
            <h5 className="mb-3">Entity Counts</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
