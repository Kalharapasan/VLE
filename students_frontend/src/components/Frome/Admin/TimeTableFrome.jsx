// src/Form/Admin/TimeTableForm.jsx
import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function TimeTableForm({ show, handleClose, onSubmit, initialData }) {
    const [form, setForm] = useState({
        year: '',
        accedamic_year: '',
        semester: '',
        faculties_id: '',
        department_id: '',
        monday: '',
        tuday: '',
        wenday: '',
        theday: '',
        friday: '',
    });

    useEffect(() => {
        setForm(initialData || {
            year: '',
            accedamic_year: '',
            semester: '',
            faculties_id: '',
            department_id: '',
            monday: '',
            tuday: '',
            wenday: '',
            theday: '',
            friday: '',
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(form).forEach(([key, val]) => data.append(key, val));

        if (initialData?.timetable_id) {
            data.append('_method', 'PUT');
        }

        onSubmit(data);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{initialData ? 'Update' : 'Add'} TimeTable</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {Object.keys(form).map(field => (
                        <Form.Group className="mb-3" key={field}>
                            <Form.Label>{field.replace('_', ' ').toUpperCase()}</Form.Label>
                            <Form.Control
                                type="text"
                                name={field}
                                value={form[field]}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    ))}
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
                        <Button variant="primary" type="submit">{initialData ? 'Update' : 'Add'}</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
