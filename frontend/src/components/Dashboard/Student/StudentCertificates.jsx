import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

export default function StudentCertificates() {
  const [certificates] = useState([
    { id: 1, name: 'Course Completion Certificate', date: '2024-01-15', status: 'Available' },
    { id: 2, name: 'Semester Grade Report', date: '2024-01-20', status: 'Available' },
    { id: 3, name: 'Degree Certificate', date: '-', status: 'Pending' },
  ]);

  const handleDownload = (cert) => {
    alert(`Downloading ${cert.name}...`);
  };

  return (
    <div className="container mt-4">
      <h3>Certificates</h3>
      {certificates.length === 0 ? (
        <p className="text-muted">No certificates available.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Certificate Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert, idx) => (
              <tr key={cert.id}>
                <td>{idx + 1}</td>
                <td>{cert.name}</td>
                <td>{cert.date}</td>
                <td>{cert.status}</td>
                <td>
                  {cert.status === 'Available' ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleDownload(cert)}
                    >
                      Download
                    </Button>
                  ) : (
                    <span className="text-muted">Not available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
