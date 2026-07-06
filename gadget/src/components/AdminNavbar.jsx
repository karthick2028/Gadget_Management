import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-left">
        <div className="admin-logo">
          <span className="admin-logo-icon">⚡</span>
          <span>Admin Panel</span>
        </div>
      </div>
      
      <div className="admin-nav-right">
        <div className="admin-user-info">
          <span className="admin-user-icon">👤</span>
          <span>admin@gadget.com</span>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}