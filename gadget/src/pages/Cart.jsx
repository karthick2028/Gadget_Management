import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const suggestedProducts = [
    { id: 17, name: "Wireless Earbuds", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200", price: 1999 },
    { id: 18, name: "Phone Case", img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200", price: 499 },
    { id: 19, name: "Screen Protector", img: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=200", price: 299 },
    { id: 20, name: "Charging Cable", img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200", price: 399 },
  ];

  const handleCheckout = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    alert(`Order placed successfully! Payment method: ${paymentMethod}`);
    clearCart();
    setShowCheckout(false);
    setPaymentMethod("");
    window.scrollTo(0, 0);
    navigate("/home");
  };

  const subtotal = cart.reduce((sum, item) => sum + item.newPrice * item.quantity, 0);
  const total = subtotal;

  return (
    <div className="cart-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      
      <div className="cart-header-flex">
        <div className="cart-title">
          <h1>🛒 Shopping Cart</h1>
          <p>{cart.length > 0 ? `${cart.reduce((sum, item) => sum + item.quantity, 0)} items in cart` : 'Your cart is empty'}</p>
        </div>
      </div>
      
      {cart.length === 0 ? (
        <div className="empty-cart-container">
          <div className="empty-cart-content">
            <h2>🛒 Your Cart is Empty</h2>
            <p>Add some products to get started!</p>
            <button className="shop-now-btn" onClick={() => { window.scrollTo(0, 0); navigate("/shop"); }}>Start Shopping</button>
          </div>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  {item.img ? (
                    <img src={item.img} alt={item.name} />
                  ) : (
                    <div className="placeholder-image">📱</div>
                  )}
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">₹{item.newPrice}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
                <div className="item-total">
                  <p>₹{item.newPrice * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
            <button className="checkout-btn" onClick={() => setShowCheckout(true)}>Proceed to Checkout</button>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <div className="buy-more-section">
          <div className="section-header">
            <h2>Buy More & Save</h2>
            <button className="continue-shopping-btn" onClick={() => { window.scrollTo(0, 0); navigate("/shop"); }}>🛒 Continue Shopping</button>
          </div>
        </div>
      )}

      <div className="suggested-products">
        <h2>Suggested For You</h2>
        <div className="suggested-grid">
          {suggestedProducts.map((product) => (
            <div className="suggested-card" key={product.id}>
              <div className="suggested-image">
                {product.img ? (
                  <img src={product.img} alt={product.name} />
                ) : (
                  <div className="placeholder-image">📱</div>
                )}
              </div>
              <h4>{product.name}</h4>
              <p className="price">₹{product.price}</p>
              <button onClick={() => { window.scrollTo(0, 0); navigate("/shop"); }}>View Product</button>
            </div>
          ))}
        </div>
      </div>

      {showCheckout && (
        <div className="checkout-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowCheckout(false)}>×</button>
            <h2>Select Payment Method</h2>
            
            <div className="payment-options">
              <label className={paymentMethod === "UPI" ? "payment-option active" : "payment-option"}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="UPI"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="option-content">
                  <span className="icon">📱</span>
                  <div>
                    <strong>UPI</strong>
                    <p>Pay via Google Pay, PhonePe, Paytm</p>
                  </div>
                </div>
              </label>

              <label className={paymentMethod === "Card" ? "payment-option active" : "payment-option"}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="Card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="option-content">
                  <span className="icon">💳</span>
                  <div>
                    <strong>Credit/Debit Card</strong>
                    <p>Visa, Mastercard, Rupay</p>
                  </div>
                </div>
              </label>

              <label className={paymentMethod === "COD" ? "payment-option active" : "payment-option"}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="COD"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="option-content">
                  <span className="icon">💵</span>
                  <div>
                    <strong>Cash on Delivery</strong>
                    <p>Pay when you receive</p>
                  </div>
                </div>
              </label>
            </div>

            <div className="modal-footer">
              <p className="total-amount">Total: ₹{total}</p>
              <button className="place-order-btn" onClick={handleCheckout}>Place Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
