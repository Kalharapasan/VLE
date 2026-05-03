import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export default function SubjectForm({ show, handleClose, onSubmit, initialData }) {
    const [form, setForm] = useState({
        subject_name: '',
        description: '',
        img: null,
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                subject_name: initialData.subject_name || '',
                description: initialData.description || '',
                img: null,
            });
        } else {
            setForm({
                subject_name: '',
                description: '',
                img: null,
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
                <Modal.Title>{initialData ? 'Update Subject' : 'Add Subject'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="img"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            {initialData ? 'Update' : 'Add'} Subject
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
