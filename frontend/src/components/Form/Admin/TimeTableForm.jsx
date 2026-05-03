import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { getFaculties } from '../../Service/Admin/FacultyService';
import { getDepartments } from '../../Service/Admin/DepartmentService';

export default function TimeTableForm({ show, handleClose, onSubmit, initialData }) {
    const emptyForm = {
        timetable_Index: '',
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
                <Modal.Title>{initialData ? 'Update Timetable' : 'Add Timetable'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Timetable Index</Form.Label>
                        <Form.Control name="timetable_Index" value={form.timetable_Index} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Year</Form.Label>
                        <Form.Control name="year" value={form.year} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Academic Year</Form.Label>
                        <Form.Control name="accedamic_year" value={form.accedamic_year} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Semester</Form.Label>
                        <Form.Select name="semester" value={form.semester} onChange={handleChange} required>
                            <option value="">Select Semester</option>
                            <option value="Semester 1">Semester 1</option>
                            <option value="Semester 2">Semester 2</option>
                        </Form.Select>
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

                    <Form.Group className="mb-3">
                        <Form.Label>Monday</Form.Label>
                        <Form.Control name="monday" value={form.monday} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tuesday</Form.Label>
                        <Form.Control name="tuday" value={form.tuday} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Wednesday</Form.Label>
                        <Form.Control name="wenday" value={form.wenday} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Thursday</Form.Label>
                        <Form.Control name="theday" value={form.theday} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Friday</Form.Label>
                        <Form.Control name="friday" value={form.friday} onChange={handleChange} />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
                        <Button type="submit" variant="primary">{initialData ? 'Update' : 'Add'} Timetable</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
