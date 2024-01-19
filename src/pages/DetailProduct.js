import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import Header from './Header';
import Footer from './Footer';
import '../FileCss/DetailProduct.css';
import { FiShoppingCart } from 'react-icons/fi';

function DetailProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [sizeName, setSizeName] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [nguoiDungid, setNguoiDungid] = useState('');
    const [productSizeId, setProductSizeId] = useState(null);

    const navigate = useNavigate(); // Use useNavigate for navigation
    // dùng useEffect để lấy api , để lấy ra sản phẩm chi tiết theo id
    useEffect(() => {
        fetch(`http://localhost:8081/api/v2/products/?productId=${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                const sizeNames = [...new Set(data.productSizes.map(sizeInfo => sizeInfo.size.size_Name))];
                setSizeName(sizeNames);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });

        const email = sessionStorage.getItem('email');
        if (email) {
            fetch(`http://localhost:8081/api/v2/user/getByEmail?email=${email}`)
                .then(response => response.json())
                .then(data => {
                    setNguoiDungid(data[0]?.nguoiDung_id);
                })
                .catch(error => {
                    console.error('Error fetching nguoiDungid:', error);
                });
        }
    }, [id]);

    const decrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increase = () => {
        setQuantity(quantity + 1);
    };

    const handleSizeChange = (event) => {
        const selectedSizeName = event.target.value;
        setSelectedSize(selectedSizeName);
        
        // Find the selected size info based on the size name
        const selectedSizeInfo = product.productSizes.find(
            (sizeInfo) => sizeInfo.size.size_Name === selectedSizeName
        );
    
        if (selectedSizeInfo) {
            setProductSizeId(selectedSizeInfo.productsizeid);
        } else {
            console.error('Không tìm thấy productSizeId phù hợp.');
        }
    };

    const handleAddToCart = () => {
        if (nguoiDungid) {
            if (selectedSize && product && productSizeId) {
                const addToCartRequest = {
                    nguoiDungid: nguoiDungid,
                    productsizeid: productSizeId,
                    quantity: quantity,
                    price: product.price,
                };
    
                fetch(`http://localhost:8081/api/v2/cart/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(addToCartRequest),
                })
                    .then((response) => {
                        if (response.ok) {
                            console.log('Sản phẩm đã được thêm vào giỏ hàng', addToCartRequest);
                        
                        } else {
                            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng');
                        }
                    })
                    .catch((error) => {
                        console.error('Lỗi khi gọi API:', error);
                    });
            } else {
                console.error('Không thể thêm sản phẩm vào giỏ hàng. Vui lòng chọn kích thước.');
            }
        } else {
            console.error('Không thể thêm sản phẩm vào giỏ hàng vì không tìm thấy nguoiDungid. Hãy đăng nhập để thêm sản phẩm.');
            navigate('/dang-nhap'); // Navigate to your login route
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-4">
                        <img src={product.image} className="product-img" alt="" />
                    </div>
                    <div className="col">
                        <p className="product-name-detail">{product.Name_Product}</p>
                        <p className="product-price"> {product.price} $</p>
                        <h7 className="Shipping-text">Shipping</h7>
                        <p className="product-origin-detail">{product.origin}</p>
                        <div className="Quality">
                            <span className="Quantity-text">Số lượng</span>
                            <button className="decrease" onClick={decrease}>-</button>
                            <div className="control-value" id="value">{quantity}</div>
                            <button className="increase" onClick={increase}>+</button>
                        </div>
                        <div className="SizeSelection">
                            <span className="SizeSelection-text">Chọn kích thước:</span>
                            <div className="size-options">
                                {sizeName.map((size, index) => (
                                    <div
                                        key={index}
                                        className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                        onClick={() => handleSizeChange({ target: { value: size } })}
                                    >
                                        <div className="size-circle">{size}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="add-to-cart">
                            <button className="add-to-cart-button" onClick={handleAddToCart}>
                                <FiShoppingCart className="cart--icon-plus" /> Thêm vào giỏ hàng
                            </button>
                        </div>
                        <div className="buy-now">
                            <button className="buy-now-button">Mua ngay</button>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col">
                        <h4 className="product-description">Describe Product</h4>
                        <p className="product-description-list">{product.description}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DetailProduct;
