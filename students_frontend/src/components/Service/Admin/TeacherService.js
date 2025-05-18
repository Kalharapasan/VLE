// src/components/Service/TeacherService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/teacher';

export const getTeachers = () => axios.get(API_URL);
export const getTeacher = (id) => axios.get(`${API_URL}/${id}`);
export const createTeacher = (data) =>
    axios.post(API_URL, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updateTeacher = (id, data) =>
    axios.put(`${API_URL}/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const deleteTeacher = (id) => axios.delete(`${API_URL}/${id}`);
