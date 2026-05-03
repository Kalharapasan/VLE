import api, { API_URL } from '../api';

export const getAllSubjects = () => api.get('/subject');
export const getSubjectById = (id) => api.get(`/subject/${id}`);
export const createSubject = (data) =>
    api.post('/subject', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updateSubject = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/subject/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
export const deleteSubject = (id) => api.delete(`/subject/${id}`);
