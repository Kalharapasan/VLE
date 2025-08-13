import axios from "axios";

const API_BASE = "http://localhost:8000/api";

// Get teacher profile
export const getTeacher = (teacherId) => {
  return axios.get(`${API_BASE}/teacher/${teacherId}`);
};

// Update teacher profile
export const updateTeacher = (teacherId, data) => {
  // Use POST instead of PUT for multipart/form-data
  return axios.post(`${API_BASE}/teacher/update/${teacherId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Get faculty name by ID
export const getFacultyNameById = (facultyId) => {
  return axios.get(`${API_BASE}/faculties/name-by-id/${facultyId}`);
};

// Get department name by ID
export const getDepartmentNameById = (departmentId) => {
  return axios.get(`${API_BASE}/departments/name/${departmentId}`);
};
