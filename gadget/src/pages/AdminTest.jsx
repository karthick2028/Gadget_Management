import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';

export default function AdminTest() {
  const { adminToken, isAdminAuthenticated, adminLogin, adminLogout } = useContext(AdminContext);

  const testLogin = () => {
    const result = adminLogin('admin@gadget.com', 'admin123');
    console.log('Login result:', result);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin System Test</h1>
      <p>Token: {adminToken || 'None'}</p>
      <p>Authenticated: {isAdminAuthenticated ? 'Yes' : 'No'}</p>
      <button onClick={testLogin}>Test Login</button>
      <button onClick={adminLogout}>Test Logout</button>
    </div>
  );
}