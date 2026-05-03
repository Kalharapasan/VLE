import React, { useEffect, useState } from 'react';
import { getStudentAttendance, getStudentMarks } from '../../Service/Teacher/teacherService';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { Card, Row, Col, Spinner } from 'react-bootstrap';

const COLORS = ['#28a745', '#dc3545', '#ffc107', '#17a2b8'];

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

        const attendance = attendanceRes.data || [];
        const presentCount = attendance.filter(a => a.status === 'present').length;
        const absentCount = attendance.filter(a => a.status === 'absent').length;
        const lateCount = attendance.filter(a => a.status === 'late').length;

        setAttendanceData([
          { name: 'Present', value: presentCount, color: '#28a745' },
          { name: 'Absent', value: absentCount, color: '#dc3545' },
          { name: 'Late', value: lateCount, color: '#ffc107' },
        ]);

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
    return <div className="text-center p-5"><Spinner animation="border" /></div>;
  }

  return (
    <div className="container-fluid mt-4">
      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm border-0 dashboard-card h-100">
            <Card.Body>
              <Card.Title className="mb-3">Student Attendance Overview</Card.Title>
              {attendanceData.every(d => d.value === 0) ? (
                <p className="text-muted text-center p-4">No attendance data available.</p>
              ) : (
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
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm border-0 dashboard-card h-100">
            <Card.Body>
              <Card.Title className="mb-3">Student Performance</Card.Title>
              {marksData.length === 0 ? (
                <p className="text-muted text-center p-4">No marks data available.</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={marksData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="marks" fill="#8884d8" name="Marks" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
