import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { deleteFaculty } from '../../Service/Admin/FacultyService';
import { useState } from 'react';

export default function FacultyCard({ faculty, onEdit, onDelete }) {
    const { id, faculties_Index, faculties_name, description } = faculty;
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete ${faculties_name}?`)) return;
        try {
            setLoading(true);
            await deleteFaculty(id);
            if (onDelete) onDelete(id);
        } catch (error) {
            console.error('Failed to delete faculty:', error);
            alert('Could not delete faculty.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        if (onEdit) onEdit(faculty);
    };

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <Card.Title>{faculties_Index}: {faculties_name}</Card.Title>
                <Card.Text>{description}</Card.Text>
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
