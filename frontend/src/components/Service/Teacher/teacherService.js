import api, { API_URL } from '../api';

export const getFacultyNameById = (facultyId) => {
  return api.get(`/faculties/name-by-id/${facultyId}`);
};

export const getDepartmentNameById = (departmentId) => {
  return api.get(`/departments/name/${departmentId}`);
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
