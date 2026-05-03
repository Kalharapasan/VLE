import React, { useEffect, useState } from 'react';
import { getTimeTable, createTimeTable, updateTimeTable, deleteTimeTable } from '../../Service/Teacher/teacherService';
import { Table, Form, Button, Spinner, Badge, Modal, Card, Col, Row } from 'react-bootstrap';
import { FaClock, FaMapMarkerAlt, FaBook, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function TeacherTimetable() {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    day: 'Monday', time: '', subject_name: '', room: '',
  });

  useEffect(() => { fetchTimetable(); }, []);

  const fetchTimetable = async () => {
    try {
      const res = await getTimeTable();
      setTimetable(res.data || []);
    } catch (err) {
      console.error('Error fetching timetable:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRecord) {
        await updateTimeTable(editingRecord.timetable_id, formData);
      } else {
        await createTimeTable(formData);
      }
      setShowForm(false);
      setEditingRecord(null);
      setFormData({ day: 'Monday', time: '', subject_name: '', room: '' });
      fetchTimetable();
    } catch (err) {
      alert('Error saving timetable: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (item) => {
    setEditingRecord(item);
    setFormData({
      day: item.day || 'Monday',
      time: item.time || '',
      subject_name: item.subject_name || '',
      room: item.room || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this timetable entry?')) return;
    try {
      await deleteTimeTable(id);
      fetchTimetable();
    } catch (err) {
      alert('Error deleting entry');
    }
  };

  const groupedByDay = timetable.reduce((acc, item) => {
    const day = item.day || 'Unknown';
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {});

  const sortedDays = Object.keys(groupedByDay).sort(
    (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
  );

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">My Timetable</h3>
        <div>
          <Badge bg="info" pill className="me-2">{timetable.length} Classes</Badge>
          <Button variant="primary" onClick={() => {
            setEditingRecord(null);
            setFormData({ day: 'Monday', time: '', subject_name: '', room: '' });
            setShowForm(true);
          }}>
            <FaPlus className="me-1" /> Add Class
          </Button>
        </div>
      </div>

      {timetable.length === 0 ? (
        <p className="text-muted text-center p-4">No timetable entries found.</p>
      ) : (
        sortedDays.map((day) => (
          <div key={day} className="mb-4">
            <h5 className="mb-3">
              <Badge bg="info" className="me-2">{day}</Badge>
              <span className="text-muted small">{groupedByDay[day].length} classes</span>
            </h5>
            <Row xs={1} md={2} lg={3} className="g-3">
              {groupedByDay[day]
                .sort((a, b) => (a.time || '').localeCompare(b.time || ''))
                .map((item, idx) => (
                  <Col key={item.timetable_id || idx}>
                    <Card className="h-100 shadow-sm border-0 dashboard-card">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <Badge bg="primary" className="badge-pill">
                            <FaClock className="me-1" /> {item.time}
                          </Badge>
                          <div>
                            <Button size="sm" variant="info" className="me-1" onClick={() => handleEdit(item)}>
                              <FaEdit />
                            </Button>
                            <Button size="sm" variant="danger" onClick={() => handleDelete(item.timetable_id)}>
                              <FaTrash />
                            </Button>
                          </div>
                        </div>
                        <Card.Title className="h5">
                          <FaBook className="me-2" />{item.subject_name}
                        </Card.Title>
                        <Card.Text className="text-muted">
                          <FaMapMarkerAlt className="me-2" />{item.room}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        ))
      )}

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingRecord ? 'Edit Class' : 'Add Class to Timetable'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Day</Form.Label>
              <Form.Select name="day" value={formData.day} onChange={handleChange} required>
                {dayOrder.map(d => <option key={d} value={d}>{d}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control name="time" value={formData.time} onChange={handleChange} placeholder="e.g. 9:00 AM - 10:30 AM" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control name="subject_name" value={formData.subject_name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Room</Form.Label>
              <Form.Control name="room" value={formData.room} onChange={handleChange} required />
            </Form.Group>
            <div className="text-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button variant="primary" type="submit">{editingRecord ? 'Update' : 'Add'}</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
