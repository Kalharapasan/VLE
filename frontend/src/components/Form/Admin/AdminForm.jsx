import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export default function AdminForm({ show, handleClose, onSubmit, initialData }) {
    const emptyForm = {
        admin_fname: '',
        admin_lname: '',
        admin_email: '',
        admin_nic: '',
        admin_gender: '',
        admin_address: '',
        admin_img: null,
    };

    const [form, setForm] = useState(emptyForm);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (initialData) {
            setForm({
                ...initialData,
                admin_img: null,
            });
            setPreview(initialData.admin_img_url || null);
        } else {
            setForm(emptyForm);
            setPreview(null);
        }
    }, [initialData]);

    useEffect(() => {
        if (form.admin_img && typeof form.admin_img !== 'string') {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(form.admin_img);
        }
    }, [form.admin_img]);

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
        Object.entries(form).forEach(([key, value]) => {
            if (value !== null) {
                data.append(key, value);
            }
        });
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
                        <Form.Control name="admin_fname" value={form.admin_fname} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="admin_lname" value={form.admin_lname} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="admin_email" value={form.admin_email} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>NIC</Form.Label>
                        <Form.Control name="admin_nic" value={form.admin_nic} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select name="admin_gender" value={form.admin_gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea" rows={3} name="admin_address" value={form.admin_address} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Profile Image</Form.Label>
                        <Form.Control type="file" name="admin_img" accept="image/*" onChange={handleChange} />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                style={{ width: '100%', marginTop: 10, borderRadius: 8 }}
                            />
                        )}
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
                        <Button type="submit" variant="primary">{initialData ? 'Update' : 'Add'} Admin</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
