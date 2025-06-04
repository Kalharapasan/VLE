import { useEffect, useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import ExamForm from '../../Frome/Admin/ExamFrome.jsx';
import ExamCard from '../../Card/Admin/ExamCard';
import {
  getExams,
  createExam,
  updateExam,
  deleteExam,
} from '../../Service/Admin/ExamService.js';

export default function ExamTable() {
  const [exams, setExams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchExams = async () => {
    try {
      const res = await getExams();
      setExams(res.data);
    } catch (err) {
      console.error('Error fetching exams', err);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const buildFormData = (data) => {
    const formData = new FormData();
    formData.append('exam_name', data.exam_name);
    formData.append('exam_start_date', data.exam_start_date);
    formData.append('exam_end_date', data.exam_end_date);
    formData.append('faculties_id', data.faculties_id);
    formData.append('department_id', data.department_id);
    formData.append('_method', 'PUT');
    return formData;
  };

  const handleCreate = async (formData) => {
    try {
      const data = buildFormData(formData);
      await createExam(data);
      fetchExams();
    } catch (err) {
      console.error('Error creating exam', err.response?.data || err.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      if (selectedExam) {
        const data = buildFormData(formData);
        await updateExam(selectedExam.exam_id, data);
        fetchExams();
        setSelectedExam(null);
      }
    } catch (err) {
      console.error('Error updating exam', err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        await deleteExam(id);
        fetchExams();
      } catch (err) {
        console.error('Error deleting exam', err);
      }
    }
  };

  const filteredExams = exams.filter(
      (exam) =>
          exam.exam_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exam.exam_Index?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="container mt-4">
        <h2>Exam List</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button onClick={() => setShowForm(true)}>Add Exam</Button>
          <Form.Control
              type="text"
              placeholder="Search exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '300px' }}
          />
        </div>

        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Exam Index</th>
            <th>Exam Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Department</th>
            <th>Faculties</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {filteredExams.map((exam, idx) => (
              <tr key={exam.exam_id}>
                <td>{idx + 1}</td>
                <td>{exam.exam_Index}</td>
                <td>{exam.exam_name}</td>
                <td>{new Date(exam.exam_start_date).toLocaleDateString()}</td>
                <td>{new Date(exam.exam_end_date).toLocaleDateString()}</td>
                <td>{exam.faculties_id}</td>
                <td>{exam.department_id}</td>
                <td>
                  <Button
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setSelectedExam(exam);
                        setShowForm(true);
                      }}
                  >
                    Edit
                  </Button>
                  <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(exam.exam_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>

        <h4 className="mt-5">Exam </h4>
        <div className="row">
          {filteredExams.map((exam) => (
              <div className="col-md-4" key={exam.exam_id}>
                <ExamCard
                    exam={exam}
                    onEdit={() => {
                      setSelectedExam(exam);
                      setShowForm(true);
                    }}
                    onDelete={() => handleDelete(exam.exam_id)}
                />
              </div>
          ))}
        </div>

        <ExamForm
            show={showForm}
            handleClose={() => {
              setShowForm(false);
              setSelectedExam(null);
            }}
            onSubmit={selectedExam ? handleUpdate : handleCreate}
            initialData={selectedExam}
        />
      </div>
  );
}
