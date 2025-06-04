import { useEffect, useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import SubjectForm from '../../Frome/Admin/SubjectFrome';
import SubjectCard from '../../Card/Admin/SubjectCard';

import {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from '../../Service/Admin/SubjectService.js';

export default function SubjectTable() {
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSubjects = async () => {
    try {
      const res = await getAllSubjects();
      setSubjects(res.data);
    } catch (err) {
      console.error('Error fetching subjects', err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await createSubject(formData);
      fetchSubjects();
    } catch (err) {
      console.error('Error creating subject', err.response?.data || err.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      if (selectedSubject) {
        await updateSubject(selectedSubject.subject_id, formData);
        fetchSubjects();
        setSelectedSubject(null);
      }
    } catch (err) {
      console.error('Error updating subject', err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await deleteSubject(id);
        fetchSubjects();
      } catch (err) {
        console.error('Error deleting subject', err);
      }
    }
  };

  const filteredSubjects = subjects.filter((subject) =>
      subject.subject_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="container mt-4">
        <h2>Subject List</h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button onClick={() => setShowForm(true)}>Add Subject</Button>
          <Form.Control
              type="text"
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '300px' }}
          />
        </div>

        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Subject Index</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {filteredSubjects.map((subject, idx) => (
              <tr key={subject.subject_id}>
                <td>{idx + 1}</td>
                <td>{subject.subject_Index}</td>
                <td>{subject.subject_name}</td>
                <td>{subject.description}</td>
                <td>
                  <Button
                      size="sm"
                      onClick={() => {
                        setSelectedSubject(subject);
                        setShowForm(true);
                      }}
                      className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(subject.subject_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>

        <h4 className="mt-5">Subject</h4>
        <div className="row">
          {filteredSubjects.map((subject) => (
              <div className="col-md-4" key={subject.subject_id}>
                <SubjectCard subject={subject} />
              </div>
          ))}
        </div>

        <SubjectForm
            show={showForm}
            handleClose={() => {
              setShowForm(false);
              setSelectedSubject(null);
            }}
            onSubmit={selectedSubject ? handleUpdate : handleCreate}
            initialData={selectedSubject}
        />
      </div>
  );
}
