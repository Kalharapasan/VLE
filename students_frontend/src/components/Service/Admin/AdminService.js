import axios from 'axios';

const API_URL = 'http://localhost:8000/api/admins';

export const getAdmins = () => axios.get(`${API_URL}/admin`);
export const getAdmin = (id) => axios.get(`${API_URL}/admin/${id}`);
export const createAdmin = (data) =>
  axios.post(`${API_URL}/admin`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateAdmin = (id, data) =>
  axios.post(`${API_URL}/admin/update/${id}?_method=PUT`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteAdmin = (id) => axios.delete(`${API_URL}/admin/${id}`);
