// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import UserProfile from "./UserProfile";
import "./Navbar.css";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data.filter(cat => cat.status === 'Active'));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const suggestions = [
    "Smartphone", "Laptop", "Headphones", "Smart Watch", "Tablet",
    "Camera", "Keyboard", "Mouse", "Speaker", "Monitor",
    "Webcam", "Microphone", "Power Bank", "USB Cable", "Hard Drive", "Router",
    "Gaming Laptop", "Wireless Earbuds", "Fitness Tracker", "Drone Camera",
    "Gaming Mouse", "Mechanical Keyboard", "Portable SSD", "Smart Speaker",
    "Action Camera", "VR Headset", "Bluetooth Speaker", "Smartphone Pro"
  ];

  const filteredSuggestions = suggestions.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.scrollTo(0, 0);
      navigate(`/shop?search=${searchQuery}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };



  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/home" className="logo" onClick={() => window.location.reload()}>
            <div className="logo-icon">🛒</div>
            <span>GadgetZone</span>
          </Link>

          <div className="search-container">
            <form className="search-box" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search Product" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 300)}
              />
              <button type="submit">Search</button>
            </form>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="search-suggestions">
                {filteredSuggestions.slice(0, 8).map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span className="suggestion-icon">🔍</span>
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="nav-links">
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/cart" className="cart-link">
              Cart ({cart.length})
            </Link>
          </div>

          <div className="nav-right">
            {user && <UserProfile />}
          </div>
        </div>
      </nav>

      <div className="category-bar">
        <div className="category-container">
          <Link to="/shop?category=Audio">🎧 Audio</Link>
          <Link to="/shop?category=Camera">📷 Camera</Link>
          <Link to="/shop?category=Laptop">💻 Laptop</Link>
          <Link to="/shop?category=Accessories">🖥️ Accessories</Link>
          <Link to="/shop?category=Wearables">⌚ Wearables</Link>
          <Link to="/shop?category=Smartphone">📱 Smartphone</Link>
        </div>
      </div>
    </>
  );
}
