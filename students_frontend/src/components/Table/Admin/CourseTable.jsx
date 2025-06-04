import { useEffect, useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import CourseForm from '../../Frome/Admin/CourseFrome';
import CourseCards from '../../Card/Admin/CourseCards';
import {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
} from '../../Service/Admin/CourseServic';

export default function CourseTable() {
    const [courses, setCourses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCourses = async () => {
        try {
            const res = await getCourses();
            setCourses(res.data);
        } catch (err) {
            console.error('Error fetching courses:', err);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleCreate = async (formData) => {
        try {
            await createCourse(formData);
            fetchCourses();
        } catch (err) {
            console.error('Error creating course:', err.response?.data || err.message);
        }
    };

    const handleUpdate = async (formData) => {
        try {
            if (selectedCourse) {
                await updateCourse(selectedCourse.course_id, formData);
                fetchCourses();
                setSelectedCourse(null);
            }
        } catch (err) {
            console.error('Error updating course:', err.response?.data || err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await deleteCourse(id);
                fetchCourses();
            } catch (err) {
                console.error('Error deleting course:', err);
            }
        }
    };

    const filteredCourses = courses.filter((course) =>
        course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2>Course List</h2>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button onClick={() => setShowForm(true)}>Add Course</Button>
                <Form.Control
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '300px' }}
                />
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Course Index</th>
                    <th>Course Name</th>
                    <th>Description</th>
                    <th>Faculty ID</th>
                    <th>Department ID</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredCourses.map((course, idx) => (
                    <tr key={course.course_id}>
                        <td>{idx + 1}</td>
                        <td>{course.course_Index}</td>
                        <td>{course.course_name}</td>
                        <td>{course.description}</td>
                        <td>{course.faculties_id}</td>
                        <td>{course.department_id}</td>
                        <td>
                            <Button
                                size="sm"
                                className="me-2"
                                onClick={() => {
                                    setSelectedCourse(course);
                                    setShowForm(true);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleDelete(course.course_id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <h4 className="mt-5">Course </h4>
            <CourseCards courses={filteredCourses} />

            <CourseForm
                show={showForm}
                handleClose={() => {
                    setShowForm(false);
                    setSelectedCourse(null);
                }}
                onSubmit={selectedCourse ? handleUpdate : handleCreate}
                initialData={selectedCourse}
            />
        </div>
    );
}
