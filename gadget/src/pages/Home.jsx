import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Home.css";

// Product Grid Component
function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    const cartProduct = {
      id: product._id,
      name: product.name,
      category: product.category,
      oldPrice: product.price,
      newPrice: Math.round(product.price - (product.price * product.offer / 100)),
      img: product.image?.startsWith('http') ? product.image : product.image ? `${import.meta.env.VITE_API_URL}/uploads/${product.image}` : 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300'
    };
    addToCart(cartProduct);
    navigate('/cart');
  };

  useEffect(() => {
    fetchProducts();
  }, []);



  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      if (response.ok) {
        const backendProducts = await response.json();
        setProducts(backendProducts.slice(0, 8));
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (products.length === 0) return <div className="no-products">No products available</div>;

  return (
    <div className="product-grid">
      {products.map((product) => {
        const discountedPrice = product.price - (product.price * product.offer / 100);
        return (
          <div className="product-card" key={product._id}>
            {product.offer > 0 && <div className="offer-badge">{product.offer}% OFF</div>}
            <img 
              src={product.image?.startsWith('http') ? product.image : product.image ? `${import.meta.env.VITE_API_URL}/uploads/${product.image}` : 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300'} 
              alt={product.name} 
            />
            <h3>{product.name}</h3>
            <div className="price-section">
              {product.offer > 0 && <p className="old-price">₹{product.price}</p>}
              <p className="new-price">₹{Math.round(discountedPrice)}</p>
            </div>
            <button onClick={() => handleBuyNow(product)}>Buy Now</button>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [categories, setCategories] = useState([]);

  const handleNavigate = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200",
      title: "Premium Audio Devices",
      subtitle: "Experience Sound Like Never Before"
    },
    {
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200",
      title: "Latest Smartphones",
      subtitle: "Stay Connected with Cutting-Edge Technology"
    },
    {
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200",
      title: "Powerful Laptops",
      subtitle: "Work & Play with Ultimate Performance"
    },
    {
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200",
      title: "Smart Wearables",
      subtitle: "Track Your Fitness & Stay Healthy"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
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

  return (
    <div className="home">
      <div className="hero-carousel">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <button className="shop-now-btn" onClick={() => handleNavigate("/shop")}>Shop Now</button>
            </div>
          </div>
        ))}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className="deals-section">
        <h2>Today's Deals</h2>
      </div>

      <div className="product-preview">
        <div className="product-preview-header">
          <h2>Featured Products</h2>
          <button className="see-all-btn" onClick={() => handleNavigate("/shop")}>See All Products</button>
        </div>
        <ProductGrid />
      </div>

      <div className="features-section">
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h3>Fast Delivery</h3>
          <p>Get your gadgets delivered within 24-48 hours with our express shipping service</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔒</span>
          <h3>Secure Payment</h3>
          <p>100% secure transactions with multiple payment options for your convenience</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">💎</span>
          <h3>Premium Quality</h3>
          <p>Authentic products from top brands with manufacturer warranty included</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🎧</span>
          <h3>24/7 Support</h3>
          <p>Round-the-clock customer support to assist you with any queries or issues</p>
        </div>
      </div>

      <div className="offer-banner">
        <h2>🔥 Mega Sale - Up to 50% OFF 🔥</h2>
        <p>Limited time offer on all electronics and gadgets</p>
      </div>

      <div className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <div key={category._id} className="category-card" onClick={() => handleNavigate(`/shop?category=${category.name}`)}>
              <span className="category-icon">{category.icon}</span>
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="why-choose-section">
        <h2>Why Choose GadgetZone?</h2>
        <div className="why-choose-content">
          <div className="why-item">
            <span>✓</span>
            <p>Widest range of electronics and gadgets</p>
          </div>
          <div className="why-item">
            <span>✓</span>
            <p>Best prices guaranteed with price match promise</p>
          </div>
          <div className="why-item">
            <span>✓</span>
            <p>Easy returns and exchange within 7 days</p>
          </div>
          <div className="why-item">
            <span>✓</span>
            <p>Trusted by over 1 million happy customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
