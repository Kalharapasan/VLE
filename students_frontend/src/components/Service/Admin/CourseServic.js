import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const getCourses = () => axios.get(`${BASE_URL}/courses`);
export const getCourse = (id) => axios.get(`${BASE_URL}/courses/${id}`);
export const createCourse = (data) =>
    axios.post(`${BASE_URL}/courses`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

// ✅ Fixed updateCourse: use POST + _method = PUT
export const updateCourse = (id, data) => {
    data.append('_method', 'PUT');
    return axios.post(`${BASE_URL}/courses/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const deleteCourse = (id) => axios.delete(`${BASE_URL}/courses/${id}`);
export const getFaculties = () => axios.get(`${BASE_URL}/faculties/index`);
export const getDepartment = () => axios.get(`${BASE_URL}/department/index`);
