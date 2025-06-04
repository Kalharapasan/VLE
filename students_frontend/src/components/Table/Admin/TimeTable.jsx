// src/Table/Admin/TimeTableTable.jsx
import { useEffect, useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import TimeTableForm from '../../Frome/Admin/TimeTableFrome.jsx';
import TimeTableCard from '../../Card/Admin/TitmeTableCard.jsx';
import {
  getTimeTables,
  createTimeTable,
  updateTimeTable,
  deleteTimeTable,
} from '../../Service/Admin/TimeTableService.js';

export default function TimeTableTable() {
  const [timetables, setTimetables] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const res = await getTimeTables();
      setTimetables(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (data) => {
    await createTimeTable(data);
    fetchData();
  };

  const handleUpdate = async (data) => {
    if (selected) {
      await updateTimeTable(selected.timetable_id, data);
      setSelected(null);
      fetchData();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this timetable?')) {
      await deleteTimeTable(id);
      fetchData();
    }
  };

  const filtered = timetables.filter(t =>
      `${t.timetable_Index} ${t.year} ${t.accedamic_year}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="container mt-4">
        <h2>TimeTables</h2>
        <div className="d-flex justify-content-between mb-3">
          <Button onClick={() => setShowForm(true)}>Add TimeTable</Button>
          <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '300px' }}
          />
        </div>

        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Index</th>
            <th>Year</th>
            <th>Academic</th>
            <th>Semester</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {filtered.map((tt, i) => (
              <tr key={tt.timetable_id}>
                <td>{i + 1}</td>
                <td>{tt.timetable_Index}</td>
                <td>{tt.year}</td>
                <td>{tt.accedamic_year}</td>
                <td>{tt.semester}</td>
                <td>
                  <Button size="sm" className="me-2" onClick={() => { setSelected(tt); setShowForm(true); }}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(tt.timetable_id)}>Delete</Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>

        <h4 className="mt-5">Time Table</h4>
        <div className="row">
          {filtered.map(tt => (
              <div className="col-md-4" key={tt.timetable_id}>
                <TimeTableCard timetable={tt} />
              </div>
          ))}
        </div>

        <TimeTableForm
            show={showForm}
            handleClose={() => {
              setShowForm(false);
              setSelected(null);
            }}
            onSubmit={selected ? handleUpdate : handleCreate}
            initialData={selected}
        />
      </div>
  );
}
