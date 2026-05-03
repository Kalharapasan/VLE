import api, { API_URL } from '../api';

// Get student GPA
export const getStudentGPA = (studentId) => api.get(`/studentsGPA/${studentId}`);

// Get all GPAs (for admin)
export const getAllGPAs = () => api.get('/studentsGPA');

// Create GPA record
export const createGPA = (data) => api.post('/studentsGPA', data);

// Update GPA record
export const updateGPA = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/studentsGPA/update/${id}`, data);
};

// Delete GPA record
export const deleteGPA = (id) => api.delete(`/studentsGPA/${id}`);

// Get GPA by student index
export const getGPAbyStudentIndex = (index) => {
    return api.get(`/student/by-index/${index}`).then(res => {
        if (res.data && res.data.student_id) {
            return getStudentGPA(res.data.student_id);
        }
        return { data: null };
    });
};
