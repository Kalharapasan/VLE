import { useEffect, useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import AdminForm from '../../Frome/Admin/AdminForm';
import AdminCard from '../../Card/Admin/AdminCard';
import {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from '../../Service/Admin/AdminService.js';

export default function AdminTable() {
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAdmins = async () => {
    try {
      const res = await getAdmins();
      setAdmins(res.data);
    } catch (err) {
      console.error('Error fetching admins:', err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await createAdmin(formData);
      fetchAdmins();
    } catch (err) {
      console.error('Error creating admin:', err.response?.data || err.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      if (selectedAdmin) {
        await updateAdmin(selectedAdmin.admin_id, formData);
        fetchAdmins();
        setSelectedAdmin(null);
      }
    } catch (err) {
      console.error('Error updating admin:', err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await deleteAdmin(id);
        fetchAdmins();
      } catch (err) {
        console.error('Error deleting admin:', err);
      }
    }
  };

  const filteredAdmins = admins.filter((admin) =>
      `${admin.admin_fname} ${admin.admin_lname} ${admin.admin_email}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
  );

  return (
      <div className="container mt-4">
        <h2>Admin List</h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button onClick={() => setShowForm(true)}>Add Admin</Button>
          <Form.Control
              type="text"
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '300px' }}
          />
        </div>

        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Admin Index</th>
            <th>Name</th>
            <th>Email</th>
            <th>NIC</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {filteredAdmins.map((admin, idx) => (
              <tr key={admin.admin_id}>
                <td>{idx + 1}</td>
                <td>{admin.admin_Index}</td>
                <td>{admin.admin_fname} {admin.admin_lname}</td>
                <td>{admin.admin_email}</td>
                <td>{admin.admin_nic}</td>
                <td>
                  <Button
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setSelectedAdmin(admin);
                        setShowForm(true);
                      }}
                  >
                    Edit
                  </Button>
                  <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(admin.admin_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>

        <h4 className="mt-5">Admin </h4>
        <div className="row">
          {filteredAdmins.map((admin) => (
              <div className="col-md-4" key={admin.admin_id}>
                <AdminCard admin={admin} />
              </div>
          ))}
        </div>

        <AdminForm
            show={showForm}
            handleClose={() => {
              setShowForm(false);
              setSelectedAdmin(null);
            }}
            onSubmit={selectedAdmin ? handleUpdate : handleCreate}
            initialData={selectedAdmin}
        />
      </div>
  );
}
