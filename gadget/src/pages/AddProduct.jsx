import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [offer, setOffer] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Test backend connection
  const testConnection = async () => {
    try {
      const response = await fetch('https://gadget-backend-vy93.onrender.com/api/test');
      if (response.ok) {
        const data = await response.json();
        setSuccess('✅ Backend connection successful: ' + data.message);
        setError('');
      } else {
        setError('❌ Backend responded with error: ' + response.status);
      }
    } catch (error) {
      setError('❌ Cannot connect to backend. Make sure server is running on port 5000.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate required fields
    if (!name || !category || !price || !stock || !description) {
      setError('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('offer', offer || '0');
    formData.append('description', description);
    if (image) formData.append('image', image);
    
    console.log('Form data prepared:', {
      name, category, price, stock, offer, description, 
      hasImage: !!image
    });

    setIsLoading(true);
    
    try {
      console.log('Attempting to save product...');
      const response = await fetch('https://gadget-backend-vy93.onrender.com/api/products', {
        method: 'POST',
        body: formData,
      });
      
      console.log('Response status:', response.status);

      const data = await response.json();

      if (response.ok) {
        setSuccess('Product added successfully!');
        setName('');
        setCategory('');
        setPrice('');
        setStock('');
        setOffer('');
        setDescription('');
        setImage(null);
        setTimeout(() => navigate('/admin-dashboard'), 2000);
      } else {
        setError(data.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Add product error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError('Cannot connect to server. Make sure backend is running on port 5000.');
      } else {
        setError(`Network error: ${error.message}. Please check if backend server is running.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-container">
        <h1>Add New Product</h1>
        
        <div style={{marginBottom: '1rem'}}>
          <button type="button" onClick={testConnection} style={{
            background: '#007bff', color: 'white', border: 'none', 
            padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer'
          }}>
            🔍 Test Backend Connection
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Laptop">Laptop</option>
            <option value="Audio">Audio</option>
            <option value="Wearables">Wearables</option>
            <option value="Camera">Camera</option>
            <option value="Accessories">Accessories</option>
          </select>
          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            placeholder="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <input
            placeholder="Offer %"
            type="number"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />
          <textarea
            placeholder="Description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Product'}
          </button>
        </form>
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
        <button className="cancel-btn" onClick={() => navigate('/admin-dashboard')}>
          Cancel
        </button>
      </div>
    </div>
  );
}