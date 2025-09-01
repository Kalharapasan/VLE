import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
} from '@mui/material';

const StudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState({
    profile: null,
    courses: [],
    gpa: [],
    attendance: [],
    examMarks: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [profile, courses, gpa, attendance, examMarks] = await Promise.all([
          axios.get('/api/student/profile', config),
          axios.get('/api/courses', config),
          axios.get('/api/student/gpa', config),
          axios.get('/api/student/attendance', config),
          axios.get('/api/student/exam-marks', config),
        ]);

        setDashboardData({
          profile: profile.data,
          courses: courses.data,
          gpa: gpa.data.gpa,
          attendance: attendance.data.attendance,
          examMarks: examMarks.data.exam_marks,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Welcome, {dashboardData.profile?.first_name} {dashboardData.profile?.last_name}
              </Typography>
              <Typography variant="body1">
                Email: {dashboardData.profile?.email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* GPA Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                GPA Overview
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Course</TableCell>
                    <TableCell>Semester</TableCell>
                    <TableCell align="right">GPA</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData.gpa.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.course.name}</TableCell>
                      <TableCell>{item.semester}</TableCell>
                      <TableCell align="right">{item.gpa}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Attendance
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData.attendance.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.subject.name}</TableCell>
                      <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                      <TableCell align="right">{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Exam Marks Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Exam Results
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell>Exam</TableCell>
                    <TableCell align="right">Marks</TableCell>
                    <TableCell>Remarks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData.examMarks.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.exam.subject.name}</TableCell>
                      <TableCell>{item.exam.title}</TableCell>
                      <TableCell align="right">{item.obtained_marks}</TableCell>
                      <TableCell>{item.remarks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDashboard;
