import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from 'react-router-dom';
const SearchResults = () => {
  const location = useLocation();
  const searchText = location.state.searchText;
  const [searchResults, setSearchResults] = useState([]);


  // dùng api để tìm kiếm sản phẩm theo ký tự với biến searchText
  useEffect(() => {
    if (searchText) {
      fetch(`http://localhost:8081/api/v2/products/search?name=${searchText}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setSearchResults(data);
        })
        .catch(error => {
          console.error('Lỗi khi lấy dữ liệu tìm kiếm', error);
        });
    }
  }, [searchText]);

  
  return (
    <div>
      <Header />
      <div className="product-grid">
        {searchResults.map((product, index) => (
          <Link to={`/DetailProduct/${product.Product_id}`} key={index} className="product-card product-column">
            <img src={product.image} alt={product.name} />

            <div className="card-body">
              <p className="product-title">{product.Name_Product}</p>
              <p className="product-price">Price: ${product.price}</p>
              <p className="product-price-old">Old Price: ${product.price_old}</p>
              <p className="product-origin">Origin: {product.origin}</p>
              <p className="product-brand">Brand: {product.brand}</p>
              <p className="product-stock-quantity">Stock Quantity: {product.stock_quantity}</p>
              {/* Thêm các thông tin khác của sản phẩm ở đây */}
            </div>

          </Link>
        ))}
      </div>
      <Footer />/
    </div>
  );
};

export default SearchResults;
