import { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../../Service/Admin/DepartmentService';
import DepartmentForm from '../../Frome/Admin/DepartmentFrome';
import DepartmentCard from '../../Card/Admin/DepartmentCard';

export default function DepartmentTable() {
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [search, setSearch] = useState('');

  const fetchDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res.data);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleCreate = async (data) => {
    await createDepartment(data);
    fetchDepartments();
  };

  const handleUpdate = async (data) => {
    await updateDepartment(selectedDepartment.department_id, data);
    setSelectedDepartment(null);
    fetchDepartments();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this department?')) {
      await deleteDepartment(id);
      fetchDepartments();
    }
  };

  const filtered = departments.filter((d) =>
      d.department_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="container mt-4">
        <h2>Departments</h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button onClick={() => setShowForm(true)}>Add Department</Button>
          <Form.Control
              placeholder="Search department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 300 }}
          />
        </div>

        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Index</th>
            <th>Name</th>
            <th>Faculty</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {filtered.map((dept, idx) => (
              <tr key={dept.department_id}>
                <td>{idx + 1}</td>
                <td>{dept.department_Index}</td>
                <td>{dept.department_name}</td>
                <td>{dept.faculty?.faculty_name}</td>
                <td>
                  <Button
                      size="sm"
                      onClick={() => {
                        setSelectedDepartment(dept);
                        setShowForm(true);
                      }}
                      className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(dept.department_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>

        <div className="row mt-4">
          {filtered.map((dept) => (
              <div className="col-md-4" key={dept.department_id}>
                <DepartmentCard department={dept} />
              </div>
          ))}
        </div>

        <DepartmentForm
            show={showForm}
            handleClose={() => {
              setShowForm(false);
              setSelectedDepartment(null);
            }}
            onSubmit={selectedDepartment ? handleUpdate : handleCreate}
            initialData={selectedDepartment}
        />
      </div>
  );
}
