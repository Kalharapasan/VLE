import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { getFaculties, getDepartment } from '../../Service/Admin/StudentService.js';

export default function StudentForm({ show, handleClose, onSubmit, initialData }) {
  const emptyForm = {
    student_fname: '',
    student_lname: '',
    student_birthday: '',
    student_email: '',
    student_nic: '',
    student_gender: '',
    faculties_id: '',
    department_id: '',
    student_img: null,
  };

  const [form, setForm] = useState(emptyForm);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [preview, setPreview] = useState(null);

  // Load Faculties and Departments
  useEffect(() => {
    getFaculties()
        .then((res) => setFaculties(res.data))
        .catch((err) => console.error('Failed to fetch faculties:', err));

    getDepartment()
        .then((res) => setDepartments(res.data))
        .catch((err) => console.error('Failed to fetch departments:', err));
  }, []);

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      // Fix incorrect date format: convert "YYYY-MM-DD HH:mm:ss" -> "YYYY-MM-DD"
      const birthday = initialData.student_birthday
          ? initialData.student_birthday.split(' ')[0]  // Split on space
          : '';

      setForm({
        ...initialData,
        student_birthday: birthday,
        student_img: null, // Reset file input
      });
      setPreview(initialData.student_img_url || null);
    } else {
      setForm(emptyForm);
      setPreview(null);
    }
  }, [initialData]);


  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0])); // Update image preview
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in form) {
      if (form[key] !== null) {
        data.append(key, form[key]);
      }
    }
    onSubmit(data); // Pass form data to parent
    handleClose(); // Close modal
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
              <Form.Control
                  type="text"
                  name="student_fname"
                  value={form.student_fname}
                  onChange={handleChange}
                  required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                  type="text"
                  name="student_lname"
                  value={form.student_lname}
                  onChange={handleChange}
                  required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                  type="date"
                  name="student_birthday"
                  value={form.student_birthday}
                  onChange={handleChange}
                  required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                  type="email"
                  name="student_email"
                  value={form.student_email}
                  onChange={handleChange}
                  required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>NIC</Form.Label>
              <Form.Control
                  type="text"
                  name="student_nic"
                  value={form.student_nic}
                  onChange={handleChange}
                  required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="student_gender" value={form.student_gender} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Faculty</Form.Label>
              <Form.Select name="faculties_id" value={form.faculties_id} onChange={handleChange} required>
                <option value="">Select Faculty</option>
                {faculties.map((faculty) => (
                    <option key={faculty.faculties_id} value={faculty.faculties_id}>
                      {faculty.faculties_Index}
                    </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select name="department_id" value={form.department_id} onChange={handleChange} required>
                <option value="">Select Department</option>
                {departments.map((department) => (
                    <option key={department.department_id} value={department.department_id}>
                      {department.department_Index}
                    </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="file" name="student_img" accept="image/*" onChange={handleChange} />
              {preview && (
                  <img
                      src={preview}
                      alt="Preview"
                      style={{ width: '100%', marginTop: 10, borderRadius: 8 }}
                  />
              )}
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {initialData ? 'Update' : 'Add'} Student
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
  );
}
