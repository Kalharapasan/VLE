import api, { API_URL } from '../api';

export const getTimeTables = () => api.get('/timeTable');
export const getTimeTable = (id) => api.get(`/timeTable/${id}`);
export const createTimeTable = (data) => api.post('/timeTable', data);
export const updateTimeTable = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/timeTable/update/${id}`, data);
};
export const deleteTimeTable = (id) => api.delete(`/timeTable/${id}`);
