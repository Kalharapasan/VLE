import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Spinner, Badge, Modal, ProgressBar } from 'react-bootstrap';
import { getStudentMarks, createStudentMarks, updateStudentMarks, deleteStudentMarks } from '../../Service/Teacher/teacherService';

export default function StudentMarks() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    student_name: '', subject_name: '', marks: '', grade: '',
  });

  useEffect(() => { fetchMarks(); }, []);

  const fetchMarks = async () => {
    try {
      const res = await getStudentMarks();
      setMarks(res.data || []);
    } catch (err) {
      console.error('Error fetching marks:', err);
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
        await updateStudentMarks(editingRecord.id, formData);
      } else {
        await createStudentMarks(formData);
      }
      setShowForm(false);
      setEditingRecord(null);
      setFormData({ student_name: '', subject_name: '', marks: '', grade: '' });
      fetchMarks();
    } catch (err) {
      alert('Error saving marks: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      student_name: record.student_name || '',
      subject_name: record.subject_name || '',
      marks: record.marks || '',
      grade: record.grade || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this marks record?')) return;
    try {
      await deleteStudentMarks(id);
      fetchMarks();
    } catch (err) {
      alert('Error deleting record');
    }
  };

  const getGradeBadge = (grade) => {
    const variants = {
      'A+': 'success', 'A': 'success', 'A-': 'success',
      'B+': 'primary', 'B': 'primary', 'B-': 'primary',
      'C+': 'info', 'C': 'info', 'C-': 'info',
      'D+': 'warning', 'D': 'warning', 'D-': 'warning',
      'F': 'danger',
    };
    return variants[grade] || 'secondary';
  };

  const getMarksVariant = (marks) => {
    if (marks >= 75) return 'success';
    if (marks >= 60) return 'primary';
    if (marks >= 45) return 'warning';
    return 'danger';
  };

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Student Marks</h3>
        <div>
          <Badge bg="info" pill className="me-2">{marks.length} Records</Badge>
          <Button variant="primary" onClick={() => { setEditingRecord(null); setFormData({ student_name: '', subject_name: '', marks: '', grade: '' }); setShowForm(true); }}>
            Add Marks
          </Button>
        </div>
      </div>
      {marks.length === 0 ? (
        <p className="text-muted text-center p-4">No marks recorded yet.</p>
      ) : (
        <Table className="modern-table" striped hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Progress</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark, idx) => (
              <tr key={mark.id || idx}>
                <td>{idx + 1}</td>
                <td className="fw-bold">{mark.student_name || 'N/A'}</td>
                <td>{mark.subject_name || 'N/A'}</td>
                <td className="fw-bold">{mark.marks}</td>
                <td style={{ minWidth: '150px' }}>
                  <ProgressBar now={mark.marks} max={100} variant={getMarksVariant(mark.marks)} label={`${mark.marks}%`} />
                </td>
                <td>
                  <Badge bg={getGradeBadge(mark.grade)} className="badge-pill">{mark.grade || 'N/A'}</Badge>
                </td>
                <td>
                  <Button size="sm" variant="info" className="me-1" onClick={() => handleEdit(mark)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(mark.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingRecord ? 'Edit Marks' : 'Add Student Marks'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control name="student_name" value={formData.student_name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control name="subject_name" value={formData.subject_name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Marks</Form.Label>
              <Form.Control type="number" name="marks" value={formData.marks} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Control name="grade" value={formData.grade} onChange={handleChange} placeholder="e.g. A, B+, C" />
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
