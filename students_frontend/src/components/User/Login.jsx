import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import loginImage from '../../assets/login-image.png';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/authController/login', {
        email,
        password
      });

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'student') {
        navigate('/student');
      } else if (user.role === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-left">
            <img src={loginImage} alt="Login Illustration" />
          </div>
          <div className="login-right">
            <h2>University Management System</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit">Login</button>
              <p>Don't have an account? <a href="/register">Sign up</a></p>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Login;
