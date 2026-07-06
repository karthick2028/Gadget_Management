# 🛒 GadgetZone — MERN Stack E-Commerce Application

A full-stack gadget e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js). GadgetZone allows users to browse and purchase gadgets, while admins can manage products, categories, orders, and users through a dedicated dashboard.

---

## 🌐 Live Demo

- **Frontend:** [Deployed on Netlify/Vercel]
- **Backend API:** https://gadget-backend-vy93.onrender.com

---

## 📁 Project Structure

```
gadget wit react/
├── backend/                  # Node.js + Express REST API
│   ├── src/
│   │   ├── controllers/      # Route handler logic
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # Express route definitions
│   │   └── server.js         # App entry point
│   ├── uploads/              # Uploaded product images
│   ├── index.js
│   ├── .env
│   └── package.json
└── gadget/                   # React + Vite frontend
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── context/          # React Context (Auth, Cart)
    │   ├── pages/            # Page-level components
    │   └── App.jsx
    ├── public/
    ├── .env
    └── package.json
```

---

## ✨ Features

### User Side
- User registration, login, and password reset
- Hero carousel with auto-sliding banners
- Browse featured products on the Home page
- Shop page with category filtering and search
- Add to cart, update quantity, remove items
- View cart with discounted pricing
- Contact form submission
- Responsive design for mobile and desktop

### Admin Side
- Secure admin login with token-based auth
- Dashboard overview with stats (users, orders, products, revenue)
- Sales chart and recent activity feed
- Full product management — add, edit, delete, image upload
- Category management — add, edit, enable/disable, delete
- Order management — view details, update order status
- User management — view profiles, block/unblock users

---

## 🧰 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js v5 | REST API framework |
| MongoDB Atlas | Cloud database |
| Mongoose | ODM for MongoDB |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| Multer | Image file uploads |
| CORS | Cross-origin requests |
| dotenv | Environment variables |

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI library |
| Vite | Build tool & dev server |
| React Router DOM v6 | Client-side routing |
| Material UI (MUI) | UI component library |
| Context API | Global state (Auth & Cart) |
| CSS Modules | Component styling |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register` | Register a new user |
| POST | `/api/login` | Login and receive JWT |
| GET | `/api/users` | Get all users |

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create a product (with image upload) |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

### Categories
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Create a category |
| PUT | `/api/categories/:id` | Update a category |
| DELETE | `/api/categories/:id` | Delete a category |

### Contact
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/contact` | Submit a contact form |
| GET | `/api/contacts` | Get all contact submissions |

### Content
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/content/:page` | Get content by page name |

---

## 🗄️ Database Models

### User
```js
{ username, email, password (hashed), createdAt }
```

### Product
```js
{ name, category, price, stock, offer (%), description, image, createdAt }
```

### Category
```js
{ name, icon, description, status (Active/Disabled), createdAt }
```

### Contact
```js
{ name, email, message, createdAt }
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account (or local MongoDB)
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/karthick2028/Gadget_Management.git
cd Gadget_Management
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend server:

```bash
# Development
npm run dev

# Production
npm start
```

Backend runs at: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd gadget
npm install
```

Create a `.env` file in the `gadget/` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend dev server:

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🚀 Deployment

### Backend — Render
1. Push the `backend/` folder to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set build command: `npm install`
4. Set start command: `node index.js`
5. Add environment variables: `MONGODB_URI`, `JWT_SECRET`, `PORT`

### Frontend — Netlify
1. Build the frontend: `npm run build`
2. Deploy the `dist/` folder to [Netlify](https://netlify.com)
3. Add `public/_redirects` file with: `/* /index.html 200` (already included)
4. Set environment variable: `VITE_API_URL=<your_render_backend_url>`

---

## 📸 Pages Overview

| Page | Route | Description |
|---|---|---|
| Login | `/login` | User login |
| Register | `/register` | New user registration |
| Reset Password | `/reset-password` | Password reset |
| Home | `/home` | Hero carousel, featured products, categories |
| Shop | `/shop` | Full product listing with filters |
| Cart | `/cart` | Shopping cart with quantity controls |
| About | `/about` | About GadgetZone |
| Services | `/services` | Services offered |
| Contact | `/contact` | Contact form |
| Admin Login | `/admin-login` | Admin authentication |
| Admin Dashboard | `/admin` | Full admin panel (protected) |

---

## 🔐 Authentication Flow

- Users register/login → receive a JWT stored in `localStorage`
- Protected routes check for a valid token via `ProtectedRoute` component
- Admin routes are separately guarded via `AdminProtectedRoute`
- Admin token is stored separately as `adminToken` in `localStorage`

---

## 🛒 Cart Functionality

- Cart state is managed globally via `CartContext`
- Supports add, remove, update quantity, and clear cart
- Discounted prices are calculated using the product's `offer` percentage
- Cart persists during the session (in-memory, not persisted to DB)

---

## 👨‍💻 Author

**Karthick T**
- GitHub: [@karthick2028](https://github.com/karthick2028)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
