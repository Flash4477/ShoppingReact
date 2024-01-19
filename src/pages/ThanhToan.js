import React, { useState, useEffect } from "react";
import '../FileCss/ThanhToan.css'; // Import CSS file

function ThanhToan() {
    const [cartItems, setCartItems] = useState([]);
    const email = sessionStorage.getItem('email');
    const [userId, setUserId] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [address, setAddress] = useState(''); // Địa chỉ hiện tại
    const userData = cartItems[0]; // Lấy thông tin người dùng từ mục đầu tiên trong giỏ hàng
    const shippingFee = 35; // Phí vận chuyển mẫu, thay thế bằng giá trị thực tế
    const totalCartValue = parseInt(sessionStorage.getItem('totalCartValue'), 10) || 0;
    const finalTotal = totalCartValue + shippingFee;

    console.log(cartItems);
    // Tạo một mảng rỗng để chứa tất cả các CartId
    const allCartIds = cartItems.map(item => item.cart_id);

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Tạo đơn hàng và lấy OrderId
    const createOrder = async () => {
        try {

            const orderData = {
                nguoiDung: { nguoiDung_id: userId },// Chỉnh sửa ở đây để chứa nguoiDung_id
                subtotal: finalTotal,
                paymentmethod: 'Thanh toán khi giao hàng (COD)',
                // Các thông tin khác về đơn hàng
            };

            const response = await fetch('http://localhost:8081/api/v2/orders/createOrders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                console.log('Đã tạo đơn hàng thành công.');
                setOrderSuccess(true);

                // Gọi API xóa sản phẩm từ giỏ hàng sau khi đơn hàng được tạo thành công
                for (let i = 0; i < cartItems.length; i++) {
                    const productsizeid = cartItems[i].productSizeId;

                    const removeResponse = await fetch('http://localhost:8081/api/v2/cart/remove', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            nguoiDungid: userId,
                            productsizeid: productsizeid,
                        })
                    });

                    if (removeResponse.ok) {
                        console.log(`Đã xóa sản phẩm khỏi giỏ hàng: ${productsizeid}`);
                    } else {
                        console.error('Lỗi xóa sản phẩm khỏi giỏ hàng:', removeResponse.status);
                    }
                }


                // Lấy orderId đã tạo ra từ phản hồi
                const orderDataResponse = await response.json();
                const orderId = orderDataResponse.order_id;
                console.log(orderDataResponse);
                console.log(orderDataResponse.order_id);
                // Gọi hàm để tạo OrderCart sau khi tạo đơn hàng
                createOrderCart(orderId);
            } else {
                console.error('Lỗi khi tạo đơn hàng:', response.status);
            }

        } catch (error) {
            console.error('Lỗi khi thực hiện tạo đơn hàng và OrderCart:', error);
        }
    };
    const createOrderCart = async (orderId) => {
        try {
            const orderCartDataArray = [];

            // Lặp qua tất cả các mục giỏ hàng và tạo bản ghi OrderCart tương ứng
            for (const cartItem of cartItems) {
                const orderCartData = {
                    orderId: orderId,
                    productSizeId: cartItem.productSizeId, // Giả sử bạn có productSizeId trong cartItem của bạn
                    QuantityOrder: cartItem.quantity
                };
                orderCartDataArray.push(orderCartData);
            }

            const orderCartResponse = await fetch('http://localhost:8081/api/v2/ordercart/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderCartDataArray),
            });

            console.log(orderCartDataArray);
            console.log(orderCartResponse);

            if (orderCartResponse.ok) {
                console.log('Tạo bản ghi OrderCart thành công cho tất cả các mục giỏ hàng.');
            } else {
                console.error('Lỗi khi tạo bản ghi trong bảng OrderCart:', orderCartResponse.status);
            }
        } catch (error) {
            console.error('Lỗi khi tạo các bản ghi OrderCart:', error);
        }
    };






    const handleAddressChange = (event) => {
        const newAddressValue = event.target.value;
        setNewAddress(newAddressValue);

        if (newAddressValue === '' || newAddressValue === address) {
            setAddress('');
        }
    };


    const handleBlur = () => {
        if (newAddress !== address) {
            // Chỉ cập nhật địa chỉ khi có sự thay đổi so với địa chỉ hiện tại
            setAddress(newAddress);
            // Thực hiện gọi API cập nhật địa chỉ với newAddress
            const updateRequest = {
                newAddress: newAddress,
            };

            fetch(`http://localhost:8081/api/v2/user/updateAddress/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateRequest),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Đã cập nhật địa chỉ thành công.");
                    } else {
                        console.error("Lỗi khi cập nhật địa chỉ người dùng:", response.status);
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi gọi API cập nhật địa chỉ người dùng:", error);
                });
        }
    };


    useEffect(() => {
        const fetchUserIdByEmail = async () => {
            try {
                if (email) {
                    const response = await fetch(`http://localhost:8081/api/v2/user/getByEmail?email=${email}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.length > 0) {
                            setUserId(data[0].nguoiDung_id);
                            setAddress(data[0].address); // Lấy địa chỉ hiện tại
                        }
                    }
                }
            } catch (error) {
                console.error('Lỗi khi gọi API để lấy userId dựa trên email:', error);
            }
        };

        fetchUserIdByEmail();
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
                console.error('Lỗi khi gọi API để lấy thông tin giỏ hàng:', error);
            }
        };

        fetchCartData();
    }, [userId]);




    return (
        <main>

            <div className="row g-5 container">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">Your cart</span>
                        <span className="badge bg-primary rounded-pill">{totalQuantity}</span>
                    </h4>
                    <ul className="list-group mb-3">
                        {cartItems.map((item, index) => (
                            <li className="list-group-item d-flex justify-content-between lh-sm" key={index}>
                                <img className="img" src={item.image} alt={item.nameProduct} />
                                <div>
                                    <h6 className="my-0">Name Product: {item.nameProduct}</h6>
                                    <small className="text-muted">SL: {item.quantity}</small>
                                    <small className="text-muted-size">Size: {item.nameSize}</small>
                                </div>
                                <span className="text-muted">Price: ${item.price}</span>
                            </li>
                        ))}
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Tạm Tính </span>

                            <strong>${totalCartValue}</strong> {/* Hiển thị totalCartValue */}
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Phí Vận Chuyển </span>
                            <strong>${shippingFee}</strong>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Tổng Cộng</span>
                            <strong>${finalTotal}</strong> {/* Hiển thị tổng cuối cùng */}
                        </li>
                    </ul>
                </div>
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation" noValidate>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                First name<label htmlFor="firstName" className="form-label">First name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="" value={userData ? userData.firstName : ''} required />
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>

                            <div className="col-sm-6">
                                Last name<label htmlFor="lastName" className="form-label">Last name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="" value={userData ? userData.lastName : ''} required />
                                <div className="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>

                            <div className="col-12">
                                NameUser<label htmlFor="email" className="form-label">NameUser<span className="text-muted"></span></label>
                                <input type="email" className="form-control" id="name_User" placeholder="" value={userData ? userData.name_User : ''} readOnly />
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>

                            <div className="col-12">
                                Email<label htmlFor="email" className="form-label">Email<span className="text-muted">(Optional)</span></label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com" value={email} readOnly />
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>

                            <div className="col-12">
                                Address<label htmlFor="address" className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    placeholder=""
                                    value={newAddress || address}
                                    onBlur={handleBlur} // Khi người dùng thoát khỏi ô input địa chỉ
                                    onChange={handleAddressChange} // Lắng nghe sự thay đổi của địa chỉ
                                    required
                                />

                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>

                            <div className="col-12">
                                Phone Number<label htmlFor="phonenumber" className="form-label">Phone Number</label>
                                <input type="text" className="form-control" id="phonenumber" placeholder="" value={userData ? userData.phoneNumber : ''} required />
                                <div className="invalid-feedback">
                                    Please enter your phone number.
                                </div>
                            </div>
                        </div>

                        <hr className="my-4" />

                        <h4 className="mb-3">Payment</h4>

                        <div className="my-3">
                            <div className="form-check">
                                <input type="radio" id="credit" name="paymentMethod" className="form-check-input" checked required />
                                <label className="form-check-label" htmlFor="credit">Thanh toán khi giao hàng (COD)</label>
                                <p>1. Khi click vào nút hoàn tất đơn hàng thì đơn hàng sẽ được hệ thống tự động xác nhận mà không cần phải gọi qua điện thoại, nếu điền thông tin địa chỉ và số điện thoại chính xác thì đơn hàng sẽ được vận chuyển từ 3-4-5 ngày tùy vùng miền.</p>
                                <p>2. Trường hợp đặt hàng xong nhưng muốn HỦY ĐƠN, vui lòng soạn tin nhắn theo cú pháp: SĐT ĐÃ ĐẶT ĐƠN (hoặc MÃ ĐƠN hoặc GMAIL ĐƠN HÀNG) + TÊN NGƯỜI NHẬN sau đó gửi qua các kênh online: Page Facebook, Instagram. Nhân viên check tin nhắn sẽ xử lý hủy giúp Quý KH</p>
                            </div>
                        </div>

                        <hr className="my-4" />
                        {orderSuccess ? (
                            <div className="alert alert-success" role="alert">
                                Đặt hàng thành công!
                            </div>
                        ) : null}

                        <button className="w-100 btn btn-danger btn-lg" type="button" onClick={() => {
                            createOrder(); // Gọi hàm tạo đơn hàng
                            createOrderCart(); // Gọi hàm tạo OrderCart

                        }}>
                            Hoàn tất đơn hàng
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default ThanhToan;
