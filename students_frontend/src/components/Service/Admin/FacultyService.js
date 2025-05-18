// src/service/FacultyService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/faculty';

export const getFaculties = () => axios.get(API_URL);
export const getFaculty = (id) => axios.get(`${API_URL}/${id}`);
export const createFaculty = (data) =>
    axios.post(API_URL, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updateFaculty = (id, data) =>
    axios.put(`${API_URL}/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const deleteFaculty = (id) => axios.delete(`${API_URL}/${id}`);
