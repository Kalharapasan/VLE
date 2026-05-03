import api, { API_URL } from '../api';

export const getCourses = () => api.get('/courses');
export const getCourse = (id) => api.get(`/courses/${id}`);
export const createCourse = (data) =>
    api.post('/courses', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const updateCourse = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/courses/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const deleteCourse = (id) => api.delete(`/courses/${id}`);
export const getFaculties = () => api.get('/faculties/index');
export const getDepartments = () => api.get('/department/index');
