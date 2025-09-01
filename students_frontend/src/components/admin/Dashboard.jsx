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
  Button,
  Box,
  Tab,
  Tabs,
} from '@mui/material';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [dashboardData, setDashboardData] = useState({
    students: [],
    teachers: [],
    courses: [],
    gpaReport: [],
    attendanceReport: [],
    examReport: [],
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

        const [
          students,
          teachers,
          courses,
          gpaReport,
          attendanceReport,
          examReport,
        ] = await Promise.all([
          axios.get('/api/admin/students', config),
          axios.get('/api/admin/teachers', config),
          axios.get('/api/admin/courses', config),
          axios.get('/api/admin/reports/gpa', config),
          axios.get('/api/admin/reports/attendance', config),
          axios.get('/api/admin/reports/exam', config),
        ]);

        setDashboardData({
          students: students.data,
          teachers: teachers.data,
          courses: courses.data,
          gpaReport: gpaReport.data,
          attendanceReport: attendanceReport.data,
          examReport: examReport.data,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Overview" />
          <Tab label="Students" />
          <Tab label="Teachers" />
          <Tab label="Reports" />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Students</Typography>
                <Typography variant="h3">{dashboardData.students.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Teachers</Typography>
                <Typography variant="h3">{dashboardData.teachers.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Courses</Typography>
                <Typography variant="h3">{dashboardData.courses.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Students Tab */}
      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Students List</Typography>
              <Button variant="contained" color="primary">
                Add New Student
              </Button>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>NIC</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dashboardData.students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{`${student.first_name} ${student.last_name}`}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.nic}</TableCell>
                    <TableCell>
                      <Button size="small" color="primary">Edit</Button>
                      <Button size="small" color="error">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Teachers Tab */}
      {tabValue === 2 && (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Teachers List</Typography>
              <Button variant="contained" color="primary">
                Add New Teacher
              </Button>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>NIC</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dashboardData.teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{`${teacher.first_name} ${teacher.last_name}`}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.nic}</TableCell>
                    <TableCell>
                      <Button size="small" color="primary">Edit</Button>
                      <Button size="small" color="error">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Reports Tab */}
      {tabValue === 3 && (
        <Grid container spacing={3}>
          {/* GPA Report */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  GPA Report
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Student</TableCell>
                      <TableCell>Course</TableCell>
                      <TableCell align="right">GPA</TableCell>
                      <TableCell>Semester</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData.gpaReport.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.student_name}</TableCell>
                        <TableCell>{item.course_name}</TableCell>
                        <TableCell align="right">{item.gpa}</TableCell>
                        <TableCell>{item.semester}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* Attendance Report */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Attendance Report
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Student</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Attendance Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData.attendanceReport.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.student_name}</TableCell>
                        <TableCell>{item.subject_name}</TableCell>
                        <TableCell>{item.attendance_percentage}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* Exam Report */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Exam Report
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Student</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Exam</TableCell>
                      <TableCell align="right">Marks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData.examReport.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.student_name}</TableCell>
                        <TableCell>{item.subject_name}</TableCell>
                        <TableCell>{item.exam_title}</TableCell>
                        <TableCell align="right">{item.obtained_marks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default AdminDashboard;
