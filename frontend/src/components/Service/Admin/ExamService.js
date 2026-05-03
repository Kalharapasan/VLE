import api, { API_URL } from '../api';

export const getExams = () => api.get('/exam');
export const createExam = (data) =>
    api.post('/exam', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updateExam = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/exam/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
export const deleteExam = (id) => api.delete(`/exam/${id}`);
export const getFaculties = () => api.get('/faculties/index');
export const getDepartments = () => api.get('/department/index');
