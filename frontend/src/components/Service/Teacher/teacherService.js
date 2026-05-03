import api, { API_URL } from '../api';

// Get faculty name by ID
export const getFacultyNameById = (facultyId) => {
  return api.get(`/faculties/name-by-id/${facultyId}`);
};

// Get department name by ID
export const getDepartmentNameById = (departmentId) => {
  return api.get(`/departments/name/${departmentId}`);
};

// Teacher Profile Services
export const getTeacher = (teacherId) => {
  return api.get(`/teacher/${teacherId}`);
};

// Get all teachers (for Other Teachers feature)
export const getTeachers = () => api.get('/teacher');

export const updateTeacher = (teacherId, data) => {
  data.append('_method', 'PUT');
  return api.post(`/teacher/update/${teacherId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Teacher Course Services
export const getTeacherCourses = () => api.get('/teacherCourse');
export const createTeacherCourse = (data) => api.post('/teacherCourse', data);
export const updateTeacherCourse = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/teacherCourse/update/${id}`, data);
};
export const deleteTeacherCourse = (id) => api.delete(`/teacherCourse/${id}`);

// Teacher Subject Services
export const getTeacherSubjects = () => api.get('/teacherSubject');
export const createTeacherSubject = (data) => api.post('/teacherSubject', data);
export const updateTeacherSubject = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/teacherSubject/update/${id}`, data);
};
export const deleteTeacherSubject = (id) => api.delete(`/teacherSubject/${id}`);

// Student Attendance Services
export const getStudentAttendance = () => api.get('/attendance');
export const createStudentAttendance = (data) => api.post('/attendance', data);
export const updateStudentAttendance = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/attendance/update/${id}`, data);
};
export const deleteStudentAttendance = (id) => api.delete(`/attendance/${id}`);

// Student Marks Services
export const getStudentMarks = () => api.get('/studentExamMarks');
export const createStudentMarks = (data) => api.post('/studentExamMarks', data);
export const updateStudentMarks = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/studentExamMarks/update/${id}`, data);
};
export const deleteStudentMarks = (id) => api.delete(`/studentExamMarks/${id}`);

// Timetable Services
export const getTimeTable = () => api.get('/timeTable');
