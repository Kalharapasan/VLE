import api, { API_URL } from '../api';

// Get student payments
export const getPayments = () => api.get('/studenPayment');

// Get payment by ID
export const getPayment = (id) => api.get(`/studenPayment/${id}`);

// Create payment record
export const createPayment = (data) => api.post('/studenPayment', data);

// Update payment record
export const updatePayment = (id, data) => {
    data.append('_method', 'PUT');
    return api.post(`/studenPayment/update/${id}`, data);
};

// Delete payment record
export const deletePayment = (id) => api.delete(`/studenPayment/${id}`);

// Get payments by student index
export const getPaymentsByStudentIndex = (index) => {
    return api.get(`/student/by-index/${index}`).then(res => {
        if (res.data && res.data.student_id) {
            return api.get(`/studenPayment?student_id=${res.data.student_id}`);
        }
        return { data: [] };
    });
};
