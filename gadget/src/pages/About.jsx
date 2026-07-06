import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './About.css';

export default function About() {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/content/about');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="about-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="about-container">
        <div className="about-header">
          <span className="logo-icon">🛒</span>
          <h1>{content.find(c => c.section === 'header')?.title || 'About GadgetZone'}</h1>
        </div>

        {content.filter(c => c.section !== 'header').map((item, index) => (
          <div className="about-section" key={index}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </div>
        ))}

        <div className="about-section">
          <h2>🎁 What We Offer</h2>
          <ul>
            <li>🛒 <strong>Smartphones & Tablets:</strong> Latest models from top brands</li>
            <li>🛒 <strong>Laptops & Computers:</strong> High-performance devices for work and gaming</li>
            <li>🛒 <strong>Audio Devices:</strong> Headphones, earbuds, and speakers</li>
            <li>🛒 <strong>Smart Watches:</strong> Fitness trackers and smartwatches</li>
            <li>🛒 <strong>Cameras & Drones:</strong> Professional photography equipment</li>
            <li>🛒 <strong>Accessories:</strong> Keyboards, mice, and more</li>
          </ul>
        </div>

        <button className="shop-btn" onClick={() => { window.scrollTo(0, 0); navigate('/shop'); }}>Shop Now</button>
      </div>
    </div>
  );
}
