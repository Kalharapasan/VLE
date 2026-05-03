// src/Card/Admin/TimeTableCard.jsx
import { Card } from 'react-bootstrap';

export default function TimeTableCard({ timetable }) {
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <Card.Title>{timetable.timetable_Index}</Card.Title>
                <Card.Text>
                    <strong>Year:</strong> {timetable.year}<br />
                    <strong>Academic Year:</strong> {timetable.accedamic_year}<br />
                    <strong>Semester:</strong> {timetable.semester}<br />
                    <strong>Faculty ID:</strong> {timetable.faculties_id}<br />
                    <strong>Department ID:</strong> {timetable.department_id}<br />
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
