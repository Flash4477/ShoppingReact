import React, { useState, useEffect } from "react";
import '../FileCss/UserProfile.css'
import './Header';
import Header from "./Header";

function UserProfile() {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState({});
    const email = sessionStorage.getItem('email');
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        if (email) {
            // Gọi API để lấy thông tin người dùng dựa trên email đã lưu
            fetch(`http://localhost:8081/api/v2/user/getByEmail?email=${email}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Lỗi khi gọi API');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data && data.length > 0) {
                        setUserData(data[0]);
                    } else {
                        console.error('Không tìm thấy thông tin người dùng');
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi gọi API:', error);
                });
            // Gọi API để lấy thông tin đơn hàng của người dùng
            fetch(`http://localhost:8081/api/v2/orders/user/${email}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Lỗi khi gọi API');
                    }
                    return response.json();
                })
                .then((data) => {
                    setUserOrders(data);
                })
                .catch((error) => {
                    console.error('Lỗi khi gọi API để lấy thông tin đơn hàng:', error);
                });
        }
    }, [email]);

    const handleEditProfile = () => {
        setIsEditing(true);
        setEditedUserData({ ...userData });
    };

    const handleSaveProfile = () => {
        // Gọi API để cập nhật thông tin người dùng

        fetch(`http://localhost:8081/api/v2/user/updateInfo/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedUserData),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Cập nhật thành công ");
                    window.location.href = '/user-profile';
                } else {
                    throw new Error('Lỗi khi cập nhật thông tin người dùng');
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
                setIsEditing(false);
            })
            .catch((error) => {
                console.error('Lỗi khi cập nhật thông tin người dùng:', error);
            });
        console.log(handleSaveProfile);
        console.log("Data sent to API:", JSON.stringify(editedUserData));

    };



    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedUserData({}); // Đặt lại dữ liệu chỉnh sửa về trạng thái ban đầu
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedUserData({
            ...editedUserData,
            [name]: value,
        });
    };


    const handleImageChange = async (event) => {
        const file = event.target.files[0];
    
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
    
            // Create a temporary URL for the selected image
            const imageUrl = URL.createObjectURL(file);
    
            // Update the UI with the preview image
            setUserData((prevUserData) => ({
                ...prevUserData,
                image: imageUrl,
            }));
    
            // Call the API to update the user's profile image
            fetch(`http://localhost:8081/api/v2/user/updateImage/${email}`, {
                method: 'PUT',
                body: formData,
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Profile image updated successfully");
                        return response.json(); // Assuming the server returns updated user data
                    } else {
                        console.error('Failed to update profile image:', response.statusText);
                        throw new Error('Failed to update profile image');
                    }
                })
                .then((data) => {
                    // Update the UI with the new image URL
                    setUserData(data[0]);
                })
                .catch((error) => {
                    console.error('Error updating profile image:', error);
                });
        }
    };
    
    



    return (
        <div className="body-m">
            <Header />
            <div className="container emp-profile">
                <form method="post">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={userData.image} alt="" />
                                {isEditing ? (
                                    <div className="file btn btn-lg btn-primary">
                                        Change Photo
                                        <input
                                            type="file"
                                            name="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>{userData.name_User}</h5>
                                <h6>Customer</h6>
                                <p className="proile-rating">
                                    RANKINGS: <span>8/10</span>
                                </p>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="home-tab"
                                            data-toggle="tab"
                                            href="#home"
                                            role
                                            aria-selected="true"
                                        >
                                            About
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="profile-tab"
                                            data-toggle="tab"
                                            href="#profile"
                                            role
                                            aria-selected="false"
                                        >
                                            Timeline
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            {isEditing ? (
                                <div>
                                    <button
                                        className="profile-edit-btn"
                                        type="button"
                                        onClick={handleSaveProfile}
                                    >
                                        Save Profile
                                    </button>
                                    <button
                                        className="profile-edit-btn"
                                        type="button"
                                        onClick={handleCancelEdit}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="profile-edit-btn"
                                    type="button"
                                    onClick={handleEditProfile}
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="home"
                                    role="tabpanel"
                                >
                                    {isEditing ? (
                                        <div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>First Name</label>
                                                    <input
                                                        className="input-text-fn"
                                                        type="text"
                                                        name="first_name"
                                                        value={editedUserData.first_name || ''}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Last Name</label>
                                                    <input
                                                        className="input-text-ln"
                                                        type="text"
                                                        name="last_name"
                                                        value={editedUserData.last_name || ''}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Email</label>
                                                    <input
                                                        className="input-text-email"
                                                        type="text"
                                                        name="email"
                                                        value={editedUserData.email || ''}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Phone Number</label>
                                                    <input
                                                        className="input-text-phone"
                                                        type="text"
                                                        name="phone_number"
                                                        value={editedUserData.phone_number || ''}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label className="address-text">Address</label>
                                                    <input
                                                        className="input-text-address"
                                                        type="text"
                                                        name="address"
                                                        value={editedUserData.address || ''}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            {/* Add more input fields for other user attributes */}
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>First Name</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{userData.first_name}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Last Name</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{userData.last_name}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Email</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{userData.email}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Phone Number</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{userData.phone_number}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Address</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{userData.address}</p>
                                                </div>
                                            </div>
                                            {/* Display other user attributes here */}
                                        </div>
                                    )}
                                </div>
                                {/* Add tab content for Timeline */}
                            </div>
                            {/* Add a section to display user's order data */}
                            <div className="order-history">
                                <h3>Order Details</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="orderID-text">Order ID</th>
                                            <th className="orderDate-text">Create At</th>
                                            <th className="payment-text">Payment Method</th>
                                            <th className="total-text">Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userOrders.map((order) => (
                                            <tr key={order.order_id}>
                                                <td className="orderID-idx">#{order.order_id}</td>
                                                <td className="orderDate-idx">{order.createAt}</td>
                                                <td className="payment-idx">{order.paymentmethod}</td>
                                                <td className="total-idx">{order.subtotal}$</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            {/* End of order history section */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserProfile;
