import axios from 'axios';

const API_URL = 'http://localhost:8000/api/subject';

export const getAllSubjects = () => axios.get(`${API_URL}`);
export const getSubjectById = (id) => axios.get(`${API_URL}/${id}`);
export const createSubject = (data) =>
    axios.post(`${API_URL}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updateSubject = (id, data) =>
    axios.put(`${API_URL}/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const deleteSubject = (id) => axios.delete(`${API_URL}/${id}`);
