import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:5173/forgot-password', { email });
      setMessage('Password reset link sent successfully!');
    } catch (error) {
      console.error(error); // Log the error for debugging
      setMessage('Error sending reset link. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Send Reset Link</button>
      <p>{message}</p>
      <p>Remember your password? <span onClick={() => navigate('/login')}>Login</span></p>
    </div>
  );
};

export default ForgotPassword;
