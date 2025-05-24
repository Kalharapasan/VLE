import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const getDepartments = () => axios.get(`${BASE_URL}/department`);

export const getDepartment = (id) => axios.get(`${BASE_URL}/department/${id}`);

export const createDepartment = (data) => {
    return axios.post(`${BASE_URL}/department`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const updateDepartment = (id, data) => {
    return axios.put(`${BASE_URL}/department/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteDepartment = (id) => axios.delete(`${BASE_URL}/department/${id}`);

// Faculty related endpoints
export const getFaculties = () => axios.get(`${BASE_URL}/faculties/index`);