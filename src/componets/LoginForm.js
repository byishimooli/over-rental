import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Form.css';
import signupImage from '../componets/images/p1.jpg';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [responseClass, setResponseClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    let formValid = true;
    const newErrors = { email: '', password: '' };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      formValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      formValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      formValid = false;
    }

    setErrors(newErrors);
    return formValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setResponseMessage('');
    setResponseClass('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8090/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.status === 200) {
        const { token } = data;
        if (token) {
          localStorage.setItem('authToken', token);

          try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join('')
            );

            const user = JSON.parse(jsonPayload);

            localStorage.setItem(
              'loginedUser',
              JSON.stringify({ email: user.sub, role: user.role })
            );

            const redirectPage =
              user.role === 'ADMIN' ? '/AdminDashboard' : '/home';
            window.location.href = redirectPage;
          } catch (error) {
            console.error('Token decoding failed:', error);
            setResponseMessage('Invalid token received.');
            setResponseClass('error');
          }
        } else {
          setResponseMessage('Login failed. Please try again.');
          setResponseClass('error');
        }
      } else {
        setResponseMessage(data.message || 'Invalid email or password.');
        setResponseClass('error');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setResponseMessage('An error occurred. Please try again later.');
      setResponseClass('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="image-section">
        <img src={signupImage} alt="Login" className="signup-image" />
      </div>
      <div className="form-box">
        <button
          type="button"
          className="close-btn"
          onClick={() => navigate('/')}
        >
          ×
        </button>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={`input-container ${errors.email ? 'error' : ''}`}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className={`input-container ${errors.password ? 'error' : ''}`}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>
          <p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          <button type="submit" className="form-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
        {responseMessage && (
          <p className={`response-message ${responseClass}`}>
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
