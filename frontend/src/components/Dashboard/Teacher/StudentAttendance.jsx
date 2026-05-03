import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Spinner, Badge, Modal } from 'react-bootstrap';
import { getStudentAttendance, createStudentAttendance, updateStudentAttendance, deleteStudentAttendance } from '../../Service/Teacher/teacherService';

export default function StudentAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    student_name: '',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    remarks: '',
  });

  useEffect(() => { fetchAttendance(); }, []);

  const fetchAttendance = async () => {
    try {
      const res = await getStudentAttendance();
      setAttendance(res.data || []);
    } catch (err) {
      console.error('Error fetching attendance:', err);
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
        await updateStudentAttendance(editingRecord.id, formData);
      } else {
        await createStudentAttendance(formData);
      }
      setShowForm(false);
      setEditingRecord(null);
      setFormData({ student_name: '', date: new Date().toISOString().split('T')[0], status: 'present', remarks: '' });
      fetchAttendance();
    } catch (err) {
      alert('Error saving attendance: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      student_name: record.student_name || '',
      date: record.date || new Date().toISOString().split('T')[0],
      status: record.status || 'present',
      remarks: record.remarks || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this attendance record?')) return;
    try {
      await deleteStudentAttendance(id);
      fetchAttendance();
    } catch (err) {
      alert('Error deleting record');
    }
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'danger';
      case 'late': return 'warning';
      default: return 'secondary';
    }
  };

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Student Attendance</h3>
        <div>
          <Badge bg="info" pill className="me-2">{attendance.length} Records</Badge>
          <Button variant="primary" onClick={() => { setEditingRecord(null); setFormData({ student_name: '', date: new Date().toISOString().split('T')[0], status: 'present', remarks: '' }); setShowForm(true); }}>
            Add Attendance
          </Button>
        </div>
      </div>

      {attendance.length === 0 ? (
        <p className="text-muted text-center p-4">No attendance records found.</p>
      ) : (
        <Table className="modern-table" striped hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record, idx) => (
              <tr key={record.id || idx}>
                <td>{idx + 1}</td>
                <td className="fw-bold">{record.student_name || 'N/A'}</td>
                <td>{record.date}</td>
                <td>
                  <Badge bg={getBadgeVariant(record.status)} className="badge-pill text-capitalize">
                    {record.status}
                  </Badge>
                </td>
                <td className="text-muted">{record.remarks || '-'}</td>
                <td>
                  <Button size="sm" variant="info" className="me-1" onClick={() => handleEdit(record)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(record.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingRecord ? 'Edit Attendance' : 'Add Attendance'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control name="student_name" value={formData.student_name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Remarks</Form.Label>
              <Form.Control as="textarea" rows={2} name="remarks" value={formData.remarks} onChange={handleChange} />
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
