import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export default function TimeTableFrome({ show, handleClose, onSubmit, initialData }) {
    const [form, setForm] = useState({
        admin_fname: '',
        admin_lname: '',
        admin_birthday: '',
        admin_email: '',
        admin_nic: '',
        admin_gender: '',
        admin_address: '',
        admin_img: null,
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                admin_fname: initialData.admin_fname || '',
                admin_lname: initialData.admin_lname || '',
                admin_birthday: initialData.admin_birthday?.split('T')[0] || '',
                admin_email: initialData.admin_email || '',
                admin_nic: initialData.admin_nic || '',
                admin_gender: initialData.admin_gender || '',
                admin_address: initialData.admin_address || '',
                admin_img: null, // Do not prefill file input
            });
        } else {
            setForm({
                admin_fname: '',
                admin_lname: '',
                admin_birthday: '',
                admin_email: '',
                admin_nic: '',
                admin_gender: '',
                admin_address: '',
                admin_img: null,
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
                <Modal.Title>{initialData ? 'Update Admin' : 'Add Admin'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="admin_fname"
                            value={form.admin_fname}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="admin_lname"
                            value={form.admin_lname}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control
                            type="date"
                            name="admin_birthday"
                            value={form.admin_birthday}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="admin_email"
                            value={form.admin_email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>NIC</Form.Label>
                        <Form.Control
                            type="text"
                            name="admin_nic"
                            value={form.admin_nic}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                            name="admin_gender"
                            value={form.admin_gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="admin_address"
                            value={form.admin_address}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Profile Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="admin_img"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            {initialData ? 'Update' : 'Add'} Admin
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
