import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Extract token from query parameters
  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    if (!token) {
      setMessage('Invalid or missing reset token');
      // Redirect if no token
      navigate('/login');
    }
  }, [token, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await fetch('http://localhost:8090/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.text();

      if (response.ok) {
        setMessage('Password reset successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(data || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!isConfirmPasswordVisible);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Reset Password</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleResetPassword} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Password</label>
          <div style={styles.passwordWrapper}>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              style={styles.input}
            />
            <span onClick={togglePasswordVisibility} style={styles.icon}>
              {isPasswordVisible ? '🙈' : '👁️'}
            </span>
          </div>
        </div>
        <div style={styles.inputGroup}>
          <label>Confirm Password</label>
          <div style={styles.passwordWrapper}>
            <input
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              style={styles.input}
            />
            <span onClick={toggleConfirmPasswordVisibility} style={styles.icon}>
              {isConfirmPasswordVisible ? '🙈' : '👁️'}
            </span>
          </div>
        </div>
        <button type="submit" style={styles.button}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  message: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  passwordWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  icon: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#333',
  },
  button: {
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    background: '#007BFF',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ResetPassword;
