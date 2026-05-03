import api, { API_URL } from '../api';

export const getDepartments = () => api.get('/department');
export const getDepartment = (id) => api.get(`/department/${id}`);
export const createDepartment = (data) => {
    return api.post('/department', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
export const updateDepartment = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/department/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
export const deleteDepartment = (id) => api.delete(`/department/${id}`);
export const getFaculties = () => api.get('/faculties/index');
