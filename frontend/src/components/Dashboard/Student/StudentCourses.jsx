import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { getStudentCourses } from '../../Service/Student/studentService';

export default function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getStudentCourses();
      setCourses(res.data || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading courses...</div>;

  return (
    <div className="container mt-4">
      <h3>My Courses</h3>
      {courses.length === 0 ? (
        <p className="text-muted">No courses enrolled yet.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, idx) => (
              <tr key={course.course_id || idx}>
                <td>{idx + 1}</td>
                <td>{course.course_name}</td>
                <td>{course.course_Index}</td>
                <td>{course.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
