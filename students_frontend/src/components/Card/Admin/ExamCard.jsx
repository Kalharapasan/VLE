import { Card, Button } from 'react-bootstrap';

export default function ExamCard({ exam, onEdit, onDelete }) {
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <Card.Title>{exam.exam_name}</Card.Title>
                <Card.Text>
                    <strong>Exam Index:</strong> {exam.exam_Index} <br />
                    <strong>Start Date:</strong> {new Date(exam.exam_start_date).toLocaleDateString()} <br />
                    <strong>End Date:</strong> {new Date(exam.exam_end_date).toLocaleDateString()} <br />
                    <strong>Faculty ID:</strong> {exam.faculties_id} <br />
                    <strong>Department ID:</strong> {exam.department_id}
                </Card.Text>
                <div className="d-flex justify-content-end gap-2 mt-3">
                    <Button size="sm" onClick={onEdit}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={onDelete}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
}
