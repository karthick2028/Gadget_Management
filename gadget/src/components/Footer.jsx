// src/components/Footer.jsx
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>ABOUT GADGETZONE</h3>
          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Our Story</li>
            <li>Press & Media</li>
            <li>Corporate Information</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>SHOP CATEGORIES</h3>
          <ul>
            <li>Smartphones</li>
            <li>Laptops</li>
            <li>Audio Devices</li>
            <li>Wearables</li>
            <li>Cameras</li>
            <li>Accessories</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>CUSTOMER SUPPORT</h3>
          <ul>
            <li>Help Center</li>
            <li>Track Order</li>
            <li>Shipping Info</li>
            <li>Returns & Refunds</li>
            <li>Payment Options</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>POLICIES</h3>
          <ul>
            <li>Return Policy</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Security</li>
            <li>Warranty Policy</li>
            <li>Shipping Policy</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>CONTACT US</h3>
          <p>
            <strong>Email:</strong><br/>
            karthick.t2024aids@sece.ac.in<br/>
            support@gadgetzone.com
          </p>
          <p style={{marginTop: '1rem'}}>
            <strong>Phone:</strong><br/>
            +91 6382958604<br/>
            Toll Free: 1800-123-4567
          </p>
          <h3 style={{marginTop: '1.5rem'}}>FOLLOW US</h3>
          <div className="social-icons">
            <span title="Facebook">👥</span>
            <span title="Instagram">📷</span>
            <span title="Twitter">🐦</span>
            <span title="YouTube">📺</span>
          </div>
        </div>

        <div className="footer-column">
          <h3>OUR ADDRESS</h3>
          <p>
            GadgetZone Electronics Pvt Ltd<br/>
            TKT MILL, Verrapandi Road<br/>
            Tirupur - 641605<br/>
            Tamil Nadu, India
          </p>
          <p style={{marginTop: '1rem'}}>
            <strong>Business Hours:</strong><br/>
            Mon-Sat: 9:00 AM - 8:00 PM<br/>
            Sunday: 10:00 AM - 6:00 PM
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 GadgetZone | All Rights Reserved</p>
      </div>
    </footer>
  );
}
