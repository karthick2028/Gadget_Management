import { useContext, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Shop.css";

export default function Shop() {
  const { cart, addToCart, updateQuantity } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const getCartQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleIncrement = (product) => {
    const currentQuantity = getCartQuantity(product.id);
    if (currentQuantity === 0) {
      addToCart(product);
    } else {
      updateQuantity(product.id, currentQuantity + 1);
    }
  };

  const handleDecrement = (productId) => {
    const currentQuantity = getCartQuantity(productId);
    if (currentQuantity > 0) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  const [backendProducts, setBackendProducts] = useState([]);

  useEffect(() => {
    fetchBackendProducts();
  }, []);

  const fetchBackendProducts = async () => {
    try {
      const response = await fetch('https://gadget-backend-vy93.onrender.com/api/products');
      if (response.ok) {
        const data = await response.json();
        setBackendProducts(data.map(p => {
          const imageUrl = p.image?.startsWith('http') ? p.image : p.image ? `https://gadget-backend-vy93.onrender.com/uploads/${p.image}` : 'https://via.placeholder.com/300';
          console.log(`Product: ${p.name}, Image: ${p.image}, Final URL: ${imageUrl}`);
          return {
            id: p._id,
            name: p.name,
            category: p.category,
            img: imageUrl,
            oldPrice: p.price,
            newPrice: Math.round(p.price - (p.price * p.offer / 100))
          };
        }));
      }
    } catch (error) {
      console.error('Error fetching backend products:', error);
    }
  };

  // Use only backend products
  const allProducts = backendProducts;
  let filteredProducts = allProducts;
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="shop-page">
      <button className="back-btn" onClick={() => navigate('/home')}>← Back to Home</button>
      
      <div className="shop-header-flex">
        <div className="shop-title">
          <h1>🛒 {searchQuery ? `Search Results for "${searchQuery}"` : category ? `${category} Products` : "Shop All Products"}</h1>
          <p>{filteredProducts.length} Products Found</p>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="offer-badge">50% OFF</div>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <div className="price-section">
              <p className="old-price">₹{product.oldPrice}</p>
              <p className="new-price">₹{product.newPrice}</p>
            </div>
            {getCartQuantity(product.id) === 0 ? (
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            ) : (
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(product.id)}>-</button>
                <span>{getCartQuantity(product.id)}</span>
                <button onClick={() => handleIncrement(product)}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
