import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { getDepartments, getFaculties } from '../../Service/Admin/ExamService.js';

export default function ExamForm({ show, handleClose, onSubmit, initialData }) {
    const emptyForm = {
        exam_name: '',
        exam_start_date: '',
        exam_end_date: '',
        faculties_id: '',
        department_id: '',
    };

    const [form, setForm] = useState(emptyForm);
    const [departments, setDepartments] = useState([]);
    const [faculties, setFaculties] = useState([]);

    useEffect(() => {
        getDepartments().then((res) => setDepartments(res.data)).catch(console.error);
        getFaculties().then((res) => setFaculties(res.data)).catch(console.error);
    }, []);

    useEffect(() => {
        if (initialData) {
            setForm({
                exam_name: initialData.exam_name || '',
                exam_start_date: initialData.exam_start_date?.split('T')[0] || '',
                exam_end_date: initialData.exam_end_date?.split('T')[0] || '',
                faculties_id: initialData.faculties_id || '',
                department_id: initialData.department_id || '',
            });
        } else {
            setForm(emptyForm);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form); // handled as FormData in the parent
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{initialData ? 'Update Exam' : 'Add Exam'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Exam Name</Form.Label>
                        <Form.Control
                            name="exam_name"
                            value={form.exam_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="exam_start_date"
                            value={form.exam_start_date}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="exam_end_date"
                            value={form.exam_end_date}
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
                            {faculties.map((f) => (
                                <option key={f.faculties_id} value={f.faculties_id}>
                                    {f.faculties_Index}
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
                            {departments.map((d) => (
                                <option key={d.department_id} value={d.department_id}>
                                    {d.department_Index}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            {initialData ? 'Update' : 'Add'} Exam
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
