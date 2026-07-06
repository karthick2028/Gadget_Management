import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

export default function Contact() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (name.trim().length < 3) {
      setError('Name must be at least 3 characters!');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email!');
      return;
    }

    if (subject.trim().length < 5) {
      setError('Subject must be at least 5 characters!');
      return;
    }

    if (message.trim().length < 10) {
      setError('Message must be at least 10 characters!');
      return;
    }

    try {
      const response = await fetch('https://gadget-backend-vy93.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Message sent successfully! We will get back to you soon.');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => setSuccess(''), 5000);
      } else {
        setError(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="contact-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="contact-container">
        <h1>Contact Us</h1>
        
        <div className="contact-content">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <input 
                placeholder="Your Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input 
                placeholder="Your Email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input 
                placeholder="Subject" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <textarea 
                placeholder="Your Message" 
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button type="submit">Send Message</button>
            </form>
            {error && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}
          </div>

          <div className="contact-info">
            <h2>📞 Get In Touch</h2>
            <div className="info-item">
              <p>📧 <strong>Email:</strong> karthick.t2024aids@sece.ac.in</p>
            </div>
            <div className="info-item">
              <p>📱 <strong>Phone:</strong> +91 6382958604 (Toll Free)</p>
            </div>
            <div className="info-item">
              <p>💬 <strong>WhatsApp:</strong> +91 6382958604</p>
            </div>
            <div className="info-item">
              <p>📍 <strong>Address:</strong> TKT MILL, Verrapandi road, Tirupur - 641605, India</p>
            </div>
            <div className="info-item">
              <p>🕒 <strong>Business Hours:</strong> Mon-Sat: 9:00 AM - 8:00 PM</p>
            </div>
            <div className="social-links">
              <h3>Follow Us:</h3>
              <p>📸 Facebook | 📷 Instagram | 🐦 Twitter | 📺 YouTube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
