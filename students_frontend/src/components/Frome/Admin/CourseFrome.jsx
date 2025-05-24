import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { getFaculties, getDepartment } from '../../Service/Admin/CourseServic';

export default function CourseForm({ show, handleClose, onSubmit, initialData }) {
    const [form, setForm] = useState({
        course_name: '',
        description: '',
        faculties_id: '',
        department_id: '',
        img: null,
    });

    const [faculties, setFaculties] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetchFaculties();
        fetchDepartments();
    }, []);

    useEffect(() => {
        if (initialData) {
            setForm({
                course_name: initialData.course_name || '',
                description: initialData.description || '',
                faculties_id: initialData.faculties_id || '',
                department_id: initialData.department_id || '',
                img: null,
            });
            setPreview(initialData.img ? initialData.img : null);
        } else {
            setForm({ course_name: '', description: '', faculties_id: '', department_id: '', img: null });
            setPreview(null);
        }
    }, [initialData]);

    const fetchFaculties = async () => {
        try {
            const res = await getFaculties();
            setFaculties(res.data);
        } catch (err) {
            console.error('Failed to load faculties', err);
        }
    };

    const fetchDepartments = async () => {
        try {
            const res = await getDepartment();
            setDepartments(res.data);
        } catch (err) {
            console.error('Failed to load departments', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, img: file }));
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('course_name', form.course_name);
        formData.append('description', form.description);
        formData.append('faculties_id', form.faculties_id);
        formData.append('department_id', form.department_id);
        if (form.img) formData.append('img', form.img);
        onSubmit(formData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{initialData ? 'Update Course' : 'Add Course'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Form.Group className="mb-3">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="course_name"
                            value={form.course_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Faculty</Form.Label>
                        <Form.Select
                            name="faculties_id"
                            value={form.faculties_id}
                            onChange={handleChange}
                            required
                        >
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
                        <Form.Select
                            name="department_id"
                            value={form.department_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Department</option>
                            {departments.map((department) => (
                                <option key={department.department_id} value={department.department_id}>
                                    {department.department_Index}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Course Image</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
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
                        <Button variant="primary" type="submit">
                            {initialData ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
