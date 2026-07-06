import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactSubmissions.css';

export default function ContactSubmissions() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    setSubmissions(data);
  }, []);

  return (
    <div className="submissions-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="submissions-container">
        <h1>Contact Submissions ({submissions.length})</h1>
        {submissions.length === 0 ? (
          <p className="no-data">No submissions yet</p>
        ) : (
          submissions.map((sub, i) => (
            <div key={i} className="submission-card">
              <p><strong>Name:</strong> {sub.name}</p>
              <p><strong>Email:</strong> {sub.email}</p>
              <p><strong>Subject:</strong> {sub.subject}</p>
              <p><strong>Message:</strong> {sub.message}</p>
              <p><strong>Date:</strong> {new Date(sub.date).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
