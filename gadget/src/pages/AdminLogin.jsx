import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('no-padding');
    if (localStorage.getItem('adminToken')) {
      navigate('/admin-dashboard');
    }
    return () => {
      document.body.classList.remove('no-padding');
    };
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@gadgetzone.com' && password === 'admin123') {
      const token = 'admin_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('adminToken', token);
      navigate('/admin-dashboard');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-header">
          <h1>⚡ GadgetZone Admin</h1>
          <p>Secure Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          {error && <div className="error-alert">{error}</div>}
          
          <div className="input-group">
            <label>Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gadgetzone.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>

          <button type="submit" className="admin-btn">
            Sign In to Admin Panel
          </button>
        </form>

        <div className="admin-footer">
          <p>🔒 Authorized Personnel Only</p>
          <p>Use: admin@gadgetzone.com / admin123</p>
          <button 
            type="button" 
            className="back-to-login-btn" 
            onClick={() => navigate('/')}
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}