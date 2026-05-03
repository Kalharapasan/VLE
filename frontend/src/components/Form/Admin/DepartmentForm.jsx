import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { getFaculties } from '../../Service/Admin/FacultyService';

export default function DepartmentForm({ show, handleClose, onSubmit, initialData }) {
    const emptyForm = {
        department_Index: '',
        department_name: '',
        description: '',
        faculties_id: '',
    };

    const [form, setForm] = useState(emptyForm);
    const [faculties, setFaculties] = useState([]);

    useEffect(() => {
        getFaculties()
            .then((res) => setFaculties(res.data || []))
            .catch((err) => console.error('Error fetching faculties:', err));
    }, []);

    useEffect(() => {
        if (initialData) {
            setForm({
                ...initialData,
            });
        } else {
            setForm(emptyForm);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{initialData ? 'Update Department' : 'Add Department'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Department Index</Form.Label>
                        <Form.Control name="department_Index" value={form.department_Index} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Department Name</Form.Label>
                        <Form.Control name="department_name" value={form.department_name} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} />
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

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
                        <Button type="submit" variant="primary">{initialData ? 'Update' : 'Add'} Department</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
