import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Badge, Modal } from 'react-bootstrap';
import { getBooks, borrowBook } from '../../Service/Student/libraryService';
import { getMyBorrows, returnBook } from '../../Service/Student/libraryService';

export default function StudentLibrary() {
  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [booksRes, borrowsRes] = await Promise.all([
        getBooks(),
        getMyBorrows(),
      ]);
      setBooks(booksRes.data || []);
      setBorrows(borrowsRes.data || []);
    } catch (err) {
      console.error('Error fetching library data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async (e) => {
    e.preventDefault();
    try {
      await borrowBook(selectedBook.id, dueDate);
      alert('Book borrowed successfully!');
      setShowBorrowModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error borrowing book');
    }
  };

  const handleReturn = async (bookId) => {
    if (!window.confirm('Are you sure you want to return this book?')) return;
    try {
      await returnBook(bookId);
      alert('Book returned successfully!');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error returning book');
    }
  };

  if (loading) return <div className="text-center p-4"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;

  return (
    <div className="container mt-4">
      <h3>Library</h3>

      {/* My Borrowed Books */}
      <h5 className="mt-4">My Borrowed Books</h5>
      {borrows.length === 0 ? (
        <p className="text-muted">You haven't borrowed any books yet.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Book Title</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((borrow, idx) => (
              <tr key={borrow.id || idx}>
                <td>{idx + 1}</td>
                <td>{borrow.book?.title || 'N/A'}</td>
                <td>{borrow.borrow_date}</td>
                <td>{borrow.due_date}</td>
                <td>
                  <Badge bg={borrow.status === 'borrowed' ? 'warning' : 'success'}>
                    {borrow.status}
                  </Badge>
                </td>
                <td>
                  {borrow.status === 'borrowed' && (
                    <Button size="sm" variant="primary" onClick={() => handleReturn(borrow.book_id)}>
                      Return
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Available Books */}
      <h5 className="mt-4">Available Books</h5>
      {books.filter(b => b.available_copies > 0).length === 0 ? (
        <p className="text-muted">No books available.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Available Copies</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.filter(b => b.available_copies > 0).map((book, idx) => (
              <tr key={book.id || idx}>
                <td>{idx + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.available_copies}</td>
                <td>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => {
                      setSelectedBook(book);
                      setShowBorrowModal(true);
                    }}
                  >
                    Borrow
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Borrow Modal */}
      <Modal show={showBorrowModal} onHide={() => setShowBorrowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Borrow Book: {selectedBook?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleBorrow}>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Borrow</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
