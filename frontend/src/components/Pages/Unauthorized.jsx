import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FaExclamationTriangle, FaHome, FaSignInAlt } from 'react-icons/fa';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center shadow p-4">
            <Card.Body>
              <div className="mb-4" style={{ fontSize: '4rem', color: '#ffc107' }}>
                <FaExclamationTriangle />
              </div>
              <h3 className="mb-3">Access Denied</h3>
              <p className="text-muted mb-4">
                You don't have permission to access this page.
                Please contact your administrator if you believe this is an error.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="primary" onClick={() => navigate('/')}>
                  <FaHome className="me-2" />
                  Go Home
                </Button>
                <Button variant="outline-secondary" onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  navigate('/login');
                }}>
                  <FaSignInAlt className="me-2" />
                  Login as Different User
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
