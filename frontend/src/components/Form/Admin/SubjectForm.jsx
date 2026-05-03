import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export default function SubjectForm({ show, handleClose, onSubmit, initialData }) {
    const emptyForm = {
        subject_Index: '',
        subject_name: '',
        credite: '',
        description: '',
    };

    const [form, setForm] = useState(emptyForm);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(form);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{initialData ? 'Update Subject' : 'Add Subject'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Subject Index</Form.Label>
                        <Form.Control name="subject_Index" value={form.subject_Index} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Subject Name</Form.Label>
                        <Form.Control name="subject_name" value={form.subject_name} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Credits</Form.Label>
                        <Form.Control type="number" name="credite" value={form.credite} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
                        <Button type="submit" variant="primary">{initialData ? 'Update' : 'Add'} Subject</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
