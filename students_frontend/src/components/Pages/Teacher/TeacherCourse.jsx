import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Sidebar from '../../Dashboard/Teacher/Sidebar';
import { useNavigate } from 'react-router-dom';

const TeacherCourse = () => {
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  const navigate = useNavigate();
  
  // Get logged in teacher ID from localStorage or context
  const teacherId = localStorage.getItem('teacherId'); // Adjust based on your auth setup

  useEffect(() => {
    fetchTeacherCourses();
    fetchAvailableCourses();
  }, [fetchTeacherCourses, fetchAvailableCourses]);

  const fetchTeacherCourses = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/teacherCourse');
      // Filter courses for current teacher
      const teacherSpecificCourses = response.data.filter(
        course => course.teacher_id.toString() === teacherId
      );
      setTeacherCourses(teacherSpecificCourses);
    } catch (err) {
      showAlert('Error fetching teacher courses: ' + err.message, 'danger');
    }
  }, [teacherId]);

  const fetchAvailableCourses = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/courses');
      setCourses(response.data);
    } catch (err) {
      showAlert('Error fetching available courses: ' + err.message, 'danger');
    }
  }, []);

  const handleShowModal = (isEdit = false, course = null) => {
    if (isEdit && course) {
      setIsEditing(true);
      setEditId(course.id);
      setSelectedCourse(course.course_id);
    } else {
      setIsEditing(false);
      setEditId(null);
      setSelectedCourse('');
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourse('');
    setIsEditing(false);
    setEditId(null);
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8000/api/teacherCourse/update/${editId}`, {
          course_id: selectedCourse,
          teacher_id: teacherId
        });
        showAlert('Course updated successfully', 'success');
      } else {
        await axios.post('http://localhost:8000/api/teacherCourse', {
          course_id: selectedCourse,
          teacher_id: teacherId
        });
        showAlert('Course added successfully', 'success');
      }
      handleCloseModal();
      fetchTeacherCourses();
    } catch (error) {
      showAlert('Error saving course', 'danger');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/teacherCourse/${id}`);
      showAlert('Course removed successfully', 'success');
      fetchTeacherCourses();
    } catch (error) {
      showAlert('Error deleting course', 'error');
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid className="p-4">
        {alert.show && (
          <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
            {alert.message}
          </Alert>
        )}

        <Row className="mb-4">
          <Col className="d-flex justify-content-between align-items-center">
            <h2>My Courses</h2>
            <Button variant="primary" onClick={() => handleShowModal()}>
              <FaPlus /> Add New Course
            </Button>
          </Col>
        </Row>

        <Row>
          {teacherCourses.map((course) => (
            <Col key={course.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{course.course?.course_name || 'Course Name'}</Card.Title>
                  <Card.Text>
                    Teacher ID: {course.teacher?.teacher_Index || 'N/A'}<br />
                    Teacher Name: {course.teacher?.teacher_fname || 'N/A'}
                  </Card.Text>
                  <div className="d-flex justify-content-end gap-2">
                    <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(true, course)}>
                      <FaEdit /> Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(course.id)}>
                      <FaTrash /> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? 'Edit Course' : 'Add New Course'}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Select Course</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  required
                >
                  <option value="">Choose a course...</option>
                  {courses.map((course) => (
                    <option key={course.course_id} value={course.course_id}>
                      {course.course_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {isEditing ? 'Update' : 'Add'} Course
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
};

export default TeacherCourse;
