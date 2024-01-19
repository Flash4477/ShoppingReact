import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../FileCss/Cart.css';
import { Link } from 'react-router-dom';


function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const email = sessionStorage.getItem('email');
    const [userId, setUserId] = useState(null);
    const [totalCartValue, setTotalCartValue] = useState(0); // State mới

    useEffect(() => {
        const fetchUserByEmail = async () => {
            try {
                if (email) {
                    const response = await fetch(`http://localhost:8081/api/v2/user/getByEmail?email=${email}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.length > 0) {
                            setUserId(data[0].nguoiDung_id);
                        }
                    }
                }
            } catch (error) {
                console.error('Lỗi khi gọi API để lấy thông tin người dùng:', error);
            }
        };

        fetchUserByEmail();
    }, [email]);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                if (userId) {
                    const response = await fetch(`http://localhost:8081/api/v2/cart/items/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setCartItems(data);
                    }
                }
            } catch (error) {
                console.error('Lỗi khi gọi API để lấy giỏ hàng:', error);
            }
        };

        fetchCartData();
    }, [userId]);


    useEffect(() => {
        const calculateTotalValue = () => {
            return cartItems.reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);
        };

        const calculatedTotalCartValue = calculateTotalValue(cartItems);
        setTotalCartValue(calculatedTotalCartValue);

        // Lưu totalCartValue vào sessionStorage
        sessionStorage.setItem('totalCartValue', calculatedTotalCartValue);
    }, [cartItems]);


    const removeItem = async (index) => {
        try {
            if (cartItems.length <= 0) {
                return; // Không có sản phẩm nào trong giỏ hàng.
            }
            const productsizeid = cartItems[index].productSizeId;

            const response = await fetch(`http://localhost:8081/api/v2/cart/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nguoiDungid: userId,
                    productsizeid: productsizeid,
                })
            });

            if (response.ok) {
                const updatedCartItems = [...cartItems];
                updatedCartItems.splice(index, 1);
                setCartItems(updatedCartItems);
            } else {
                console.error('Lỗi xóa sản phẩm khỏi giỏ hàng:', response.status);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API xóa sản phẩm:', error);
        }
    };

    const updateQuantity = async (index, newQuantity) => {
        try {
            const response = await fetch(`http://localhost:8081/api/v2/cart/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nguoiDungid: userId,
                    productsizeid: cartItems[index].productSizeId,
                    quantity: newQuantity,
                    price: cartItems[index].price,
                })
            });

            if (response.ok) {
                const updatedCartItems = [...cartItems];
                updatedCartItems[index].quantity = newQuantity;
                setCartItems(updatedCartItems);
            } else {
                // Xử lý lỗi nếu cần.
            }
        } catch (error) {
            console.error('Lỗi khi gọi API cập nhật số lượng sản phẩm:', error);
        }
    };

    const decreaseQuantity = async (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity > 1) {
            const newQuantity = updatedCartItems[index].quantity - 1;
            const data = {
                nguoiDungid: userId,
                productsizeid: updatedCartItems[index].productSizeId,
                quantity: newQuantity,
                price: updatedCartItems[index].price
            };

            try {
                const response = await fetch('http://localhost:8081/api/v2/cart/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    updatedCartItems[index].quantity = newQuantity;
                    setCartItems(updatedCartItems);
                } else {
                    console.error('Lỗi khi cập nhật số lượng hàng hóa:', response.status);
                }
            } catch (error) {
                console.error('Lỗi khi gọi API cập nhật số lượng sản phẩm:', error);
            }
        }
    };

    const increaseQuantity = async (index) => {
        const updatedCartItems = [...cartItems];
        const newQuantity = updatedCartItems[index].quantity + 1;
        const data = {
            nguoiDungid: userId,
            productsizeid: updatedCartItems[index].productSizeId,
            quantity: newQuantity,
            price: updatedCartItems[index].price
        };

        try {
            const response = await fetch('http://localhost:8081/api/v2/cart/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                updatedCartItems[index].quantity = newQuantity;
                setCartItems(updatedCartItems);
            } else {
                console.error('Lỗi khi cập nhật số lượng hàng hóa:', response.status);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API cập nhật số lượng sản phẩm:', error);
        }
    };

    const calculateTotalValue = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    const clearCart = () => {
        setCartItems([]);
    };



    return (
        <div>
            <Header />
            <div className="text-giohang">Giỏ hàng</div>
            <div className="cart-container">
                <div className="cart-items">
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div>
                                <img className="item-image" src={item.image} alt={item.nameProduct} />
                            </div>
                            <div className="item-details">
                                <p className="item-name">{item.nameProduct}</p>
                                <p className="item-size">{item.nameSize}</p>
                                <p className="item-price">{item.price}$</p>
                                <button className="remove-item" onClick={() => removeItem(index)}>Xóa</button>
                                <div className="item-quantity">
                                    <button onClick={() => decreaseQuantity(index)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increaseQuantity(index)}>+</button>
                                </div>
                                <p className="item-price-total">Tổng : {item.price * item.quantity}$</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-summary">
                    <table>
                        <tbody>
                            <tr>
                                <td className='text-checkout'>Tổng giá trị sản phẩm :</td>
                                <td className='text-totalValue'>${totalCartValue}</td>
                            </tr>
                            <tr>
                                <td className='text-checkout'>Tạm Tính:</td>
                                <td className='text-totalValue'>${totalCartValue}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to={`/thanhtoan/${userId}`}>
                        <button className="checkout-button">Thanh toán</button>
                    </Link>

                </div>
            </div>
            <Footer />

        </div>
    );
}

export default Cart;
