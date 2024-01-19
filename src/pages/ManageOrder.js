import React, { useEffect, useState } from 'react';
import '../FileCss/Admin.css';
import { MdEdit, MdDelete } from 'react-icons/md'; // Import biểu tượng từ react-icons

const Admin = () => {

    const [orders, setOrders] = useState([]);
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [orderIdToDelete, setOrderIdToDelete] = useState(null);








    const handleDeleteConfirmation = async (orderIdToDelete) => {
        setShowDeleteModal(true);
        setOrderIdToDelete(orderIdToDelete); // Add this line to store the order ID
      
    };
    

    const handleDeleteOrder = async () => {
        try {
            if (orderIdToDelete) {
                await fetch(`http://localhost:8081/api/v2/orders/${orderIdToDelete}`, {
                    method: 'DELETE',
                });

                // Update the state after successful delete
                setOrders(prevOrders => prevOrders.filter(order => order.Order_id !== orderIdToDelete));
                console.log('Delete successful');
                setShowDeleteModal(false);
                setOrderIdToDelete(null); // Reset orderIdToDelete after deletion
            } else {
                console.error('orderIdToDelete is null');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };


    useEffect(() => {
        // Gọi API để lấy tất cả đơn hàng
        fetch('http://localhost:8081/api/v2/orders/all') // Đổi URL để phản ánh API mới
            .then(response => response.json())
            .then(data => {
                setOrders(data); // Đổi tên biến từ setProduct thành setOrders
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                // Xử lý lỗi theo cách bạn muốn
            });
    }, []); // Thêm một mảng trống để đảm bảo useEffect chỉ chạy một lần khi component được render







    return (

        <div>
            <div className="left-menu">
                <ul>
                    <li><a href="http://localhost:3000/Admin/quanlysanpham">Quản lý Sản Phẩm</a></li>
                    <li><a href="/">Quản lý Bảng Size </a></li>
                    <li><a href="/">Quản lý Khách Hàng</a></li>
                    <li><a href="http://localhost:3000/Admin/ManageOrder">Quản lý đơn hàng</a></li>
                    {/* Thêm các mục menu khác nếu cần */}
                </ul>
            </div>
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Manage <b>Orders</b></h2>
                                </div>
                                <div className="col-sm-6">

                                    <a className="btn btn-danger" data-toggle="modal">
                                        <MdDelete /> <span>Delete</span>
                                    </a>
                                </div>
                                <div id="addEmployeeModal" className={`modal fade ${showAddEmployeeModal ? 'show' : ''}`} style={{ display: showAddEmployeeModal ? 'block' : 'none' }}>
                                    {/* Phần modal content ở đây */}
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <span className="custom-checkbox">
                                            <input type="checkbox" id="selectAll" />
                                            <label htmlFor="selectAll" />
                                        </span>
                                    </th>
                                    <th>OrderID</th>
                                    <th>PaymentMethod</th>
                                    <th>CreatAt</th>
                                    <th>Subtotal</th>
                                    <th>User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.Order_id}>
                                        {/* Render order data dynamically */}
                                        <td>
                                            <span className="custom-checkbox">
                                                <input type="checkbox" id={`checkbox${order.Order_id}`} name="options[]" value={order.Order_id} />
                                                <label htmlFor={`checkbox${order.Order_id}`} />
                                            </span>
                                        </td>
                                        <td>{order.order_id}</td>
                                        <td>{order.paymentmethod}</td> {/* Đổi tên thuộc tính từ Name_Product thành Name_Order */}
                                        <td>{order.createAt}</td>
                                        <td>{order.subtotal}</td>
                                        <td>{order.nguoiDung.name_User}</td>
                                        <td>
                                            {/* Render button for deleting order */}
                                            <a className="delete" data-toggle="modal" onClick={() => handleDeleteConfirmation(order.order_id)}>
                                                <i className="material-icons" data-toggle="tooltip" title="Delete"><MdDelete /></i>
                                            </a>
                                        </td>
                                        {/* ... (other order fields) */}
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>


            {/* Delete Modal HTML */}
            <div id="deleteEmployeeModal" className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form >
                            <div className="modal-header">
                                <h4 className="modal-title">Delete Product</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={() => setShowDeleteModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this product?</p>
                                <p className="text-warning"><small>This action cannot be undone.</small></p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteOrder}>
                                    Delete
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Admin;
