import { Card, Button } from 'react-bootstrap';

export default function StudentCard({ student, onEdit, onDelete }) {
    const {
        student_fname,
        student_lname,
        student_email,
        student_nic,
        student_birthday,
        student_gender,
        student_img,
        faculty,
        department,
    } = student;

    return (
        <Card className="mb-4 shadow-sm">
            {student_img ? (
                <Card.Img
                    variant="top"
                    src={`http://localhost:8000/storage/${student_img}`}
                    alt={`${student_fname} ${student_lname}`}
                    onError={(e) => {
                        e.target.onerror = null; // Prevents looping
                        e.target.style.display = 'none';
                    }}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
            ) : (
                <img
                    src="https://via.placeholder.com/400x200?text=No+Image"
                    alt="No student"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
            )}
            <Card.Body>
                <Card.Title>{student_fname} {student_lname}</Card.Title>
                <Card.Text>
                    <strong>Email:</strong> {student_email}<br />
                    <strong>NIC:</strong> {student_nic}<br />
                    <strong>Birthday:</strong> {student_birthday}<br />
                    <strong>Gender:</strong> {student_gender}<br />
                    <strong>Faculty:</strong> {faculty?.faculty_name || 'N/A'}<br />
                    <strong>Department:</strong> {department?.department_name || 'N/A'}
                </Card.Text>
                <div className="d-flex justify-content-end gap-2 mt-3">
                    <Button size="sm" onClick={onEdit}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={onDelete}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
}
