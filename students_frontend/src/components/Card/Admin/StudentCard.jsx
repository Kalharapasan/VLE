import React from 'react';
import { Card } from 'react-bootstrap';

export default function StudentCard({ student }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{student.student_fname} {student.student_lname}</Card.Title>
        <Card.Text>
          <strong>Email:</strong> {student.student_email} <br />
          <strong>NIC:</strong> {student.student_nic}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
