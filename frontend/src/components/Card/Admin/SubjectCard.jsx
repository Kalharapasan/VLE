import { Card, Button } from 'react-bootstrap';
import { resolveStorageUrl } from '../../../utils/storageUrl';

export default function SubjectCard({ subject, onEdit, onDelete }) {
  const {
    subject_name,
    description,
    img,
  } = subject;

    const imageUrl = resolveStorageUrl(img);

    return (
      <Card className="mb-4 shadow-sm">
      {imageUrl ? (
            <Card.Img
                variant="top"
          src={imageUrl}
                alt={subject_name}
                style={{ height: '200px', objectFit: 'cover' }}
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
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
