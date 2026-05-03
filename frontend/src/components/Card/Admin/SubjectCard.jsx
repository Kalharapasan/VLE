import { Card, Button } from 'react-bootstrap';

export default function SubjectCard({ subject, onEdit, onDelete }) {
  const {
    subject_name,
    description,
    img,
  } = subject;

  return (
      <Card className="mb-4 shadow-sm">
        {img ? (
            <Card.Img
                variant="top"
                src={`http://localhost:8000/storage/${img}`}
                alt={subject_name}
                style={{ height: '200px', objectFit: 'cover' }}
            />
        ) : (
            <div style={{ height: '200px', backgroundColor: '#eee' }} />
        )}

        <Card.Body>
          <Card.Title>{subject_name}</Card.Title>
          <Card.Text>
            <strong>Description:</strong> {description}
          </Card.Text>
          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button size="sm" onClick={onEdit}>Edit</Button>
            <Button size="sm" variant="danger" onClick={onDelete}>Delete</Button>
          </div>
        </Card.Body>
      </Card>
  );
}
