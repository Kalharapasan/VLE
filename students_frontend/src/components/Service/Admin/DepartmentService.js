import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

// Department APIs
export const getDepartments = () => axios.get(`${BASE_URL}/department`);
export const getDepartment = (id) => axios.get(`${BASE_URL}/department/${id}`);
export const createDepartment = (data) => axios.post(`${BASE_URL}/department`, data);
export const updateDepartment = (id, data) => axios.put(`${BASE_URL}/department/update/${id}`, data);
export const deleteDepartment = (id) => axios.delete(`${BASE_URL}/department/${id}`);

// Faculty APIs (FIXED route name)
export const getFaculties = () => axios.get(`${BASE_URL}/faculty`);
