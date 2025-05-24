import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getAdmins = () => axios.get(`${API_URL}/admin`);
export const getAdmin = (id) => axios.get(`${API_URL}/admin/${id}`);
export const createAdmin = (data) =>
    axios.post(`${API_URL}/admin`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

// ✅ Fix: Convert PUT to POST + _method=PUT for multipart/form-data

export const updateAdmin = (id, data) => {
    data.append('_method', 'PUT');
    return axios.post(`${API_URL}/admin/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};


export const deleteAdmin = (id) => axios.delete(`${API_URL}/admin/${id}`);
