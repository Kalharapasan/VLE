import React, { useEffect, useState } from 'react';
import { getStudentAttendance, getStudentMarks } from '../../Service/Teacher/teacherService';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function TeacherDashboardCharts() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attendanceRes, marksRes] = await Promise.all([
          getStudentAttendance(),
          getStudentMarks(),
        ]);

        // Process attendance data for pie chart
        const attendance = attendanceRes.data || [];
        const presentCount = attendance.filter(a => a.status === 'present').length;
        const absentCount = attendance.filter(a => a.status === 'absent').length;
        const lateCount = attendance.filter(a => a.status === 'late').length;

        setAttendanceData([
          { name: 'Present', value: presentCount },
          { name: 'Absent', value: absentCount },
          { name: 'Late', value: lateCount },
        ]);

        // Process marks data
        const marks = marksRes.data || [];
        const marksChartData = marks.map((mark, idx) => ({
          name: mark.student_name || `Student ${idx + 1}`,
          marks: mark.marks || 0,
          grade: mark.grade || 'N/A',
        }));

        setMarksData(marksChartData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading charts...</div>;
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-3">
            <h5 className="mb-3">Student Attendance</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
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
            <h5 className="mb-3">Student Performance</h5>
            {marksData.length === 0 ? (
              <p className="text-muted">No marks data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marksData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="marks" fill="#8884d8" name="Marks" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
