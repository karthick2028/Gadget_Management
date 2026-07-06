import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };



  if (!user) return null;

  return (
    <div className="user-profile" ref={dropdownRef}>
      <div 
        className="profile-trigger"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="profile-avatar">
          {user.fullName?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase() || '👤'}
        </div>
        <span className="profile-name">{user.fullName || user.username}</span>
        <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
      </div>

      {dropdownOpen && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <div className="dropdown-avatar">
              {user.fullName?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase() || '👤'}
            </div>
            <div className="dropdown-info">
              <div className="dropdown-name">{user.fullName || user.username}</div>
              <div className="dropdown-email">{user.email}</div>
            </div>
          </div>
          
          <div className="dropdown-divider"></div>
          
          <div className="dropdown-menu">
            <button className="dropdown-item logout" onClick={handleLogout}>
              <span className="dropdown-icon">🚪</span>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}