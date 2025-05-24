import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { getFaculties } from '../../Service/Admin/DepartmentService';

export default function DepartmentForm({ show, handleClose, onSubmit, initialData }) {
    const [form, setForm] = useState({
        department_name: '',
        description: '',
        faculties_id: '',
    });

    const [faculties, setFaculties] = useState([]);

    useEffect(() => {
        fetchFaculties();
        if (initialData) {
            setForm(initialData);
        } else {
            setForm({ department_name: '', description: '', faculties_id: '' });
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{initialData ? 'Edit Department' : 'Add Department'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Department Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="department_name"
                            value={form.department_name}
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
                                    {faculty.faculty_name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            {initialData ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
