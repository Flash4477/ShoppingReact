import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../FileCss/Header.css';
import { FiSearch } from 'react-icons/fi';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import logo from '../Assets/logo.png';

function Header() {
  const [searchText, setSearchText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  // hàm này dùng để chuyển sang trang kết quả tìm kiếm và đưa dữ liệu tìm kiếm vào 
  const handleSearch = () => {
    navigate(`/search-results`, { state: { searchText } });
  };

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email) {
      fetch(`http://localhost:8081/api/v2/user/getByEmail?email=` + email)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Lỗi khi gọi API');
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.length > 0) {
            setUser(data[0]);
            setIsLoggedIn(true);
            const userId = data[0].nguoiDung_id;

            fetch(`http://localhost:8081/api/v2/cart/items/${userId}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Lỗi khi gọi API');
                }
                return response.json();
              })
              .then((cartItems) => {
                if (cartItems && Array.isArray(cartItems)) {
                  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
                  setCartItemCount(itemCount);
                }
              })
              .catch((error) => {
                console.error('Lỗi khi gọi API giỏ hàng:', error);
              });
          } else {
            console.error('Không tìm thấy thông tin người dùng');
          }
        })
        .catch((error) => {
          console.error('Lỗi khi gọi API:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
    sessionStorage.removeItem('email');
    setCartItemCount(0);
  };

  const handleAddToCart = () => {
    // Perform the API call to add an item to the cart
    // After adding to the cart, immediately increment the cartItemCount
    setCartItemCount(cartItemCount + 1);
  };

  return (
    <div className="header">
      <div className="top-nav">
        <div className="nav-links">
          <a href="#">Vào cửa hàng</a>
          <a href="#">
            <span> Kết nối </span>
            <FaFacebook className='nav-links--icon' />
            <FaInstagram />
          </a>
        </div>
        <div className="top-nav-right">
          {isLoggedIn ? (
            <>
              <div className="user-info">
                {user.image ? (
                  <img className='imageUser' src={user.image} alt="User" />
                ) : (
                  <FaUser className='user-icon' />
                )}
                <div className="nameUser">{user.name_User}</div>
                <li className='list-user'>
                  <ul className='TaiKhoan' onClick={() => navigate('/user-profile')}>
                    Tài Khoản
                  </ul>
                  <ul className='DonMua' onClick={() => navigate('/orderdetails')}>
                    Đơn Mua
                  </ul>
                  <ul className='DangXuat' onClick={handleLogout}>Đăng xuất </ul>
                </li>
              </div>
            </>
          ) : (
            <>
              <Link to="/dang-ky">Đăng ký</Link>
              <span className="divider"> | </span>
              <Link to="/dang-nhap">Đăng nhập</Link>
            </>
          )}
          <div className="cart" onClick={() => navigate('/cart')}>
            <FiShoppingCart className='cart icon' />
            {cartItemCount > 0 && (
              <div className="cart-item-count">{cartItemCount}</div>
            )}
          </div>
        </div>
      </div>
      <div className="bottom-nav">
        <div className="logo">
          <a href='http://localhost:3000'>
            <img src={logo} alt="Logo" />
          </a>
        </div>
        {/* tìm kiếm sản phẩm  */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}><FiSearch className="search-bar-button" /></button>
        </div>
        {/* tìm kiếm sản phẩm  */}
      </div>
    </div>
  );
}

export default Header;
