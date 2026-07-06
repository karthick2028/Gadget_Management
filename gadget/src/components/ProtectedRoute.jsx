import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const adminAuth = localStorage.getItem('adminAuth');
  
  if (!adminAuth) {
    return <Navigate to="/admin/login" replace />;
  }
  
  try {
    const authData = JSON.parse(adminAuth);
    if (authData.role !== 'admin') {
      return <Navigate to="/admin/login" replace />;
    }
  } catch (error) {
    localStorage.removeItem('adminAuth');
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
}