// src/components/Frome/StudentForm.js
import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export default function StudentForm({ show, handleClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    student_fname: '',
    student_lname: '',
    student_birthday: '',
    student_email: '',
    student_nic: '',
    student_gender: '',
    faculties_id: '',
    department_id: '',
    student_img: null,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        student_fname: initialData.student_fname || '',
        student_lname: initialData.student_lname || '',
        student_birthday: initialData.student_birthday?.split('T')[0] || '',
        student_email: initialData.student_email || '',
        student_nic: initialData.student_nic || '',
        student_gender: initialData.student_gender || '',
        faculties_id: initialData.faculties_id || '',
        department_id: initialData.department_id || '',
        student_img: null,
      });
    } else {
      setForm({
        student_fname: '',
        student_lname: '',
        student_birthday: '',
        student_email: '',
        student_nic: '',
        student_gender: '',
        faculties_id: '',
        department_id: '',
        student_img: null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in form) {
      if (form[key] !== null) {
        data.append(key, form[key]);
      }
    }
    onSubmit(data);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Update Student' : 'Add Student'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group className="mb-2">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="student_fname" value={form.student_fname} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="student_lname" value={form.student_lname} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Birthday</Form.Label>
            <Form.Control type="date" name="student_birthday" value={form.student_birthday} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="student_email" value={form.student_email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>NIC</Form.Label>
            <Form.Control type="text" name="student_nic" value={form.student_nic} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Gender</Form.Label>
            <Form.Select name="student_gender" value={form.student_gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Faculty ID</Form.Label>
            <Form.Control type="text" name="faculties_id" value={form.faculties_id} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Department ID</Form.Label>
            <Form.Control type="text" name="department_id" value={form.department_id} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control type="file" name="student_img" accept="image/*" onChange={handleChange} />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
            <Button variant="primary" type="submit">{initialData ? 'Update' : 'Add'} Student</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
