import React, { useEffect, useState } from "react";
import '../FileCss/OrderDetail.css';

function OrderDetail() {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const email = sessionStorage.getItem('email');

        if (email) {
            fetch(`http://localhost:8081/api/v2/ordercarts/user/${email}`)
                .then(response => response.json())
                .then(data => setOrderData(data))
                .catch(error => console.error(error));
        }
    }, []);

    const groupByReceiptId = () => {
        const groupedProducts = {};

        orderData.forEach(product => {
            const receiptId = product[3];
            if (!groupedProducts[receiptId]) {
                groupedProducts[receiptId] = [product];
            } else {
                groupedProducts[receiptId].push(product);
            }
        });

        return Object.values(groupedProducts);
    };

    return (
        <section className="h-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-10 col-xl-8">
                        <div className="card" style={{ borderRadius: "10px" }}>
                            <div className="card-header px-4 py-5">
                                <h5 className="text-muted mb-0">Thanks for your Order, <span style={{ color: "#a8729a" }}>
                                    {orderData.length > 0 ? orderData[0][0] : "NameUser"}
                                </span>!</h5>
                                <a href="http://localhost:3000" className="text-muted mb-0"style={{ cursor: 'pointer' }} >[Back to Home]</a>
                            </div>
                            {groupByReceiptId().map((products, index) => (
                                <div key={index}>
                                    {products.map((product, idx) => (
                                        <div key={idx}>
                                            {idx === 0 && (
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>Receipt ID: #{product[3]}</p>
                                                </div>
                                            )}
                                            <div className="card shadow-0 border mb-4">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <img src={product[4]} className="img-fluid" alt={product[2]} />
                                                        </div>
                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                            <p className="text-muted mb-0 product-name">{product[2]}</p>
                                                        </div>
                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                            <p className="text-muted mb-0 small">{product[5].size_Name}</p>
                                                        </div>
                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                            <p className="text-muted mb-0 small">Qty: {product[6]}</p>
                                                        </div>
                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                            <p className="text-muted mb-0 small">${product[1]}</p>
                                                        </div>
                                                    </div>
                                                    <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: 1 }} />
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-md-2">
                                                            <p className="text-muted mb-0 small">Track Order</p>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <div className="progress" style={{ height: "6px", borderRadius: "16px" }}>
                                                                <div className="progress-bar" role="progressbar" style={{ width: "65%", borderRadius: "16px", backgroundColor: "#a8729a" }} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                            <div className="d-flex justify-content-around mb-1">
                                                                <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivery</p>
                                                                <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted mb-0">Invoice Date: {products[0][8]}</p>
                                        <p className="text-muted mb-0"><span className="fw-bold me-4">Shipping fee : 35$</span></p>
                                    </div>

                                    <div className="card-footer border-0 px-4 py-5" style={{ backgroundColor: "#a8729a", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                                        <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total paid: <span className="h4 mb-0 ms-2">${products[0][7]}</span></h5>
                                    </div>
                                </div>

                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OrderDetail;
