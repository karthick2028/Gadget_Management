import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('no-padding');
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin-login');
    }
    return () => {
      document.body.classList.remove('no-padding');
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/home');
  };

  const stats = [
    { title: 'Total Users', value: '1,234', icon: '👥', color: '#007bff' },
    { title: 'Total Orders', value: '856', icon: '📦', color: '#28a745' },
    { title: 'Total Products', value: '28', icon: '📱', color: '#6f42c1' },
    { title: 'Revenue', value: '₹2,45,999', icon: '💰', color: '#fd7e14' },
    { title: 'Pending Orders', value: '23', icon: '⏳', color: '#dc3545' }
  ];

  const [products, setProducts] = useState([]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://gadget-backend-vy93.onrender.com/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        console.log('Attempting to delete product:', productId);
        const response = await fetch(`https://gadget-backend-vy93.onrender.com/api/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Delete response status:', response.status);
        const responseText = await response.text();
        console.log('Delete response:', responseText);
        
        if (response.ok) {
          setProducts(products.filter(p => p._id !== productId));
          alert('Product deleted successfully!');
        } else {
          console.error('Delete failed:', responseText);
          alert(`Error deleting product: ${response.status} - ${responseText}`);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert(`Network error: ${error.message}`);
      }
    }
  };

  const [orders, setOrders] = useState([
    { id: 1, user: 'John Doe', items: 'iPhone 15 Pro', price: 134900, address: '123 Main St, Mumbai', status: 'Pending', date: '2024-01-15', timeline: ['Order Placed'] },
    { id: 2, user: 'Jane Smith', items: 'MacBook Pro M3', price: 199900, address: '456 Park Ave, Delhi', status: 'Shipped', date: '2024-01-14', timeline: ['Order Placed', 'Packed', 'Shipped'] },
    { id: 3, user: 'Mike Johnson', items: 'AirPods Pro', price: 24900, address: '789 Oak Rd, Bangalore', status: 'Delivered', date: '2024-01-13', timeline: ['Order Placed', 'Packed', 'Shipped', 'Delivered'] }
  ]);

  const [categories, setCategories] = useState([]);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://gadget-backend-vy93.onrender.com/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Toggle category status
  const toggleCategoryStatus = async (categoryId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Disabled' : 'Active';
      const response = await fetch(`https://gadget-backend-vy93.onrender.com/api/categories/${categoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        fetchCategories();
        alert(`Category ${newStatus.toLowerCase()} successfully!`);
      } else {
        alert('Error updating category status');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating category status');
    }
  };

  // Delete category
  const deleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`https://gadget-backend-vy93.onrender.com/api/categories/${categoryId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          fetchCategories();
          alert('Category deleted successfully!');
        } else {
          alert('Error deleting category');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting category');
      }
    }
  };

  const renderOverview = () => (
    <div className="overview-content">
      <h2>📊 Dashboard Overview</h2>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{color: stat.color}}>{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>📈 Sales Chart</h3>
          <div className="chart-bars">
            <div className="bar" style={{height: '60%'}} data-value="₹45K"></div>
            <div className="bar" style={{height: '80%'}} data-value="₹62K"></div>
            <div className="bar" style={{height: '45%'}} data-value="₹38K"></div>
            <div className="bar" style={{height: '90%'}} data-value="₹78K"></div>
            <div className="bar" style={{height: '70%'}} data-value="₹55K"></div>
          </div>
          <div className="chart-labels">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
          </div>
        </div>

        <div className="activity-card">
          <h3>🔔 Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">📦 New order from John Doe - 2 mins ago</div>
            <div className="activity-item">📱 Product updated: iPhone 15 Pro - 5 mins ago</div>
            <div className="activity-item">👤 New user registered: Jane Smith - 10 mins ago</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="products-content">
      <div className="section-header">
        <h2>📱 Product Management</h2>
        <button className="action-btn primary" onClick={() => navigate('/add-product')}>+ Add Product</button>
      </div>

      <div className="admin-categories-section">
        <h3>📂 Filter by Category</h3>
        <div className="admin-categories-grid">
          <div 
            className={`admin-category-card ${!filterCategory ? 'active' : ''}`}
            onClick={() => setFilterCategory('')}
          >
            <span className="admin-category-icon">🛍️</span>
            <h4>All Products</h4>
          </div>
          {categories.filter(cat => cat.status === 'Active').map(cat => (
            <div 
              key={cat.id}
              className={`admin-category-card ${filterCategory === cat.name ? 'active' : ''}`}
              onClick={() => setFilterCategory(cat.name)}
            >
              <span className="admin-category-icon">{cat.icon}</span>
              <h4>{cat.name}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="filters">
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
        </select>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Offer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .filter(p => !filterCategory || p.category === filterCategory)
              .map(product => (
              <tr key={product._id}>
                <td>
                  {product.image ? (
                    <img src={product.image.startsWith('http') ? product.image : `https://gadget-backend-vy93.onrender.com/uploads/${product.image}`} alt={product.name} className="product-thumb" />
                  ) : (
                    <div className="no-image">📱</div>
                  )}
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price.toLocaleString()}</td>
                <td>{product.stock}</td>
                <td>{product.offer}%</td>
                <td>
                  <button className="table-btn edit" onClick={() => setEditingProduct(product)}>✏️ Edit</button>
                  <button className="table-btn delete" onClick={() => deleteProduct(product._id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(showAddProduct || editingProduct) && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <form className="product-form" onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              
              try {
                const url = editingProduct 
                  ? `https://gadget-backend-vy93.onrender.com/api/products/${editingProduct._id}`
                  : 'https://gadget-backend-vy93.onrender.com/api/products';
                const method = editingProduct ? 'PUT' : 'POST';
                
                console.log('Submitting to:', url, 'Method:', method);
                console.log('Product ID:', editingProduct?._id);
                
                const response = await fetch(url, {
                  method: method,
                  body: formData
                });
                
                const responseText = await response.text();
                console.log('Response:', response.status, responseText);
                
                if (response.ok) {
                  fetchProducts();
                  setShowAddProduct(false);
                  setEditingProduct(null);
                  alert(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
                } else {
                  console.error('Server error:', responseText);
                  alert(`Error saving product: ${response.status} - ${responseText}`);
                }
              } catch (error) {
                console.error('Network error:', error);
                alert(`Network error: ${error.message}`);
              }
            }}>
              <input 
                type="text" 
                name="name" 
                placeholder="Product Name" 
                defaultValue={editingProduct?.name || ''}
                required 
              />
              <select name="category" defaultValue={editingProduct?.category || ''} required>
                <option value="">Select Category</option>
                {categories.filter(cat => cat.status === 'Active').map(cat => 
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                )}
              </select>
              <input 
                type="number" 
                name="price" 
                placeholder="Price" 
                defaultValue={editingProduct?.price || ''}
                required 
              />
              <input 
                type="number" 
                name="stock" 
                placeholder="Stock" 
                defaultValue={editingProduct?.stock || ''}
                required 
              />
              <input 
                type="number" 
                name="offer" 
                placeholder="Offer %" 
                defaultValue={editingProduct?.offer || ''}
              />
              <textarea 
                name="description" 
                placeholder="Description" 
                rows="3"
                defaultValue={editingProduct?.description || ''}
              ></textarea>
              <input type="file" name="image" accept="image/*" />
              <div className="form-actions">
                <button type="button" onClick={() => {setShowAddProduct(false); setEditingProduct(null);}}>Cancel</button>
                <button type="submit" className="primary">{editingProduct ? 'Update Product' : 'Save Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderOrders = () => {
    if (selectedOrder) {
      return (
        <div className="order-details">
          <div className="profile-header">
            <button className="back-btn" onClick={() => setSelectedOrder(null)}>← Back to Orders</button>
            <h2>📦 Order Details</h2>
          </div>
          <div className="order-info">
            <div className="info-card">
              <h3>Order Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Order ID</label>
                  <span>#{selectedOrder.id}</span>
                </div>
                <div className="info-item">
                  <label>Customer</label>
                  <span>{selectedOrder.user}</span>
                </div>
                <div className="info-item">
                  <label>Items</label>
                  <span>{selectedOrder.items}</span>
                </div>
                <div className="info-item">
                  <label>Amount</label>
                  <span>₹{selectedOrder.price.toLocaleString()}</span>
                </div>
                <div className="info-item">
                  <label>Address</label>
                  <span>{selectedOrder.address}</span>
                </div>
                <div className="info-item">
                  <label>Status</label>
                  <span className={`status ${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</span>
                </div>
                <div className="info-item">
                  <label>Order Date</label>
                  <span>{selectedOrder.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="orders-content">
        <div className="section-header">
          <h2>📦 Order Management</h2>
          <button className="action-btn">📊 Export Orders</button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Address</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.user}</td>
                  <td>{order.items}</td>
                  <td>₹{order.price.toLocaleString()}</td>
                  <td>{order.address}</td>
                  <td>
                    <select 
                      value={order.status} 
                      onChange={(e) => setOrders(orders.map(o => o.id === order.id ? {...o, status: e.target.value} : o))}
                      className="status-select"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <button className="table-btn view" onClick={() => setSelectedOrder(order)}>👁️ View</button>
                    <button className="table-btn cancel" onClick={() => setOrders(orders.map(o => o.id === order.id ? {...o, status: 'Cancelled'} : o))}>❌ Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      phone: '+91 9876543210',
      address: '123 Main St, Mumbai, Maharashtra 400001',
      orders: 5, 
      totalSpent: 245999,
      status: 'Active', 
      joined: '2024-01-01',
      orderHistory: [
        { id: 1, date: '2024-01-15', items: 'iPhone 15 Pro', amount: 134900, status: 'Delivered' },
        { id: 2, date: '2024-01-10', items: 'AirPods Pro', amount: 24900, status: 'Delivered' }
      ]
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      phone: '+91 9876543211',
      address: '456 Park Ave, Delhi, Delhi 110001',
      orders: 8, 
      totalSpent: 456789,
      status: 'Active', 
      joined: '2024-01-02',
      orderHistory: [
        { id: 3, date: '2024-01-14', items: 'MacBook Pro M3', amount: 199900, status: 'Shipped' },
        { id: 4, date: '2024-01-08', items: 'iPad Pro', amount: 89900, status: 'Delivered' }
      ]
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      email: 'mike@example.com', 
      phone: '+91 9876543212',
      address: '789 Oak Rd, Bangalore, Karnataka 560001',
      orders: 2, 
      totalSpent: 67890,
      status: 'Blocked', 
      joined: '2024-01-03',
      orderHistory: [
        { id: 5, date: '2024-01-12', items: 'Samsung Galaxy S24', amount: 67890, status: 'Cancelled' }
      ]
    }
  ]);

  const renderUsers = () => {
    if (selectedUser) {
      return (
        <div className="user-profile">
          <div className="profile-header">
            <button className="back-btn" onClick={() => setSelectedUser(null)}>← Back to Users</button>
            <h2>👤 User Profile</h2>
          </div>

          <div className="profile-content">
            <div className="profile-info">
              <div className="info-card">
                <h3>Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name</label>
                    <span>{selectedUser.name}</span>
                  </div>
                  <div className="info-item">
                    <label>Email Address</label>
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Phone Number</label>
                    <span>{selectedUser.phone}</span>
                  </div>
                  <div className="info-item">
                    <label>Address</label>
                    <span>{selectedUser.address}</span>
                  </div>
                  <div className="info-item">
                    <label>Account Status</label>
                    <span className={`status ${selectedUser.status.toLowerCase()}`}>{selectedUser.status}</span>
                  </div>
                  <div className="info-item">
                    <label>Member Since</label>
                    <span>{selectedUser.joined}</span>
                  </div>
                </div>
              </div>

              <div className="stats-card">
                <h3>Account Statistics</h3>
                <div className="stats-row">
                  <div className="stat-item">
                    <span className="stat-number">{selectedUser.orders}</span>
                    <span className="stat-label">Total Orders</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">₹{selectedUser.totalSpent.toLocaleString()}</span>
                    <span className="stat-label">Total Spent</span>
                  </div>
                </div>
              </div>

              <div className="actions-card">
                <h3>Admin Actions</h3>
                <div className="action-buttons">
                  <button className="action-btn block" onClick={() => setUsers(users.map(u => u.id === selectedUser.id ? {...u, status: u.status === 'Active' ? 'Blocked' : 'Active'} : u))}>
                    {selectedUser.status === 'Active' ? '🚫 Block User' : '✅ Unblock User'}
                  </button>
                  <button className="action-btn reset">🔑 Reset Password</button>
                  <button className="action-btn delete">🗑️ Delete Account</button>
                </div>
              </div>
            </div>

            <div className="order-history">
              <h3>📦 Order History</h3>
              <div className="history-table">
                <div className="table-header">
                  <span>Order ID</span>
                  <span>Date</span>
                  <span>Items</span>
                  <span>Amount</span>
                  <span>Status</span>
                </div>
                {selectedUser.orderHistory.map((order, index) => (
                  <div key={index} className="table-row">
                    <span>#{order.id}</span>
                    <span>{order.date}</span>
                    <span>{order.items}</span>
                    <span>₹{order.amount.toLocaleString()}</span>
                    <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="users-content">
        <div className="section-header">
          <h2>👥 User Management</h2>
          <button className="action-btn">📊 Export Users</button>
        </div>
        
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.orders}</td>
                  <td>₹{user.totalSpent.toLocaleString()}</td>
                  <td><span className={`status ${user.status.toLowerCase()}`}>{user.status}</span></td>
                  <td>{user.joined}</td>
                  <td>
                    <button className="table-btn view" onClick={() => setSelectedUser(user)}>👁️ View Profile</button>
                    <button className="table-btn block" onClick={() => setUsers(users.map(u => u.id === user.id ? {...u, status: u.status === 'Active' ? 'Blocked' : 'Active'} : u))}>
                      {user.status === 'Active' ? '🚫 Block' : '✅ Unblock'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderCategories = () => (
    <div className="categories-content">
      <div className="section-header">
        <h2>📂 Category Management</h2>
        <button className="action-btn primary" onClick={() => setShowAddCategory(true)}>+ Add Category</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Category Name</th>
              <th>Total Products</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category._id}>
                <td><span className="category-icon-large">{category.icon}</span></td>
                <td>
                  <div className="category-info">
                    <span className="category-name">{category.name}</span>
                    <span className="category-desc">{category.description}</span>
                  </div>
                </td>
                <td>{category.products}</td>
                <td>
                  <span className={`status ${category.status.toLowerCase()}`}>{category.status}</span>
                </td>
                <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="table-btn edit" onClick={() => setEditingCategory(category)}>✏️ Edit</button>
                  <button 
                    className="table-btn toggle" 
                    onClick={() => toggleCategoryStatus(category._id, category.status)}
                  >
                    {category.status === 'Active' ? '🚫 Disable' : '✅ Enable'}
                  </button>
                  <button 
                    className="table-btn delete" 
                    onClick={() => deleteCategory(category._id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(showAddCategory || editingCategory) && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
            <form className="category-form" onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              
              const categoryData = {
                name: formData.get('name'),
                icon: formData.get('icon'),
                description: formData.get('description')
              };
              
              if (editingCategory) {
                categoryData.status = editingCategory.status;
              }
              
              try {
                const url = editingCategory 
                  ? `https://gadget-backend-vy93.onrender.com/api/categories/${editingCategory._id}`
                  : 'https://gadget-backend-vy93.onrender.com/api/categories';
                const method = editingCategory ? 'PUT' : 'POST';
                
                const response = await fetch(url, {
                  method: method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(categoryData)
                });
                
                if (response.ok) {
                  fetchCategories();
                  setShowAddCategory(false);
                  setEditingCategory(null);
                  alert(editingCategory ? 'Category updated successfully!' : 'Category added successfully!');
                } else {
                  alert('Error saving category');
                }
              } catch (error) {
                console.error('Error:', error);
                alert('Error saving category');
              }
            }}>
              <div className="form-group">
                <label>Category Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter category name" 
                  defaultValue={editingCategory?.name || ''}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Icon/Emoji</label>
                <input 
                  type="text" 
                  name="icon" 
                  placeholder="📱 (Enter emoji or icon)" 
                  defaultValue={editingCategory?.icon || ''}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description" 
                  placeholder="Enter category description" 
                  rows="3"
                  defaultValue={editingCategory?.description || ''}
                  required
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => {setShowAddCategory(false); setEditingCategory(null);}}>Cancel</button>
                <button type="submit" className="primary">{editingCategory ? 'Update Category' : 'Add Category'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'overview': return renderOverview();
      case 'products': return renderProducts();
      case 'orders': return renderOrders();
      case 'users': return renderUsers();
      case 'categories': return renderCategories();
      default: return renderOverview();
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <nav className="sidebar-nav">
          <button className={activeTab === 'overview' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('overview')}>📊 Dashboard</button>
          <button className={activeTab === 'products' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('products')}>📱 Products</button>
          <button className={activeTab === 'orders' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('orders')}>📦 Orders</button>
          <button className={activeTab === 'users' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('users')}>👥 Users</button>
          <button className={activeTab === 'categories' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('categories')}>📂 Categories</button>
          <button className="nav-item logout" onClick={handleLogout}>🚪 Logout</button>
        </nav>
      </div>

      <div className="admin-main">
        <div className="main-header">
          <h1>GadgetZone Admin</h1>
          <button className="logout-btn-top" onClick={handleLogout}>🚪 Logout</button>
        </div>
        
        <div className="mobile-nav">
          {(() => {
            const tabs = ['overview', 'products', 'orders', 'users', 'categories'];
            const currentIndex = tabs.indexOf(activeTab);
            const isFirst = currentIndex === 0;
            const isLast = currentIndex === tabs.length - 1;
            
            return (
              <>
                {!isFirst && (
                  <button className="mobile-nav-btn prev" onClick={() => {
                    const prevIndex = currentIndex - 1;
                    setActiveTab(tabs[prevIndex]);
                    window.scrollTo(0, 0);
                  }}>← Previous</button>
                )}
                
                <span className="current-tab">
                  {activeTab === 'overview' ? 'Dashboard' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </span>
                
                {!isLast && (
                  <button className="mobile-nav-btn next" onClick={() => {
                    const nextIndex = currentIndex + 1;
                    setActiveTab(tabs[nextIndex]);
                    window.scrollTo(0, 0);
                  }}>Next →</button>
                )}
              </>
            );
          })()}
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
}