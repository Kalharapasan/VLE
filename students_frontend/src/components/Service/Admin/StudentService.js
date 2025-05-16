// src/components/Service/StudentService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/student';

export const getStudents = () => axios.get(`${API_URL}/student`);
export const getStudent = (id) => axios.get(`${API_URL}/student/${id}`);
export const createStudent = (data) =>
  axios.post(`${API_URL}/student`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateStudent = (id, data) =>
  axios.post(`${API_URL}/student/update/${id}?_method=PUT`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteStudent = (id) => axios.delete(`${API_URL}/student/${id}`);
