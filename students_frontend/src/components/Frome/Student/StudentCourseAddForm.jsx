import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function StudentCourseAddForm({ show, handleClose, onSubmit }) {
  const [subjectId, setSubjectId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch subjects
    fetch('/api/subjects')
      .then(res => res.json())
      .then(data => setSubjects(data))
      .catch(err => console.error('Error loading subjects:', err));

    // Fetch courses
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error('Error loading courses:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      subject_id: subjectId,
      course_id: courseId
    };
    onSubmit(formData); // Send data to parent component
    handleClose(); // Close modal
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Subject-Course</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="formSubject">
            <Form.Label>Select Subject</Form.Label>
            <Form.Select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} required>
              <option value="">-- Select Subject --</option>
              {subjects.map((subj) => (
                <option key={subj.subject_id} value={subj.subject_id}>
                  {subj.subject_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formCourse" className="mt-3">
            <Form.Label>Select Course</Form.Label>
            <Form.Select value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
              <option value="">-- Select Course --</option>
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" type="submit">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
