import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import Header from './Header';
import Footer from './Footer';
import '../FileCss/Home.css';
import { FiList } from 'react-icons/fi';

function Home() {
    const [product, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 6; // Số lượng sản phẩm trên mỗi trang
    
    // đây là dùng useEffect để fect api , lấy dữ liệu từ đường link api 
    useEffect(() => {
        fetch(`http://localhost:8081/api/v2/products/getall?page=${currentPage}&size=${pageSize}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data.content);
            })
    }, [currentPage])


    // đây là hàm để lấy sản phẩm ra từ api
    const fillProduct = product.map((s, key) => {
        return (
            // Sử dụng Link để tạo liên kết đến trang DetailProduct với sản phẩm cụ thể
            <Link to={`/DetailProduct/${s.Product_id}`} key={key} className="product-card product-column">
                <img src={s.image} className="product-img" alt="..." />
                <div className="card-body">
                    <p className="product-title">{s.Name_Product}</p>
                    <p className="product-price">Price: ${s.price}</p>
                    <p className="product-price-old">Old Price: ${s.price_old}</p>
                    <p className="product-origin">Origin: {s.origin}</p>
                    <p className="product-brand">Brand: {s.brand}</p>
                    <p className="product-stock-quantity">Stock Quantity: {s.stock_quantity}</p>
                </div>
            </Link>
        )
    })
    // còn đây là phần return trả về giao diện , đưa ra tất cả sản phẩm ra giao diện
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
                {/* phân trang */}
                <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                {[...Array(product.totalPages).keys()].map(page =>
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(page)}>
                            {page + 1}
                        </button>
                    </li>
                )}
                <li className={`page-item ${currentPage === product.totalPages - 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} aria-label="Next">
                        <span aria-hidden="true">2</span>
                    </button>
                </li>
                <li className={`page-item ${currentPage === product.totalPages - 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
         {/* phân trang */}
            </div>
            <Footer />

        </>

    )
}

export default Home;
