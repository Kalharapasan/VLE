import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { getFaculties, getDepartments } from '../../Service/Admin/ExamService';

export default function ExamForm({ show, handleClose, onSubmit, initialData }) {
    const emptyForm = {
        exam_Index: '',
        exam_name: '',
        exam_start_date: '',
        exam_end_date: '',
        faculties_id: '',
        department_id: '',
    };

    const [form, setForm] = useState(emptyForm);
    const [faculties, setFaculties] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getFaculties()
            .then((res) => setFaculties(res.data || []))
            .catch((err) => console.error('Error fetching faculties:', err));

        getDepartments()
            .then((res) => setDepartments(res.data || []))
            .catch((err) => console.error('Error fetching departments:', err));
    }, []);

    useEffect(() => {
        if (initialData) {
            setForm({
                ...initialData,
                exam_start_date: initialData.exam_start_date?.split('T')[0] || '',
                exam_end_date: initialData.exam_end_date?.split('T')[0] || '',
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
                <Modal.Title>{initialData ? 'Update Exam' : 'Add Exam'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Exam Index</Form.Label>
                        <Form.Control name="exam_Index" value={form.exam_Index} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Exam Name</Form.Label>
                        <Form.Control name="exam_name" value={form.exam_name} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" name="exam_start_date" value={form.exam_start_date} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" name="exam_end_date" value={form.exam_end_date} onChange={handleChange} required />
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

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
                        <Button type="submit" variant="primary">{initialData ? 'Update' : 'Add'} Exam</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
