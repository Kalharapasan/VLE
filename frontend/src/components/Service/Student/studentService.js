import api, { API_URL } from '../api';

// Get student profile by student ID
export const getStudentById = (id) => api.get(`/student/${id}`);

// Get student by index_number
export const getStudentByIndex = (index) => api.get(`/student/by-index/${index}`);

// Get student profile (uses index_number from user)
export const getStudentProfile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user?.index_number) {
    return getStudentByIndex(user.index_number);
  }
  return Promise.reject(new Error('No user index found'));
};

// Get student courses
export const getStudentCourses = () => api.get('/student/course');

// Get student exams
export const getStudentExams = () => api.get('/studentExam');

// Get student exam marks
export const getStudentMarks = () => api.get('/studentExamMarks');

// Get student attendance
export const getStudentAttendance = () => api.get('/attendance');

// Get student payments
export const getStudentPayments = () => api.get('/studenPayment');

// Get timetable
export const getTimeTable = () => api.get('/timeTable');

// Get subjects
export const getSubjects = () => api.get('/subject');
