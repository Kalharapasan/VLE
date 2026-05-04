import { useEffect, useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import TimeTableForm from '../../Form/Admin/TimeTableForm';
import {
  getTimeTables,
  createTimeTable,
  updateTimeTable,
  deleteTimeTable,
} from '../../Service/Admin/TimeTableService';
import { Card, Col, Row } from 'react-bootstrap';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function TimeTable() {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  const fetchEntries = async () => {
    try {
      const res = await getTimeTables();
      setEntries(res.data || []);
    } catch (err) {
      console.error('Error fetching timetable:', err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await createTimeTable(formData);
      fetchEntries();
    } catch (err) {
      console.error('Error creating timetable entry:', err.response?.data || err.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      if (selectedEntry) {
        await updateTimeTable(selectedEntry.timetable_id, formData);
        fetchEntries();
        setSelectedEntry(null);
      }
    } catch (err) {
      console.error('Error updating timetable:', err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await deleteTimeTable(id);
      fetchEntries();
    } catch (err) {
      console.error('Error deleting timetable entry:', err);
    }
  };

  const filteredEntries = entries.filter((entry) =>
    (entry.subject_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (entry.room || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedByDay = filteredEntries.reduce((acc, entry) => {
    const day = entry.day || 'Unknown';
    if (!acc[day]) acc[day] = [];
    acc[day].push(entry);
    return acc;
  }, {});

  const sortedDays = Object.keys(groupedByDay).sort(
    (a, b) => days.indexOf(a) - days.indexOf(b)
  );

  return (
    <div className="container mt-4">
      <h2>Timetable Management</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <Button
            variant={viewMode === 'table' ? 'primary' : 'outline-primary'}
            onClick={() => setViewMode('table')}
          >
            Table View
          </Button>
          <Button
            variant={viewMode === 'card' ? 'primary' : 'outline-primary'}
            onClick={() => setViewMode('card')}
          >
            Card View
          </Button>
        </div>
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Search by subject or room..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '250px' }}
          />
          <Button onClick={() => { setSelectedEntry(null); setShowForm(true); }}>Add Entry</Button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Room</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry, idx) => (
              <tr key={entry.timetable_id || idx}>
                <td>{idx + 1}</td>
                <td>{entry.day}</td>
                <td>{entry.time}</td>
                <td>{entry.subject_name}</td>
                <td>{entry.room}</td>
                <td>
                  <Button
                    size="sm"
                    className="me-1"
                    onClick={() => {
                      setSelectedEntry(entry);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(entry.timetable_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        sortedDays.map((day) => (
          <div key={day} className="mb-4">
            <h5>{day}</h5>
            <Row xs={1} md={2} lg={3} className="g-3">
              {groupedByDay[day]
                .sort((a, b) => (a.time || '').localeCompare(b.time || ''))
                .map((entry, idx) => (
                  <Col key={entry.timetable_id || idx}>
                    <Card className="h-100 shadow-sm">
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                          <Badge bg="primary">{entry.time}</Badge>
                          <div>
                            <Button
                              size="sm"
                              variant="info"
                              className="me-1"
                              onClick={() => {
                                setSelectedEntry(entry);
                                setShowForm(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleDelete(entry.timetable_id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                        <Card.Title className="mt-2">{entry.subject_name}</Card.Title>
                        <Card.Text>Room: {entry.room}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        ))
      )}

      <TimeTableForm
        show={showForm}
        handleClose={() => {
          setShowForm(false);
          setSelectedEntry(null);
        }}
        onSubmit={selectedEntry ? handleUpdate : handleCreate}
        initialData={selectedEntry}
      />
    </div>
  );
}
