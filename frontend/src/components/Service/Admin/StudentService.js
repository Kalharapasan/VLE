import api, { API_URL } from '../api';

export const getStudents = () => api.get('/student');
export const getStudent = (id) => api.get(`/student/${id}`);
export const createStudent = (data) =>
    api.post('/student', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const updateStudent = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/student/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const deleteStudent = (id) => api.delete(`/student/${id}`);
// Student form needs full records (name + mapping ids), not only index fields.
export const getFaculties = () => api.get('/faculty');
export const getDepartments = () => api.get('/department');
