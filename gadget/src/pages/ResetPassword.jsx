import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      setError('No account found. Please register first!');
      return;
    }

    if (user.email !== email) {
      setError('Email does not match our records!');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    user.password = newPassword;
    localStorage.setItem('user', JSON.stringify(user));
    
    setSuccess('Password reset successful! Redirecting to login...');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Reset Password</h1>
        <p style={{color: '#666', marginBottom: '1.5rem'}}>Enter your email and new password</p>
        <form onSubmit={handleSubmit}>
          <input 
            placeholder="Email" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            placeholder="New Password" 
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input 
            placeholder="Confirm Password" 
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
        <p>Remember your password? <a href="/login">Back to Login</a></p>
      </div>
    </div>
  );
}
