import { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
} from '../../Service/Admin/DepartmentService';
import DepartmentForm from '../../Frome/Admin/DepartmentFrome';
import DepartmentCard from '../../Card/Admin/DepartmentCard';

export default function DepartmentTable() {
    const [departments, setDepartments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [search, setSearch] = useState('');

    const fetchDepartments = async () => {
        try {
            const res = await getDepartments();
            setDepartments(res.data);
        } catch (error) {
            console.error('Failed to fetch departments', error);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleCreate = async (data) => {
        try {
            await createDepartment(data);
            fetchDepartments();
        } catch (error) {
            console.error('Failed to create department', error);
        }
    };

    const handleUpdate = async (data) => {
        try {
            await updateDepartment(selectedDepartment.department_id, data);
            setSelectedDepartment(null);
            fetchDepartments();
        } catch (error) {
            console.error('Failed to update department', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            try {
                await deleteDepartment(id);
                fetchDepartments();
            } catch (error) {
                console.error('Failed to delete department', error);
            }
        }
    };

    const handleEdit = (dept) => {
        setSelectedDepartment(dept);
        setShowForm(true);
    };

    const filtered = departments.filter((d) =>
        d.department_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2>Departments</h2>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button onClick={() => setShowForm(true)}>Add Department</Button>
                <Form.Control
                    placeholder="Search department..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: 300 }}
                />
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Index</th>
                    <th>Name</th>
                    <th>Faculty</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filtered.map((dept, idx) => (
                    <tr key={dept.department_id}>
                        <td>{idx + 1}</td>
                        <td>{dept.department_Index}</td>
                        <td>{dept.department_name}</td>
                        <td>{dept.faculties_id}</td>
                        <td>
                            <Button
                                size="sm"
                                onClick={() => handleEdit(dept)}
                                className="me-2"
                            >
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleDelete(dept.department_id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <div className="row mt-4">
                <h4 className="mt-5">Department </h4>
                {filtered.map((dept) => (
                    <div className="col-md-4" key={dept.department_id}>
                        <DepartmentCard
                            department={dept}
                            onEdit={() => handleEdit(dept)}
                            onDelete={() => handleDelete(dept.department_id)}
                        />
                    </div>
                ))}
            </div>

            <DepartmentForm
                show={showForm}
                handleClose={() => {
                    setShowForm(false);
                    setSelectedDepartment(null);
                }}
                onSubmit={selectedDepartment ? handleUpdate : handleCreate}
                initialData={selectedDepartment}
            />
        </div>
    );
}