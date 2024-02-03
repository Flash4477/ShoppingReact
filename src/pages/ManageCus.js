import React, { useEffect, useState } from 'react';
import '../FileCss/Admin.css';
import { MdEdit, MdDelete } from 'react-icons/md'; // Import biểu tượng từ react-icons

const ManageCus = () => {

    const [users, setUsers] = useState([]);
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);



    const handleDeleteConfirmation = async (userIdToDelete) => {
        setShowDeleteModal(true);
        setUserIdToDelete(userIdToDelete);
    };


    const handleDeleteUser = async () => {
        try {
            if (userIdToDelete) {
                await fetch(`http://localhost:8081/api/v2/user/delete/${userIdToDelete}`, {
                    method: 'DELETE',
                });

                // Update the state after successful delete
                setUsers(prevUsers => prevUsers.filter(user => user.NguoiDung_id !== userIdToDelete));
                console.log('Delete successful');
                setShowDeleteModal(false);
                setUserIdToDelete(null);
                window.location.reload();
            } else {
                console.error('userIdToDelete is null');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    useEffect(() => {
        // Fetch all users
        fetch('http://localhost:8081/api/v2/user/all')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);







    return (

        <div>
            <div className="left-menu">
                <ul>
                    <li><a href="http://localhost:3000/Admin/quanlysanpham">Quản lý Sản Phẩm</a></li>
                    <li><a href="http://localhost:3000/Admin/ManageCus">Quản lý Khách Hàng</a></li>
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
                                    <th>User ID</th>
                                    <th>NameUser</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    {/* Add additional fields as needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.NguoiDung_id}>
                                        <td>
                                            <span className="custom-checkbox">
                                                <input type="checkbox" id={`checkbox${user.NguoiDung_id}`} name="options[]" value={user.NguoiDung_id} />
                                                <label htmlFor={`checkbox${user.NguoiDung_id}`} />
                                            </span>
                                        </td>
                                        <td>{user.nguoiDung_id}</td>
                                        <td>{user.name_User}</td>
                                        <td>{user.email}</td>
                                        <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>
                                            {user.password}
                                        </td>

                                        <td>{user.phone_number}</td>
                                        <td>{user.address}</td>
                                        {/* Add additional fields as needed */}
                                        <td>
                                            {/* Render button for deleting user */}
                                            <a className="delete" data-toggle="modal" onClick={() => handleDeleteConfirmation(user.nguoiDung_id)}>
                                                <i className="material-icons" data-toggle="tooltip" title="Delete"><MdDelete /></i>
                                            </a>
                                        </td>
                                        {/* ... (other user fields) */}
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>


            {/* Delete Modal HTML */}
            <div id="deleteUserModal" className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h4 className="modal-title">Delete User</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={() => setShowDeleteModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this user?</p>
                                <p className="text-warning"><small>This action cannot be undone.</small></p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>
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

export default ManageCus;
