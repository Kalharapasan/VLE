import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DashboardLayoutStudent.css'; // Reuse your admin CSS

export default function DashboardSummaryStudent() {
  const [summary, setSummary] = useState({
    profile: {},
    results: 0,
    timetable: 0,
    notifications: 0,
    certificates: 0,
  });

  const fetchSummary = async () => {
    try {
      const [
        profileRes,
        resultsRes,
        timetableRes,
        notificationsRes,
        certificatesRes
      ] = await Promise.all([
        axios.get('/api/student/profile'),
        axios.get('/api/student/results'),
        axios.get('/api/student/timetable'),
        axios.get('/api/student/notifications'),
        axios.get('/api/student/certificates')
      ]);

      setSummary({
        profile: profileRes.data,
        results: resultsRes.data.length,
        timetable: timetableRes.data.length,
        notifications: notificationsRes.data.length,
        certificates: certificatesRes.data.length
      });
    } catch (error) {
      console.error('Error fetching student dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="summary-cards">
      <div className="summary-card profile-card">
        <h5>🙋‍♂️ My Profile</h5>
        <h2>{summary.profile.name || 'Student'}</h2>
        <p>View personal details</p>
      </div>

      <div className="summary-card result-card">
        <h5>📊 Results</h5>
        <h2>{summary.results}</h2>
        <p>Check subject-wise grades</p>
      </div>

      <div className="summary-card timetable-card">
        <h5>🕒 Timetable</h5>
        <h2>{summary.timetable}</h2>
        <p>See exam schedule</p>
      </div>

      <div className="summary-card notification-card">
        <h5>🔔 Notifications</h5>
        <h2>{summary.notifications}</h2>
        <p>Latest university updates</p>
      </div>

      <div className="summary-card certificate-card">
        <h5>📄 Certificates</h5>
        <h2>{summary.certificates}</h2>
        <p>Download transcripts</p>
      </div>
    </div>
  );
}
