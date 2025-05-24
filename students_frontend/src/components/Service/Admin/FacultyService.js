import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getFaculties = () => axios.get(`${API_URL}/faculty`);
export const getFaculty = (id) => axios.get(`${API_URL}/faculty/${id}`);
export const createFaculty = (data) =>
    axios.post(`${API_URL}/faculty`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updateFaculty = (id, data) =>
    axios.put(`${API_URL}/faculty/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const deleteFaculty = (id) => axios.delete(`${API_URL}/faculty/${id}`);
