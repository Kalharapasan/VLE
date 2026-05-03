import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Badge } from 'react-bootstrap';
import { getPayments } from '../../Service/Student/paymentService';

export default function StudentPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalPending, setTotalPending] = useState(0);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await getPayments();
      const data = res.data || [];
      setPayments(data);

      let paid = 0;
      let pending = 0;
      data.forEach(p => {
        if (p.status === 'paid') paid += parseFloat(p.amount) || 0;
        else pending += parseFloat(p.amount) || 0;
      });
      setTotalPaid(paid);
      setTotalPending(pending);
    } catch (err) {
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="text-center p-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h3>My Payments</h3>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-success text-white p-3">
            <h5>Total Paid</h5>
            <h2>${totalPaid.toFixed(2)}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-white p-3">
            <h5>Pending</h5>
            <h2>${totalPending.toFixed(2)}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white p-3">
            <h5>Total Records</h5>
            <h2>{payments.length}</h2>
          </div>
        </div>
      </div>

      {payments.length === 0 ? (
        <p className="text-muted">No payment records found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Payment Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr key={payment.id || idx}>
                <td>{idx + 1}</td>
                <td>{payment.payment_type || 'N/A'}</td>
                <td>${parseFloat(payment.amount || 0).toFixed(2)}</td>
                <td>{payment.payment_date || 'N/A'}</td>
                <td>
                  <Badge bg={payment.status === 'paid' ? 'success' : payment.status === 'pending' ? 'warning' : 'danger'}>
                    {payment.status || 'unknown'}
                  </Badge>
                </td>
                <td>{payment.description || '-'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
