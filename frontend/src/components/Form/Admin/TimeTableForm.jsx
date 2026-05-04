import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export default function TimeTableForm({ show, handleClose, onSubmit, initialData }) {
  const emptyForm = {
    day: 'Monday',
    time: '',
    subject_name: '',
    room: '',
  };

  const [form, setForm] = useState(emptyForm);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Update Timetable' : 'Add Timetable Entry'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Day</Form.Label>
            <Form.Select name="day" value={form.day} onChange={handleChange} required>
              {days.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="text"
              name="time"
              value={form.time}
              onChange={handleChange}
              placeholder="e.g. 9:00 AM - 10:30 AM"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject Name</Form.Label>
            <Form.Control
              type="text"
              name="subject_name"
              value={form.subject_name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Room</Form.Label>
            <Form.Control
              type="text"
              name="room"
              value={form.room}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">{initialData ? 'Update' : 'Add'}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
