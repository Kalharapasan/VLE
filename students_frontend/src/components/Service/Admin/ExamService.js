import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const getExams = () => axios.get(`${BASE_URL}/exam`);

export const createExam = (data) =>
    axios.post(`${BASE_URL}/exam`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const updateExam = (id, data) =>
    axios.post(`${BASE_URL}/exam/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const deleteExam = (id) => axios.delete(`${BASE_URL}/exam/${id}`);

export const getFaculties = () => axios.get(`${BASE_URL}/faculties/index`);
export const getDepartments = () => axios.get(`${BASE_URL}/department/index`);
