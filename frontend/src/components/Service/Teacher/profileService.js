import api, { API_URL } from '../api';

// Get teacher profile
export const getTeacher = (teacherId) => {
  return api.get(`/teacher/${teacherId}`);
};

// Update teacher profile
export const updateTeacher = (teacherId, data) => {
  data.append('_method', 'PUT');
  return api.post(`/teacher/update/${teacherId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Get faculty name by ID
export const getFacultyNameById = (facultyId) => {
  return api.get(`/faculties/name-by-id/${facultyId}`);
};

// Get department name by ID
export const getDepartmentNameById = (departmentId) => {
  return api.get(`/departments/name/${departmentId}`);
};
