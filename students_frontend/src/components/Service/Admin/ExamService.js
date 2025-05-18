// src/components/Service/ExamService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Exam APIs
export const getExams = () => axios.get(`${API_URL}/exam`);
export const getExam = (id) => axios.get(`${API_URL}/exam/${id}`);
export const createExam = (data) =>
    axios.post(`${API_URL}/exam`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updateExam = (id, data) =>
    axios.put(`${API_URL}/exam/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const deleteExam = (id) => axios.delete(`${API_URL}/exam/${id}`);
