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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const TeacherDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState({
    profile: null,
    subjects: [],
    timetable: [],
  });

  const [openAttendanceDialog, setOpenAttendanceDialog] = useState(false);
  const [openMarksDialog, setOpenMarksDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [attendanceData, setAttendanceData] = useState({
    student_id: '',
    subject_id: '',
    date: '',
    status: 'present',
  });
  const [marksData, setMarksData] = useState({
    student_id: '',
    exam_id: '',
    obtained_marks: '',
    remarks: '',
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

        const [profile, subjects, timetable] = await Promise.all([
          axios.get('/api/teacher/profile', config),
          axios.get('/api/teacher/subjects', config),
          axios.get('/api/teacher/timetable', config),
        ]);

        setDashboardData({
          profile: profile.data,
          subjects: subjects.data,
          timetable: timetable.data,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleAttendanceSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/teacher/attendance', attendanceData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOpenAttendanceDialog(false);
      // Refresh data or show success message
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark attendance');
    }
  };

  const handleMarksSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/teacher/exam-marks', marksData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOpenMarksDialog(false);
      // Refresh data or show success message
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add marks');
    }
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

        {/* Subjects Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                My Subjects
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Subject Name</TableCell>
                    <TableCell>Course</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData.subjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>{subject.course.name}</TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          onClick={() => {
                            setSelectedSubject(subject.id);
                            setOpenAttendanceDialog(true);
                          }}
                        >
                          Mark Attendance
                        </Button>
                        <Button
                          size="small"
                          onClick={() => {
                            setSelectedSubject(subject.id);
                            setOpenMarksDialog(true);
                          }}
                        >
                          Add Marks
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Timetable Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                My Timetable
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Room</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData.timetable.map((slot) => (
                    <TableRow key={slot.id}>
                      <TableCell>{slot.day}</TableCell>
                      <TableCell>{slot.subject.name}</TableCell>
                      <TableCell>{`${slot.start_time} - ${slot.end_time}`}</TableCell>
                      <TableCell>{slot.room}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Attendance Dialog */}
      <Dialog open={openAttendanceDialog} onClose={() => setOpenAttendanceDialog(false)}>
        <DialogTitle>Mark Attendance</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Student ID"
            value={attendanceData.student_id}
            onChange={(e) => setAttendanceData({ ...attendanceData, student_id: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={attendanceData.status}
              onChange={(e) => setAttendanceData({ ...attendanceData, status: e.target.value })}
            >
              <MenuItem value="present">Present</MenuItem>
              <MenuItem value="absent">Absent</MenuItem>
              <MenuItem value="late">Late</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="date"
            label="Date"
            value={attendanceData.date}
            onChange={(e) => setAttendanceData({ ...attendanceData, date: e.target.value })}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAttendanceDialog(false)}>Cancel</Button>
          <Button onClick={handleAttendanceSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Marks Dialog */}
      <Dialog open={openMarksDialog} onClose={() => setOpenMarksDialog(false)}>
        <DialogTitle>Add Marks</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Student ID"
            value={marksData.student_id}
            onChange={(e) => setMarksData({ ...marksData, student_id: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Exam ID"
            value={marksData.exam_id}
            onChange={(e) => setMarksData({ ...marksData, exam_id: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Marks Obtained"
            type="number"
            value={marksData.obtained_marks}
            onChange={(e) => setMarksData({ ...marksData, obtained_marks: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Remarks"
            multiline
            rows={3}
            value={marksData.remarks}
            onChange={(e) => setMarksData({ ...marksData, remarks: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMarksDialog(false)}>Cancel</Button>
          <Button onClick={handleMarksSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherDashboard;
