import { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import FacultyForm from '../../Frome/Admin/FacultyFrome';
import FacultyCard from '../../Card/Admin/FacultyCard';
import {
    getFaculties,
    createFaculty,
    updateFaculty,
    deleteFaculty,
} from '../../Service/Admin/FacultyService';

export default function FacultyTable() {
    const [faculties, setFaculties] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchFaculties = async () => {
        try {
            const res = await getFaculties();
            setFaculties(res.data);
        } catch (err) {
            console.error('Error fetching faculties', err);
        }
    };

    useEffect(() => {
        fetchFaculties();
    }, []);

    const handleCreate = async (formData) => {
        try {
            await createFaculty(formData);
            fetchFaculties();
        } catch (err) {
            console.error('Error creating faculty', err);
        }
    };

    const handleUpdate = async (formData) => {
        if (!selectedFaculty) return;
        try {
            await updateFaculty(selectedFaculty.faculties_id, formData);
            fetchFaculties();
            setSelectedFaculty(null);
        } catch (err) {
            console.error('Error updating faculty', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this faculty?')) {
            try {
                await deleteFaculty(id);
                fetchFaculties();
            } catch (err) {
                console.error('Error deleting faculty', err);
            }
        }
    };

    const filteredFaculties = faculties.filter(
        (f) =>
            f.faculties_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2>Faculty List</h2>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button onClick={() => setShowForm(true)}>Add Faculty</Button>
                <Form.Control
                    type="text"
                    placeholder="Search faculties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '300px' }}
                />
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Faculty Index</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredFaculties.map((faculty, idx) => (
                    <tr key={faculty.faculties_id}>
                        <td>{idx + 1}</td>
                        <td>{faculty.faculties_Index}</td>
                        <td>{faculty.faculties_name}</td>
                        <td>{faculty.description}</td>
                        <td>
                            <Button
                                size="sm"
                                onClick={() => {
                                    setSelectedFaculty(faculty);
                                    setShowForm(true);
                                }}
                                className="me-2"
                            >
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleDelete(faculty.faculties_id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <h4 className="mt-5">Faculties</h4>
            <div className="row">
                {filteredFaculties.map((faculty) => (
                    <div className="col-md-4" key={faculty.faculties_id}>
                        <FacultyCard
                            faculty={faculty}
                            onEdit={() => {
                                setSelectedFaculty(faculty);
                                setShowForm(true);
                            }}
                            onDelete={() => handleDelete(faculty.faculties_id)}
                        />
                    </div>
                ))}
            </div>

            <FacultyForm
                show={showForm}
                handleClose={() => {
                    setShowForm(false);
                    setSelectedFaculty(null);
                }}
                onSubmit={selectedFaculty ? handleUpdate : handleCreate}
                initialData={selectedFaculty}
            />
        </div>
    );
}
