import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { getDepartment, getFaculties } from '../../Service/Admin/TeacherService';

export default function TeacherForm({ show, handleClose, onSubmit, initialData }) {
    const emptyForm = {
        teacher_fname: '',
        teacher_lname: '',
        teacher_birthday: '',
        teacher_email: '',
        teacher_nic: '',
        teacher_gender: '',
        faculties_id: '',
        department_id: '',
        teacher_img: null,
    };

    const [form, setForm] = useState(emptyForm);
    const [departments, setDepartments] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [preview, setPreview] = useState(null);

    // Fetch departments and faculties on component mount
    useEffect(() => {
        getDepartment()
            .then((res) => setDepartments(res.data))
            .catch((err) => console.error('Error fetching departments:', err));

        getFaculties()
            .then((res) => setFaculties(res.data))
            .catch((err) => console.error('Error fetching faculties:', err));
    }, []);

    // Load initial form data when editing
    useEffect(() => {
        if (initialData) {
            setForm({
                ...initialData,
                teacher_birthday: initialData.teacher_birthday?.split('T')[0] || '',
                teacher_img: null,
            });
            setPreview(initialData.teacher_img_url || null);
        } else {
            setForm(emptyForm);
            setPreview(null);
        }
    }, [initialData]);

    // Handle image preview
    useEffect(() => {
        if (form.teacher_img && typeof form.teacher_img !== 'string') {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(form.teacher_img);
        }
    }, [form.teacher_img]);

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
        Object.entries(form).forEach(([key, value]) => {
            if (key === "teacher_birthday" && value) {
                // Convert to full datetime string
                data.append(key, value + " 00:00:00");
            } else if (value !== null) {
                data.append(key, value);
            }
        });
        onSubmit(data);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{initialData ? 'Update Teacher' : 'Add Teacher'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name="teacher_fname" value={form.teacher_fname} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="teacher_lname" value={form.teacher_lname} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" name="teacher_birthday" value={form.teacher_birthday} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="teacher_email" value={form.teacher_email} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>NIC</Form.Label>
                        <Form.Control name="teacher_nic" value={form.teacher_nic} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select name="teacher_gender" value={form.teacher_gender} onChange={handleChange} required>
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
                        <Form.Control type="file" name="teacher_img" accept="image/*" onChange={handleChange} />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                style={{ width: '100%', marginTop: 10, borderRadius: 8 }}
                            />
                        )}
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
                        <Button type="submit" variant="primary">{initialData ? 'Update' : 'Add'} Teacher</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
