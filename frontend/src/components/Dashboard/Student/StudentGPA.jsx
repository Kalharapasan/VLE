import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { getStudentGPA, getGPAbyStudentIndex } from '../../Service/Student/gpaService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function StudentGPA() {
  const [gpaData, setGpaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchGPA();
  }, []);

  const fetchGPA = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user?.index_number) {
        console.error('No user index found');
        return;
      }

      const res = await getGPAbyStudentIndex(user.index_number);
      const gpas = res.data ? (Array.isArray(res.data) ? res.data : [res.data]) : [];

      setGpaData(gpas);

      // Prepare chart data
      const chartData = gpas.map((gpa, idx) => ({
        semester: gpa.semester || `Sem ${idx + 1}`,
        gpa: parseFloat(gpa.gpa) || 0,
      }));
      setChartData(chartData);
    } catch (err) {
      console.error('Error fetching GPA:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading GPA data...</div>;

  const calculateCumulativeGPA = () => {
    if (gpaData.length === 0) return 'N/A';
    const total = gpaData.reduce((sum, gpa) => sum + (parseFloat(gpa.gpa) || 0), 0);
    return (total / gpaData.length).toFixed(2);
  };

  return (
    <div className="container mt-4">
      <h3>My GPA</h3>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white p-3">
            <h5>Cumulative GPA</h5>
            <h2>{calculateCumulativeGPA()}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white p-3">
            <h5>Total Semesters</h5>
            <h2>{gpaData.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white p-3">
            <h5>Latest GPA</h5>
            <h2>{gpaData.length > 0 ? parseFloat(gpaData[gpaData.length - 1].gpa).toFixed(2) : 'N/A'}</h2>
          </div>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="card shadow-sm p-3 mb-4">
          <h5>GPA Progress</h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semester" />
              <YAxis domain={[0, 4]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="gpa" stroke="#8884d8" name="GPA" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <h5 className="mt-4">GPA Records</h5>
      {gpaData.length === 0 ? (
        <p className="text-muted">No GPA records found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Semester</th>
              <th>GPA</th>
              <th>Credits</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {gpaData.map((gpa, idx) => (
              <tr key={gpa.id || idx}>
                <td>{idx + 1}</td>
                <td>{gpa.semester || 'N/A'}</td>
                <td>
                  <strong className={parseFloat(gpa.gpa) >= 3.0 ? 'text-success' : parseFloat(gpa.gpa) >= 2.0 ? 'text-warning' : 'text-danger'}>
                    {parseFloat(gpa.gpa).toFixed(2)}
                  </strong>
                </td>
                <td>{gpa.credits || 'N/A'}</td>
                <td>{gpa.year || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
