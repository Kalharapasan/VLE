import { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import CourseForm from '../../Frome/Admin/CourseFrome';
import { getCourses, updateCourse, deleteCourse } from '../../Service/Admin/CourseServic';

export default function CourseCard() {
    const [courses, setCourses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

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

    const handleUpdate = async (formData) => {
        try {
            if (selectedCourse) {
                await updateCourse(selectedCourse.course_id, formData);
                fetchCourses();
                setSelectedCourse(null);
                setShowForm(false);
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

    return (
        <div className="container mt-4">
            <h2>Course Cards</h2>

            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {courses.map((course) => (
                    <Col key={course.course_id}>
                        <Card className="mb-4 shadow-sm">
                            {course.img ? (
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:8000/storage/${course.img}`}
                                    alt={course.course_name}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                            ) : (
                                <div style={{ height: '200px', backgroundColor: '#eee' }} />
                            )}
                            <Card.Body>
                                <Card.Title>{course.course_name}</Card.Title>
                                <Card.Text>{course.description}</Card.Text>
                                <div className="d-flex justify-content-end gap-2 mt-3">
                                    <Button
                                        size="sm"
                                        variant="outline-primary"
                                        onClick={() => {
                                            setSelectedCourse(course);
                                            setShowForm(true);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline-danger"
                                        onClick={() => handleDelete(course.course_id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <CourseForm
                show={showForm}
                handleClose={() => {
                    setShowForm(false);
                    setSelectedCourse(null);
                }}
                onSubmit={handleUpdate}
                initialData={selectedCourse}
            />
        </div>
    );
}
