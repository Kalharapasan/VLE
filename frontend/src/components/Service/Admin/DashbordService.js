import api, { API_URL } from '../api';

export const getAdminCount = () => api.get('/admin/count');
export const getStudentCount = () => api.get('/student/count');
export const getCourseCount = () => api.get('/courses/count');
export const getDepartmentCount = () => api.get('/department/count');
export const getExamCount = () => api.get('/exam/count');
export const getFacultyCount = () => api.get('/faculty/count');
export const getTeacherCount = () => api.get('/teacher/count');
export const getTimetableCount = () => api.get('/timeTable/count');
export const getSubjectCount = () => api.get('/subject/count');
