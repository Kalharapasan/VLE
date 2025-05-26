import { Card, Button } from 'react-bootstrap';

export default function DepartmentCard({ department, onEdit, onDelete }) {
    const {
        department_Index,
        department_name,
        description,
        faculties_id,
        img
    } = department;

    return (
        <Card className="mb-4 shadow-sm">
            {img ? (
                <Card.Img
                    variant="top"
                    src={`http://localhost:8000/storage/${img}`}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
            ) : (
                <div style={{ height: '200px', backgroundColor: '#eee' }} />
            )}
            <Card.Body>
                <Card.Title>{department_name}</Card.Title>
                <Card.Text>
                    <strong>Department Name:</strong> {department_name} <br />
                    <strong>Department Index:</strong> {department_Index} <br />
                    <strong>Faculties Id:</strong> {faculties_id} <br />
                    <strong>Description:</strong> {description} <br />
                </Card.Text>
                <div className="d-flex justify-content-end gap-2 mt-3">
                    <Button
                        size="sm"
                        onClick={onEdit}
                    >
                        Edit
                    </Button>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}