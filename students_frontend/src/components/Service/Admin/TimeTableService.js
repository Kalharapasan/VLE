// src/components/Service/TimeTableService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/timeTable';

export const getTimeTables = () => axios.get(API_URL);
export const getTimeTable = (id) => axios.get(`${API_URL}/${id}`);
export const createTimeTable = (data) =>
    axios.post(API_URL, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updateTimeTable = (id, data) =>
    axios.put(`${API_URL}/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const deleteTimeTable = (id) => axios.delete(`${API_URL}/${id}`);
