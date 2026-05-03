import api, { API_URL } from '../api';

export const getFaculties = () => api.get('/faculty');
export const getFaculty = (id) => api.get(`/faculty/${id}`);
export const createFaculty = (data) =>
    api.post('/faculty', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updateFaculty = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/faculty/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
export const deleteFaculty = (id) => api.delete(`/faculty/${id}`);
