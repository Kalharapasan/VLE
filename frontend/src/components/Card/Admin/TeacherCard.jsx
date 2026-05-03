import { Card, Button } from 'react-bootstrap';

export default function TeacherCard({ teacher, onEdit, onDelete }) {
    const {
        teacher_fname,
        teacher_lname,
        teacher_email,
        teacher_nic,
        teacher_birthday,
        teacher_gender,
        faculties_id,
        department_id,
        teacher_img,
    } = teacher;

    return (
        <Card className="mb-4 shadow-sm">
            {teacher_img ? (
                <Card.Img
                    variant="top"
                    src={`http://localhost:8000/storage/${teacher_img}`}
                    alt={`${teacher_fname} ${teacher_lname}`}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
            ) : (
                <div style={{ height: '200px', backgroundColor: '#eee' }} />
            )}
            <Card.Body>
                <Card.Title>{teacher_fname} {teacher_lname}</Card.Title>
                <Card.Text>
                    <strong>Email:</strong> {teacher_email} <br />
                    <strong>NIC:</strong> {teacher_nic} <br />
                    <strong>Birthday:</strong> {teacher_birthday} <br />
                    <strong>Gender:</strong> {teacher_gender} <br />
                    <strong>Faculty ID:</strong> {faculties_id} <br />
                    <strong>Department ID:</strong> {department_id}
                </Card.Text>
                <div className="d-flex justify-content-end gap-2 mt-3">
                    <Button size="sm" onClick={onEdit}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={onDelete}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
}
