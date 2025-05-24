// src/Service/Admin/TimeTableService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/timeTable';

export const getTimeTables = () => axios.get(API_URL);
export const getTimeTable = (id) => axios.get(`${API_URL}/${id}`);
export const createTimeTable = (data) => axios.post(API_URL, data);
export const updateTimeTable = (id, data) => {
    data.append('_method', 'PUT');
    return axios.post(`${API_URL}/update/${id}`, data);
};
export const deleteTimeTable = (id) => axios.delete(`${API_URL}/${id}`);
