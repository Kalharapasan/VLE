import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import loginImage from '../../assets/login-image.png';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        index_number: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/authController/register', formData);
            alert('Registered successfully!');
            navigate('/login');
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data);
            } else {
                alert(err.response?.data?.error || 'Registration failed!');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left">
                    <img src={loginImage} alt="Register Illustration" />
                </div>
                <div className="login-right">
                    <h2>Create Account</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input
                            name="index_number"
                            placeholder="Index Number"
                            value={formData.index_number}
                            onChange={handleChange}
                            required
                        />
                        {errors.index_number && <p className="error">{errors.index_number[0]}</p>}

                        <input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className="error">{errors.email[0]}</p>}

                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <p className="error">{errors.password[0]}</p>}

                        <input
                            name="password_confirmation"
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">Register</button>
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
