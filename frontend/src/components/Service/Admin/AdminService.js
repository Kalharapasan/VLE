import api, { API_URL } from '../api';

export const getAdmins = () => api.get('/admin');
export const getAdmin = (id) => api.get(`/admin/${id}`);
export const createAdmin = (data) =>
    api.post('/admin', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const updateAdmin = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/admin/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const deleteAdmin = (id) => api.delete(`/admin/${id}`);
