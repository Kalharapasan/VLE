import React, { useEffect, useState } from 'react';
import { getStudentExams, getStudentMarks } from '../../Service/Student/studentService';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar,
} from 'recharts';

export default function StudentDashboardCharts() {
  const [examData, setExamData] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examsRes, marksRes] = await Promise.all([
          getStudentExams(),
          getStudentMarks(),
        ]);

        // Process exam data for chart
        const exams = examsRes.data || [];
        const examChartData = exams.map((exam, idx) => ({
          name: `Exam ${idx + 1}`,
          date: exam.exam_date || 'N/A',
        }));

        // Process marks data for chart
        const marks = marksRes.data || [];
        const marksChartData = marks.map((mark, idx) => ({
          name: mark.subject_name || `Subject ${idx + 1}`,
          marks: mark.marks || 0,
          grade: mark.grade || 'N/A',
        }));

        setExamData(examChartData);
        setMarksData(marksChartData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading charts...</div>;
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-3">
            <h5 className="mb-3">My Exam Scores</h5>
            {marksData.length === 0 ? (
              <p className="text-muted">No exam data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marksData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="marks" fill="#8884d8" name="Marks" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-3">
            <h5 className="mb-3">Exams Overview</h5>
            {examData.length === 0 ? (
              <p className="text-muted">No exams scheduled.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={examData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="date" fill="#82ca9d" name="Exam Date" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
