import api, { API_URL } from '../api';

export const getTeachers = () => api.get('/teacher');
export const getTeacher = (id) => api.get(`/teacher/${id}`);
export const createTeacher = (data) =>
    api.post('/teacher', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updateTeacher = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/teacher/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
export const deleteTeacher = (id) => api.delete(`/teacher/${id}`);
export const getFaculties = () => api.get('/faculties/index');
export const getDepartments = () => api.get('/department/index');
