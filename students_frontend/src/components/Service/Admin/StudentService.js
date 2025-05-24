// src/components/Service/Student/StudentService.js
import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api';

export const getStudents = () => axios.get(`${BASE_URL}/student`);
export const getStudent = (id) => axios.get(`${BASE_URL}/student/${id}`);
export const createStudent = (data) =>
    axios.post(`${BASE_URL}/student`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const updateStudent = (id, data) => {
    data.append('_method', 'PUT');
    return axios.post(`${BASE_URL}/student/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const deleteStudent = (id) => axios.delete(`${BASE_URL}/student/${id}`);
export const getFaculties = () => axios.get(`${BASE_URL}/faculties/index`);
export const getDepartment = () => axios.get(`${BASE_URL}/department/index`);
