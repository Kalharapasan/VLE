import { Card } from 'react-bootstrap';

export default function StudentCard({ student }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{student.student_fname} {student.student_lname}</Card.Title>
        <Card.Text>
          <strong>Email:</strong> {student.student_email}<br />
          <strong>NIC:</strong> {student.student_nic}<br />
          <strong>Gender:</strong> {student.student_gender}<br />
          <strong>Birthday:</strong> {student.student_birthday}<br />
          <strong>Faculty:</strong> {student.faculties_id}<br />
          <strong>Department:</strong> {student.department_id}
        </Card.Text>
        {student.studen_img && (
          <Card.Img variant="bottom" src={`http://localhost:8000/storage/${student.studen_img}`} style={{ maxHeight: '200px', objectFit: 'cover' }} />
        )}
      </Card.Body>
    </Card>
  );
}
