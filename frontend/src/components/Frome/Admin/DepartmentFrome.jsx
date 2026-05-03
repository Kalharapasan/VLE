import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { getFaculties } from '../../Service/Admin/DepartmentService';

export default function DepartmentForm({ show, handleClose, onSubmit, initialData }) {
    const [form, setForm] = useState({
        department_name: '',
        description: '',
        faculties_id: '',
        img: null,
    });

    const [faculties, setFaculties] = useState([]);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetchFaculties();
        if (initialData) {
            setForm({
                department_name: initialData.department_name || '',
                description: initialData.description || '',
                faculties_id: initialData.faculties_id || '',
                img: null,
            });
            setPreview(initialData.img ? initialData.img : null);
        } else {
            setForm({ department_name: '', description: '', faculties_id: '', img: null });
            setPreview(null);
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, img: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('department_name', form.department_name);
        formData.append('description', form.description);
        formData.append('faculties_id', form.faculties_id);
        if (form.img) {
            formData.append('img', form.img);
        }

        onSubmit(formData); // Make sure the API call handles FormData
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
                                    {faculty.faculties_Index}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Department Image</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                style={{ width: '100%', marginTop: 10, borderRadius: 8 }}
                            />
                        )}
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
