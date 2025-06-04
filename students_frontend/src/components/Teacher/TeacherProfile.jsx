import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherProfile = () => {
    const [profile, setProfile] = useState({});
    const [form, setForm] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/teacher/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setProfile(res.data);
                setForm(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setForm(profile);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach(key => formData.append(key, form[key]));
        if (imageFile) formData.append('teacher_img', imageFile);

        try {
            const res = await axios.post('http://localhost:8000/api/teacher/profile?_method=PUT', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("Profile updated successfully!");
            setProfile(res.data.teacher);
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            alert("Failed to update profile.");
        }
    };

    const renderInput = (label, name, type = 'text') => (
        <div className="col-md-6">
            <label className="form-label fw-bold">{label}</label>
            <input
                type={type}
                name={name}
                value={form[name] || ''}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`form-control ${!isEditing ? 'form-control-plaintext border-0 bg-light' : ''}`}
            />
        </div>
    );

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit} className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Teacher Profile</h5>
                </div>

                <div className="card-body p-4">
                    <div className="row g-4">
                        {/* Left Column - Profile Image */}
                        <div className="col-md-4 text-center">
                            <label className="form-label fw-bold">Profile Image</label>
                            <div className="mt-2 d-flex flex-column align-items-center">
                                <img
                                    src={`http://localhost:8000/storage/teacher_images/${profile.teacher_img}`}
                                    alt="Profile"
                                    className="rounded-circle border border-3 border-primary mb-3"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150x150/007bff/ffffff?text=Teacher';
                                    }}
                                />
                                {isEditing && (
                                    <input type="file" onChange={handleFileChange} className="form-control mt-2" />
                                )}
                            </div>
                        </div>

                        {/* Right Column - Profile Details */}
                        <div className="col-md-8">
                            <div className="row g-3">
                                {renderInput("First Name", "teacher_fname")}
                                {renderInput("Last Name", "teacher_lname")}
                                {renderInput("Teacher Index", "teacher_Index")}
                                {renderInput("Email", "teacher_email", "email")}
                                {renderInput("Birthday", "teacher_birthday", "date")}
                                {renderInput("NIC", "teacher_nic")}
                                {renderInput("Gender", "teacher_gender")}
                                {renderInput("Faculty ID", "faculties_id")}
                                {renderInput("Department ID", "department_id")}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center justify-content-md-end mt-4">
                        {isEditing ? (
                            <>
                                <button type="button" className="btn btn-secondary me-2" onClick={() => setIsEditing(false)}>Cancel</button>
                                <button type="submit" className="btn btn-success">
                                    <i className="bi bi-check-circle me-2"></i>
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <button type="button" className="btn btn-primary btn-lg px-4" onClick={handleEditToggle}>
                                <i className="bi bi-pencil-square me-2"></i>
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TeacherProfile;
