import { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export default function AdminProvider({ children }) {
  const [adminToken, setAdminToken] = useState(() => {
    try {
      return localStorage.getItem('adminToken');
    } catch {
      return null;
    }
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const adminCredentials = {
    email: 'admin@gadget.com',
    password: 'admin123'
  };

  useEffect(() => {
    if (adminToken) {
      setIsAdminAuthenticated(true);
    }
  }, [adminToken]);

  const adminLogin = (email, password) => {
    if (email === adminCredentials.email && password === adminCredentials.password) {
      const token = 'admin_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
      try {
        localStorage.setItem('adminToken', token);
      } catch (e) {
        console.error('Failed to save admin token:', e);
      }
      setAdminToken(token);
      setIsAdminAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid admin credentials' };
  };

  const adminLogout = () => {
    try {
      localStorage.removeItem('adminToken');
    } catch (e) {
      console.error('Failed to remove admin token:', e);
    }
    setAdminToken(null);
    setIsAdminAuthenticated(false);
  };

  return (
    <AdminContext.Provider value={{ 
      adminToken, 
      isAdminAuthenticated, 
      adminLogin, 
      adminLogout 
    }}>
      {children}
    </AdminContext.Provider>
  );
}