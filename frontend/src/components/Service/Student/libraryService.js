import api, { API_URL } from '../api';

// Get all books
export const getBooks = () => api.get('/books');

// Get available books
export const getAvailableBooks = () => api.get('/books/available');

// Borrow a book
export const borrowBook = (bookId, dueDate) => {
    return api.post('/books/borrow', {
        book_id: bookId,
        user_id: JSON.parse(localStorage.getItem('user') || '{}').id,
        due_date: dueDate,
    });
};

// Return a book
export const returnBook = (bookId) => api.post(`/books/return/${bookId}`);

// Get my borrowed books
export const getMyBorrows = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) return Promise.reject(new Error('No user found'));
    return api.get(`/book-borrows?user_id=${user.id}`);
};
