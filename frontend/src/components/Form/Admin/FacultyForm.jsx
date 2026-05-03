import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export default function FacultyForm({ show, handleClose, onSubmit, initialData }) {
    const emptyForm = {
        faculties_Index: '',
        faculties_name: '',
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
                <Modal.Title>{initialData ? 'Update Faculty' : 'Add Faculty'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Faculty Index</Form.Label>
                        <Form.Control name="faculties_Index" value={form.faculties_Index} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Faculty Name</Form.Label>
                        <Form.Control name="faculties_name" value={form.faculties_name} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
                        <Button type="submit" variant="primary">{initialData ? 'Update' : 'Add'} Faculty</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
