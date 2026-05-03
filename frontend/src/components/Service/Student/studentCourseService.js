import api, { API_URL } from '../api';

export const getStudentCourses = () => api.get('/student/course');
export const createStudentCourse = (data) => api.post('/student/course', data);
export const updateStudentCourse = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/student/course/update/${id}`, data);
};
export const deleteStudentCourse = (id) => api.delete(`/student/course/${id}`);
