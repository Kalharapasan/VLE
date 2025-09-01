import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getTeacher = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/teacher/${id}`);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch teacher data');
    }
};

export const updateTeacher = async (id, data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const response = await axios.post(`${API_URL}/teacher/update/${id}`, data, config);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update teacher');
    }
};

export const getFacultyNameById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/faculties/name-by-id/${id}`);
        return response;
    } catch (error) {
        throw new Error('Failed to fetch faculty name');
    }
};

export const getDepartmentNameById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/departments/name/${id}`);
        return response;
    } catch (error) {
        throw new Error('Failed to fetch department name');
    }
};
