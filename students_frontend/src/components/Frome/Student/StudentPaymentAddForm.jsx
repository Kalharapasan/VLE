import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export default function StudentPaymentAddForm({ show, handleClose, onSubmit }) {
  const [form, setForm] = useState({
    payment_Index: '',
    student_id: '',
    payment_reson: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // You can convert to FormData if sending as multipart/form-data
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Student Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Payment Index</Form.Label>
            <Form.Control
              type="text"
              name="payment_Index"
              value={form.payment_Index}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Student ID</Form.Label>
            <Form.Control
              type="number"
              name="student_id"
              value={form.student_id}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Payment Reason</Form.Label>
            <Form.Control
              type="text"
              name="payment_reson"
              value={form.payment_reson}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Payment
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
