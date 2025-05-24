import { Card, Button, ButtonGroup } from 'react-bootstrap';
//import { deleteDepartment } from './api'; // Adjust path to your API module
import { useState } from 'react';

export default function DepartmentCard({ department, onEdit, onDelete }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete ${department.department_name}?`)) return;
        try {
            setLoading(true);
            await deleteDepartment(department.id); // Assuming department has an 'id' field
            if (onDelete) onDelete(department.id);
        } catch (error) {
            console.error('Delete failed', error);
            alert('Failed to delete department');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        if (onEdit) onEdit(department);
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{department.department_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{department.department_Index}</Card.Subtitle>
                <Card.Text>
                    <strong>Description:</strong> {department.description}<br />
                    <strong>Faculty:</strong> {department.faculty?.faculty_name}
                </Card.Text>
                <ButtonGroup>
                    <Button variant="outline-primary" onClick={handleEdit} disabled={loading}>
                        Edit
                    </Button>
                    <Button variant="outline-danger" onClick={handleDelete} disabled={loading}>
                        {loading ? 'Deleting...' : 'Delete'}
                    </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
}
