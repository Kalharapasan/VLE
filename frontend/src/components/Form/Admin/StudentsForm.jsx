import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { getDepartments, getFaculties } from '../../Service/Admin/StudentService';
import { resolveStorageUrl } from '../../../utils/storageUrl';

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
        studen_img: null,
    };

    const [form, setForm] = useState(emptyForm);
    const [departments, setDepartments] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        getDepartments()
            .then((res) => setDepartments(res.data || []))
            .catch((err) => console.error('Error fetching departments:', err));

        getFaculties()
            .then((res) => setFaculties(res.data || []))
            .catch((err) => console.error('Error fetching faculties:', err));
    }, []);

    useEffect(() => {
        if (initialData) {
            setForm({
                ...initialData,
                student_birthday: initialData.student_birthday?.split('T')[0] || '',
                studen_img: null,
            });
            setPreview(resolveStorageUrl(initialData.studen_img));
        } else {
            setForm(emptyForm);
            setPreview(null);
        }
    }, [initialData]);

    useEffect(() => {
        if (form.studen_img && typeof form.studen_img !== 'string') {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(form.studen_img);
        }
    }, [form.studen_img]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (key === "student_birthday" && value) {
                data.append(key, value + " 00:00:00");
            } else if (value !== null) {
                data.append(key, value);
            }
        });
        await onSubmit(data);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{initialData ? 'Update Student' : 'Add Student'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name="student_fname" value={form.student_fname} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="student_lname" value={form.student_lname} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" name="student_birthday" value={form.student_birthday} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="student_email" value={form.student_email} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>NIC</Form.Label>
                        <Form.Control name="student_nic" value={form.student_nic} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select name="student_gender" value={form.student_gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
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
                                    {faculty.faculties_name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Select name="department_id" value={form.department_id} onChange={handleChange} required>
                            <option value="">Select Department</option>
                            {departments
                                .filter(d => d.faculties_id == form.faculties_id)
                                .map((department) => (
                                    <option key={department.department_id} value={department.department_id}>
                                        {department.department_name}
                                    </option>
                                ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Profile Image</Form.Label>
                        <Form.Control type="file" name="studen_img" accept="image/*" onChange={handleChange} />
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
                        <Button type="submit" variant="primary">{initialData ? 'Update' : 'Add'} Student</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
