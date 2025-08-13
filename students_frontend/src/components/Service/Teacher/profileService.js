import axios from "axios";

const API_BASE = "http://localhost:8000/api";

// Get faculty name by ID
export const getFacultyNameById = (facultyId) => {
  return axios.get(`${API_BASE}/faculties/name-by-id/${facultyId}`);
};

// Get department name by ID
export const getDepartmentNameById = (departmentId) => {
  return axios.get(`${API_BASE}/departments/name/${departmentId}`);
};