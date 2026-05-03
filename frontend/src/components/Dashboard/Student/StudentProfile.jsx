import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { getStudentProfile } from '../../Service/Student/studentService';
import { getStudentProfile as getProfileByIndex } from '../../Service/Student/studentService';

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user?.index_number) {
          console.error('No user index found');
          return;
        }

        const res = await getProfileByIndex(user.index_number);
        setStudent(res.data);
      } catch (err) {
        console.error('Error fetching student profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center p-5">Loading profile...</div>;
  }

  if (!student) {
    return <div className="text-center p-5">Profile not found</div>;
  }

  return (
    <div className="container mt-4">
      <Card className="shadow-sm p-4">
        <h3 className="mb-4">My Profile</h3>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Index Number</Form.Label>
            <Form.Control value={student.student_Index || ''} readOnly />
          </Col>
          <Col md={6}>
            <Form.Label>Email</Form.Label>
            <Form.Control value={student.student_email || ''} readOnly />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>First Name</Form.Label>
            <Form.Control value={student.student_fname || ''} readOnly />
          </Col>
          <Col md={6}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control value={student.student_lname || ''} readOnly />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Birthday</Form.Label>
            <Form.Control value={student.student_birthday ? student.student_birthday.split('T')[0] : ''} readOnly />
          </Col>
          <Col md={6}>
            <Form.Label>NIC</Form.Label>
            <Form.Control value={student.student_nic || ''} readOnly />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Gender</Form.Label>
            <Form.Control value={student.student_gender || ''} readOnly />
          </Col>
        </Row>
      </Card>
    </div>
  );
}
