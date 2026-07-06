import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('no-padding');
    return () => {
      document.body.classList.remove('no-padding');
    };
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('https://gadget-backend-vy93.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        login(data.user, data.token);
        navigate('/home');
      } else {
        setError(data.message || 'Login failed!');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Make sure backend server is running.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Welcome Back</h1>
        <form onSubmit={handleSubmit}>
          <input 
            placeholder="Email" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            placeholder="Password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-msg">{error}</p>}
        <p>Don't have an account? <button type="button" onClick={() => navigate('/register')} style={{background: 'none', border: 'none', color: '#667eea', textDecoration: 'underline', cursor: 'pointer'}}>Register</button></p>
      </div>
    </div>
  );
}
