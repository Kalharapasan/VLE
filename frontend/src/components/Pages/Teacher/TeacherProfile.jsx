import React, { useEffect, useState } from "react";
import {
  getTeacher,
  updateTeacher,
  getFacultyNameById,
  getDepartmentNameById,
} from "../../Service/Teacher/teacherService";
import { Card, Button, Form, Row, Col, Spinner, Badge } from "react-bootstrap";

export default function TeacherProfile({ teacherId }) {
  const [formData, setFormData] = useState({
    teacher_Index: "",
    teacher_fname: "",
    teacher_lname: "",
    teacher_birthday: "",
    teacher_email: "",
    teacher_nic: "",
    teacher_gender: "",
    description: "",
    faculties_id: "",
    faculty_name: "",
    department_id: "",
    department_name: "",
    teacher_img: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherData();
  }, [teacherId]);

  const fetchTeacherData = async () => {
    try {
      const res = await getTeacher(teacherId);
      const t = res.data;

      let facultyName = "";
      let departmentName = "";
      if (t.faculties_id) {
        try {
          const facultyRes = await getFacultyNameById(t.faculties_id);
          facultyName = facultyRes.data.faculties_name || "";
        } catch {
          facultyName = "";
        }
      }
      if (t.department_id) {
        try {
          const deptRes = await getDepartmentNameById(t.department_id);
          departmentName = deptRes.data.department_name || "";
        } catch {
          departmentName = "";
        }
      }

      setFormData({
        teacher_Index: t.teacher_Index || "",
        teacher_fname: t.teacher_fname || "",
        teacher_lname: t.teacher_lname || "",
        teacher_birthday: t.teacher_birthday ? t.teacher_birthday.split("T")[0] : "",
        teacher_email: t.teacher_email || "",
        teacher_nic: t.teacher_nic || "",
        teacher_gender: t.teacher_gender || "",
        description: t.description || "",
        faculties_id: t.faculties_id || "",
        faculty_name: facultyName,
        department_id: t.department_id || "",
        department_name: departmentName,
        teacher_img: t.teacher_img ? `http://localhost:8000/storage/${t.teacher_img}` : "",
      });
    } catch (err) {
      alert("Error fetching teacher data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!formData.teacher_email || !formData.faculties_id || !formData.department_id) {
      alert("Please fill all required fields: Email, Faculty, and Department.");
      return;
    }

    const payload = new FormData();
    payload.append("teacher_fname", formData.teacher_fname || "");
    payload.append("teacher_lname", formData.teacher_lname || "");
    payload.append("teacher_birthday", formData.teacher_birthday || "");
    payload.append("teacher_nic", formData.teacher_nic || "");
    payload.append("teacher_gender", formData.teacher_gender || "");
    payload.append("description", formData.description || "");
    payload.append("teacher_email", formData.teacher_email || "");
    payload.append("faculties_id", formData.faculties_id || "");
    payload.append("department_id", formData.department_id || "");

    if (selectedFile) {
      payload.append("teacher_img", selectedFile);
    }

    try {
      await updateTeacher(teacherId, payload);
      setEditMode(false);
      setSelectedFile(null);
      fetchTeacherData();
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData && errorData.errors) {
        const errorMessages = Object.values(errorData.errors).flat().join("\n");
        alert(`Update failed:\n${errorMessages}`);
      } else {
        alert("Update failed: " + (errorData?.message || err.message));
      }
    }
  };

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;

  return (
    <div className="container-fluid mt-4">
      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm border-0 dashboard-card h-100">
            <Card.Body className="text-center">
              {formData.teacher_img || selectedFile ? (
                <img
                  src={selectedFile ? URL.createObjectURL(selectedFile) : formData.teacher_img}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="bg-secondary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: "150px", height: "150px", color: "#fff", fontSize: "2rem" }}
                >
                  {formData.teacher_fname?.[0]}{formData.teacher_lname?.[0]}
                </div>
              )}
              {editMode && (
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mb-3"
                />
              )}
              <h4>{formData.teacher_fname} {formData.teacher_lname}</h4>
              <Badge bg="info" className="me-1">{formData.faculty_name}</Badge>
              <Badge bg="secondary">{formData.department_name}</Badge>
              <div className="mt-3">
                <strong>Index:</strong> {formData.teacher_Index}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm border-0 dashboard-card h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Profile Information</h5>
                {!editMode && (
                  <Button variant="primary" onClick={() => setEditMode(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>

              <Form>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="teacher_fname"
                      value={formData.teacher_fname}
                      onChange={handleChange}
                      readOnly={!editMode}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="teacher_lname"
                      value={formData.teacher_lname}
                      onChange={handleChange}
                      readOnly={!editMode}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name="teacher_birthday"
                      value={formData.teacher_birthday}
                      onChange={handleChange}
                      readOnly={!editMode}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={formData.teacher_email} readOnly />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Label>NIC</Form.Label>
                    <Form.Control
                      name="teacher_nic"
                      value={formData.teacher_nic}
                      onChange={handleChange}
                      readOnly={!editMode}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      name="teacher_gender"
                      value={formData.teacher_gender}
                      onChange={handleChange}
                      readOnly={!editMode}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Label>Faculty</Form.Label>
                    <Form.Control value={formData.faculty_name} readOnly />
                  </Col>
                  <Col>
                    <Form.Label>Department</Form.Label>
                    <Form.Control value={formData.department_name} readOnly />
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    readOnly={!editMode}
                  />
                </Form.Group>

                {editMode && (
                  <div className="text-end">
                    <Button variant="success" className="me-2" onClick={handleSave}>
                      Save Changes
                    </Button>
                    <Button variant="secondary" onClick={() => { setEditMode(false); setSelectedFile(null); }}>
                      Cancel
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
