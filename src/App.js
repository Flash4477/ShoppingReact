import React from 'react';
import { Routes, Route } from "react-router-dom";
import SearchResults from './pages/SearchResults';
import Home from './pages/Home'
import DetailProduct from './pages/DetailProduct';
import ProductListByCategory from "./pages/ProductListByCategory";
import Login from './pages/Login'; // Import Login.js
import Register from './pages/Register'; // Import Register.js
import Cart from './pages/Cart';
import ThanhToan from './pages/ThanhToan';
import UserProfile from './pages/UserProfile';
import { CartProvider } from './pages/CartContext'; // Import CartProvider
import OrderDetail from './pages/OrderDetail';
import Admin from './pages/Admin';
import ManageOrder from './pages/ManageOrder';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DetailProduct/:id" element={<DetailProduct />} />
          <Route path="/products/:categoryName" element={<ProductListByCategory />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/dang-ky" element={<Register />} />
          <Route path="/cart" element={<Cart />} /> {/* Thêm Route cho trang giỏ hàng */}
          <Route path="/thanhtoan/:userId" element={<ThanhToan />} />
          <Route path="/user-profile" element={<UserProfile />} /> {/* Thêm Route cho trang UserProfile */}
          <Route path="/orderdetails" element={<OrderDetail />} />
          <Route path="/Admin/quanlysanpham" element={<Admin />} />
          <Route path="/Admin/ManageOrder" element={<ManageOrder />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
