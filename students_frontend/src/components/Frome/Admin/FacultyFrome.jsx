// src/components/Form/FacultyForm.jsx
import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export default function FacultyForm({ show, handleClose, onSubmit, initialData }) {
    const [form, setForm] = useState({
        faculties_name: '',
        description: ''
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                faculties_name: initialData.faculties_name || '',
                description: initialData.description || '',
            });
        } else {
            setForm({ faculties_name: '', description: '' });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        for (let key in form) {
            data.append(key, form[key]);
        }
        onSubmit(data);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{initialData ? 'Update Faculty' : 'Add Faculty'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Faculty Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="faculties_name"
                            value={form.faculties_name}
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
                        <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
                        <Button variant="primary" type="submit">{initialData ? 'Update' : 'Add'} Faculty</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
