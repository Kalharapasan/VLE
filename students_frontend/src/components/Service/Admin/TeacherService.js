import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const getTeachers = () => axios.get(`${BASE_URL}/teacher`);
export const getTeacher = (id) => axios.get(`${BASE_URL}/teacher/${id}`);
export const createTeacher = (data) =>
    axios.post(`${BASE_URL}/teacher`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updateTeacher = (id, data) =>
    axios.post(`${BASE_URL}/teacher/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const deleteTeacher = (id) => axios.delete(`${BASE_URL}/teacher/${id}`);
export const getFaculties = () => axios.get(`${BASE_URL}/faculties/index`);
export const getDepartment = () => axios.get(`${BASE_URL}/department/index`);