import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import CartProvider from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ContactSubmissions from "./pages/ContactSubmissions";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

function Layout() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/reset-password' || location.pathname.startsWith('/admin');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      {!hideNavAndFooter && <Navbar />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-submissions" element={<ContactSubmissions />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        </Routes>
      </div>
      {!hideNavAndFooter && <Footer />}
      <ScrollToTopButton />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
