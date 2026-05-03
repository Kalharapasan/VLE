import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

export default function StudentNotifications() {
  const [notifications] = useState([
    { id: 1, message: 'Welcome to the VLE System!', date: '2024-01-15', read: false },
    { id: 2, message: 'Your course registration is confirmed.', date: '2024-01-16', read: false },
    { id: 3, message: 'Exam timetable has been published.', date: '2024-01-20', read: true },
  ]);

  return (
    <div className="container mt-4">
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p className="text-muted">No notifications yet.</p>
      ) : (
        <ListGroup>
          {notifications.map((notif) => (
            <ListGroup.Item
              key={notif.id}
              className={notif.read ? '' : 'fw-bold'}
            >
              <div className="d-flex justify-content-between">
                <span>{notif.message}</span>
                <small className="text-muted">{notif.date}</small>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
