import React, { useEffect, useState, useRef } from 'react';
import {
  Form,
  Button,
  Spinner,
  Alert,
  Image,
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import axios from 'axios';

export default function TeacherProfile() {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const fileInputRef = useRef(null);

  const teacherId = 1; // Replace with actual auth logic or prop

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teacherRes, facultiesRes, departmentsRes] = await Promise.all([
          axios.get(`http://localhost:8000/api/teacher/${teacherId}`),
          axios.get('http://localhost:8000/api/faculties/names'),
          axios.get('http://localhost:8000/api/department/names'),
        ]);

        let teacherData = teacherRes.data;

        // Format birthday
        if (teacherData.teacher_birthday) {
          teacherData.teacher_birthday = new Date(teacherData.teacher_birthday)
            .toISOString()
            .split('T')[0];
        }

        // Normalize gender
        const gender = teacherData.teacher_gender?.trim().toLowerCase();
        teacherData.teacher_gender =
          gender === 'male'
            ? 'Male'
            : gender === 'female'
            ? 'Female'
            : '';

        setTeacher(teacherData);

        if (teacherData.teacher_img) {
          setImagePreview(`http://localhost:8000/storage/${teacherData.teacher_img}`);
        }

        setFaculties(facultiesRes.data);
        setDepartments(departmentsRes.data);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTeacher((prev) => ({ ...prev, teacher_img: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    for (const key in teacher) {
      formData.append(key, teacher[key]);
    }

    try {
      await axios.post(
        `http://localhost:8000/api/teacher/update/${teacherId}?_method=PUT`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !teacher) return <Spinner animation="border" className="mt-5" />;

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Teacher Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="shadow p-4 rounded bg-light">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <div className="mb-4 text-center">
                  <div
                    style={{ cursor: 'pointer', display: 'inline-block' }}
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Image
                      src={imagePreview || 'https://via.placeholder.com/150'}
                      roundedCircle
                      thumbnail
                      width={150}
                      height={150}
                      alt="Click to change profile"
                      title="Click to change profile"
                    />
                    <div className="text-muted mt-2" style={{ fontSize: '0.9rem' }}>
                      Click image to change
                    </div>
                  </div>
                  <Form.Control
                    type="file"
                    name="teacher_img"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Teacher Index</Form.Label>
                  <Form.Control
                    type="text"
                    name="teacher_Index"
                    value={teacher.teacher_Index || ''}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="teacher_fname"
                    value={teacher.teacher_fname || ''}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="teacher_lname"
                    value={teacher.teacher_lname || ''}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="teacher_email"
                    value={teacher.teacher_email || ''}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>NIC</Form.Label>
                  <Form.Control
                    type="text"
                    name="teacher_nic"
                    value={teacher.teacher_nic || ''}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="teacher_gender"
                    value={teacher.teacher_gender || ''}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    name="teacher_birthday"
                    value={teacher.teacher_birthday || ''}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Faculty</Form.Label>
                  <Form.Select
                    name="faculties_id"
                    value={teacher.faculties_id || ''}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Faculty</option>
                    {faculties.map((fac) => (
                      <option key={fac.faculties_id} value={fac.faculties_id}>
                        {fac.faculties_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    name="department_id"
                    value={teacher.department_id || ''}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dep) => (
                      <option key={dep.department_id} value={dep.department_id}>
                        {dep.department_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <div className="mt-4">
                  <Button type="submit" variant="primary" disabled={saving}>
                    {saving ? 'Saving...' : 'Update Profile'}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
