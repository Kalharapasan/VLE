import React, { useEffect, useState } from "react";
import {
  getTeacher,
  updateTeacher,
  getFacultyNameById,
  getDepartmentNameById,
} from "../../Service/Teacher/teacherService";
import { Card, Button, Form, Row, Col } from "react-bootstrap";

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

  useEffect(() => {
    async function fetchData() {
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
          teacher_birthday: t.teacher_birthday
            ? t.teacher_birthday.split("T")[0]
            : "",
          teacher_email: t.teacher_email || "",
          teacher_nic: t.teacher_nic || "",
          teacher_gender: t.teacher_gender || "",
          description: t.description || "",
          faculties_id: t.faculties_id || "",
          faculty_name: facultyName,
          department_id: t.department_id || "",
          department_name: departmentName,
          teacher_img: t.teacher_img
            ? `http://localhost:8000/storage/${t.teacher_img}`
            : "",
        });
        setSelectedFile(null);
        setEditMode(false);
      } catch (err) {
        alert("Error fetching teacher data");
      }
    }
    fetchData();
  }, [teacherId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
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
      window.location.reload();
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

  return (
    <div className="container mt-5">
      <Card className="shadow-sm p-4">
        <div className="text-center mb-3">
          {formData.teacher_img || selectedFile ? (
            <img
              src={selectedFile ? URL.createObjectURL(selectedFile) : formData.teacher_img}
              alt="Profile"
              className="rounded-circle"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
          ) : (
            <div
              className="bg-secondary rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "120px", height: "120px", color: "#fff", fontSize: "1.5rem" }}
            >
              No Image
            </div>
          )}
          {editMode && (
            <div className="mt-2">
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          )}
          <div>{formData.teacher_Index}</div>
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

          <div className="text-end">
            {editMode ? (
              <>
                <Button variant="success" className="me-2" onClick={handleSave}>
                  Save
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => window.location.reload()}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => setEditMode(true)}>
                Edit
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </div>
  );
}
