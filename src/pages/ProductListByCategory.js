// Component ProductListByCategory.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import DetailProduct from './DetailProduct';
import '../FileCss/Home.css';
import { FiList } from 'react-icons/fi';
import { Routes, Route } from 'react-router-dom';
function ProductListByCategory({ match }) {
    const [products, setProducts] = useState([]);
    const { categoryName } = useParams();



    useEffect(() => {
        // Gọi API endpoint để lấy sản phẩm theo danh mục

        fetch(`http://localhost:8081/api/v2/products?categoryName=${categoryName}`)
            .then(response => {
                response.json().then(data => {
                    console.log(data);
                    setProducts(data);
                })
            })
    }, [categoryName]);




    const fillProduct = products.map((s, key) => {
        return (
            // Sử dụng Link để tạo liên kết đến trang DetailProduct với sản phẩm cụ thể
            <Link to={`/DetailProduct/${s.Product_id}`} key={key} className="product-card product-column">
                <img src={s.image} className="product-img" alt="..." />
                <div className="card-body">
                    <p className="product-title">{s.Name_Product}</p>
                    <p className="product-price">Price: ${s.price}</p>
                    <p className="product-price-old">Old Price: ${s.Price_old}</p>
                    <p className="product-origin">Origin: {s.origin}</p>
                    <p className="product-brand">Brand: {s.brand}</p>
                    <p className="product-stock-quantity">Stock Quantity: {s.stock_quantity}</p>
                </div>
            </Link>
        )
    })

    return (

        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-lg-3" >
                        <div className="product-list-container">
                            <h2 className="product-list-title">
                                <FiList size={18} />  Product List
                            </h2>
                            <ul className="product-list">
                                <li className="product-list-item"><Link to="/products/Áo Thun">Áo Thun</Link></li>
                                <li className="product-list-item"><Link to="/products/Quần Ống Rộng">Quần Ống Rộng</Link></li>
                                <li className="product-list-item"><Link to="/products/Quần Jeans">Quần Jeans</Link></li>
                                <li className="product-list-item"><Link to="/products/Áo Phông">Áo Phông</Link></li>
                                <li className="product-list-item"><Link to="/products/Áo Ba Lỗ">Áo Ba Lỗ</Link></li>
                                <li className="product-list-item"><Link to="/products/Dép">Dép</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="product-grid">
                            {fillProduct}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
}

export default ProductListByCategory;
