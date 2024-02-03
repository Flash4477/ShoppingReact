import React, { useEffect, useState } from 'react';
import '../FileCss/Admin.css';
import { MdEdit, MdDelete, MdPerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

    const [products, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 6; // Số lượng sản phẩm trên mỗi trang
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);

    const handleLogoutClick = () => {
        sessionStorage.removeItem('email');
        navigate('/');
    };

    const handleAddEmployeeClick = () => {
        setShowAddEmployeeModal(true);
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    // Function to handle page change
    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page - 1);
    };




    const handleDeleteClick = (products) => {
        if (products.Product_id !== '') {
            setEditProductData({
                Product_id: products.Product_id,
                // other fields...
            });
            setShowDeleteModal(true);

        } else {
            // Handle the case where Product_id is empty
            console.error('Product_id is empty');
        }
    };



    const [editProductData, setEditProductData] = useState({
        Product_id: '',
        Name_Product: '',
        image: null,
        description: '',
        price: '',
        price_old: '',
        stock_quantity: '',
        brand: '',
        origin: '',
        size: '',
    });


    // Calculate total page count based on the total number of products
    const totalProducts = 100; // Replace this with your actual total number of products
    const totalPageCount = Math.ceil(totalProducts / pageSize);

    // Display a fixed number of page numbers (e.g., 5 pages)
    const pagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = Math.min(totalPageCount, startPage + pagesToShow - 1);

    // Adjust startPage when approaching the last few pages
    if (endPage - startPage < pagesToShow - 1) {
        startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);


    const handleInputChange = (event, fieldName) => {
        const value = event.target.value;

        setEditProductData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        try {
            // Lấy dữ liệu từ các trường nhập liệu
            const nameProduct = e.target.elements.nameProduct.value;
            const description = e.target.elements.description.value;
            const price = e.target.elements.price.value;
            const priceOld = e.target.elements.priceOld.value;
            const stockQuantity = e.target.elements.stockQuantity.value;
            const brand = e.target.elements.brand.value;
            const origin = e.target.elements.origin.value;
            const sizeInput = e.target.elements.size.value;

            // Kiểm tra xem người dùng đã chọn ảnh chưa
            if (!selectedImage) {
                console.error('Vui lòng chọn một hình ảnh');
                return;
            }

            // Tạo đối tượng FormData và thêm ảnh vào đó
            const formData = new FormData();
            formData.append('file', selectedImage);

            // Tiến hành tải ảnh lên và nhận đường dẫn từ server
            const responseImage = await fetch("http://localhost:8081/api/v2/products/uploadImage", {
                method: 'POST',
                body: formData,
            });

            if (!responseImage.ok) {
                throw new Error(`Tải ảnh lên thất bại với mã trạng thái ${responseImage.status}`);
            }

            const imageData = await responseImage.json();
            console.log('Dữ liệu hình ảnh:', imageData);
            if (!imageData.imageUrl) {
                throw new Error('Tải ảnh lên thất bại. Không có đường dẫn hình ảnh.');
            }

            console.log('Tải ảnh lên thành công', imageData.imageUrl);

            // Tách dữ liệu kích thước và số lượng từ chuỗi nhập liệu
            const sizes = sizeInput.split(',').map(sizeInfo => {
                const [sizeName, quantity] = sizeInfo.trim().split(':');
                return { size_Name: sizeName, quantity_size: parseInt(quantity, 10) || 0 };
            });

            // Gọi API thêm sản phẩm với đường dẫn hình ảnh nhận được
            const url = `http://localhost:8081/api/v2/product`;
            const responseProduct = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name_Product: nameProduct,
                    image: imageData.imageUrl,
                    description: description,
                    price: price,
                    price_old: priceOld,
                    stock_quantity: stockQuantity,
                    brand: brand,
                    origin: origin,
                    size: sizes,
                }),
            });

            if (!responseProduct.ok) {
                throw new Error(`Add request failed with status ${responseProduct.status}`);
            }

            const productData = await responseProduct.json();
            console.log('Add successful', productData);

            // Tùy chỉnh logic sau khi thêm thành công nếu cần
            setShowAddEmployeeModal(false);
            // Có thể cập nhật danh sách sản phẩm hoặc thực hiện các hành động khác sau khi thêm sản phẩm thành công
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            // Xử lý lỗi theo cách bạn muốn
        }
    };








    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            // Assuming you have the product ID available in editProductData.productId
            const Product_id = editProductData.Product_id;



            const url = `http://localhost:8081/api/v2/products/${Product_id}`;

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editProductData),
            });

            if (!response.ok) {
                throw new Error(`Edit request failed with status ${response.status}`);
            }

            const data = await response.json();

            console.log('Edit successful', data);
            setShowEditModal(false);
            // Optionally, you can update the state or perform other actions after a successful edit
        } catch (error) {
            console.error('Error editing product:', error);
            // Handle error as needed
        }
    };





    const handleEditClick = (Product_id) => {
        fetch(`http://localhost:8081/api/v2/products/?productId=${Product_id}`)
            .then((response) => response.json())
            .then((data) => {
                setEditProductData({
                    Product_id: data.Product_id,
                    Name_Product: data.Name_Product,
                    image: data.image,
                    description: data.description,
                    price: data.price,
                    price_old: data.price_old,
                    stock_quantity: data.stock_quantity,
                    brand: data.brand,
                    origin: data.origin,
                    size: data.productSizes.map((productSize) => productSize.size.size_Name).join(', '), // Dùng map để lấy ra tên size và join thành chuỗi
                });
                setShowEditModal(true);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
                // Handle error as needed
            });
    };


    const handleDeleteConfirmation = async (productIdToDelete) => {
        try {
            if (productIdToDelete !== '') {
                // Continue with the delete request
                const url = `http://localhost:8081/api/v2/products/${productIdToDelete}`;
                const response = await fetch(url, {
                    method: 'DELETE',
                    // other headers...
                });
                window.location.reload(true);
                if (!response.ok) {
                    throw new Error(`Delete request failed with status ${response.status}`);
                }

                const data = await response.json();
                console.log('Delete successful', data);

                setShowDeleteModal(false);
                // Optionally, you can update the state or perform other actions after a successful delete
            } else {
                // Handle the case where Product_id is empty
                console.error('Product_id is empty');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            // Handle error as needed
        }
    };






    useEffect(() => {
        fetch(`http://localhost:8081/api/v2/products/getall?page=${currentPage}&size=${pageSize}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data.content);
            })
    }, [currentPage])


    useEffect(() => {
        // Lấy giá trị email từ sessionStorage
        const email = sessionStorage.getItem('email');

        // Kiểm tra xem email có tồn tại
        if (email) {
            // Thực hiện yêu cầu API với giá trị email
            fetch(`{{url}}/admin/getAdminByEmail?email=${email}`)
                .then(response => response.json())
                .then(data => {

                    setAdmins([data.content]);
                    console.log(data);
                })
                .catch(error => {
                    // Xử lý lỗi khi yêu cầu API thất bại
                    console.error('Error fetching data:', error);
                });

        }
    }, []);







    return (

        <div>
            <div className="left-menu">
                <ul>
                    <li><a href="http://localhost:3000/Admin/quanlysanpham">Quản lý Sản Phẩm</a></li>
                    <li><a href="http://localhost:3000/Admin/ManageCus">Quản lý đơn hàng</a></li>
                    <li><a href="http://localhost:3000/Admin/ManageOrder">Quản lý Khách Hàng</a></li>
                    {/* Thêm các mục menu khác nếu cần */}
                </ul>
            </div>
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="user-icon" onMouseEnter={() => setShowLogout(true)} onMouseLeave={() => setShowLogout(false)}>
                                    <MdPerson />
                                    {showLogout && (
                                        <div className="logout-button" onClick={handleLogoutClick}>

                                            {admins.map(admin => (
                                                <span key={admin.ID}>{admin.name_admin}</span>
                                            ))}

                                            Đăng xuất
                                        </div>
                                    )}
                                </div>

                                <div className="col-sm-6">
                                    <h2>Manage <b>Product</b></h2>
                                </div>

                                <div className="col-sm-6">
                                    <a className="btn btn-success" data-toggle="modal" onClick={handleAddEmployeeClick}>
                                        <MdEdit /> <span>Add New Product</span>
                                    </a>
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
                                    <th>ProductID</th>
                                    <th>NameProduct</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Price Old</th>
                                    <th>Image</th>
                                    <th>Stock Quantity</th>
                                    <th>Origin</th>
                                    <th>Brand</th>
                                    <th>Size</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.Product_id}>

                                        {/* Render product data dynamically */}
                                        <td>
                                            <span className="custom-checkbox">
                                                <input type="checkbox" id={`checkbox${product.Product_id}`} name="options[]" value={product.Product_id} />
                                                <label htmlFor={`checkbox${product.Product_id}`} />
                                            </span>
                                        </td>
                                        <td>{product.Product_id}</td>
                                        <td >{product.Name_Product}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>{product.price_old}</td>
                                        <td>
                                            <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} />
                                        </td>
                                        <td>{product.stock_quantity}</td>
                                        <td>{product.origin}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.productSizes.map((productSize) => productSize.size.size_Name).join(', ')}</td>
                                        <td>
                                            <a className="edit" data-toggle="modal" onClick={() => handleEditClick(product.Product_id)}>
                                                <i className="material-icons" data-toggle="tooltip" title="Edit"><MdEdit /></i>
                                            </a>

                                            <a className="delete" data-toggle="modal" onClick={() => handleDeleteConfirmation(product.Product_id)}>
                                                <i className="material-icons" data-toggle="tooltip" title="Delete"><MdDelete /></i>
                                            </a>
                                        </td>
                                        {/* ... (other product fields) */}
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        <div className="clearfix">
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                    <a className="page-link" onClick={() => handlePageChange(currentPage)}>Previous</a>
                                </li>
                                {/* Display page numbers */}
                                {pageNumbers.map((page) => (
                                    <li key={page} className={`page-item ${currentPage === page - 1 ? 'active' : ''}`}>
                                        <a className="page-link" onClick={() => handlePageChange(page)}>
                                            {page}
                                        </a>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPageCount - 1 ? 'disabled' : ''}`}>
                                    <a className="page-link" onClick={() => handlePageChange(currentPage + 2)}>Next</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Modal HTML */}
            <div id="addEmployeeModal" className={`modal fade ${showAddEmployeeModal ? 'show' : ''}`} style={{ display: showAddEmployeeModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleAddSubmit}>
                            <div className="modal-header">
                                <h4 className="modal-title">Add Product</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={() => setShowAddEmployeeModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="nameProduct">Name Product</label>
                                    <input type="text" className="form-control" id="nameProduct" name="nameProduct" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    <input type="file" className="form-control-file" id="image" name="image" onChange={handleImageChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control" id="description" name="description" required defaultValue={""} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input type="text" className="form-control" id="price" name="price" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="priceOld">Price OLD</label>
                                    <input type="text" className="form-control" id="priceOld" name="priceOld" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stockQuantity">Stock Quantity</label>
                                    <input type="text" className="form-control" id="stockQuantity" name="stockQuantity" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="brand">Brand</label>
                                    <input type="text" className="form-control" id="brand" name="brand" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="origin">Origin</label>
                                    <input type="text" className="form-control" id="origin" name="origin" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="size">Size</label>
                                    <input type="text" className="form-control" id="size" name="size" required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => setShowAddEmployeeModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-success">Add</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            {/* Edit Modal HTML */}
            <div id="editEmployeeModal" className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleEditSubmit}>
                            <div className="modal-header">
                                <h4 className="modal-title">Edit Product</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={() => setShowEditModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name Product</label>
                                    <input type="text" className="form-control" value={editProductData.Name_Product} onChange={(e) => handleInputChange(e, 'Name_Product')} required />
                                </div>
                                <div className="form-group">
                                    <label>Image</label>
                                    <input type="file" className="form-control-file" onChange={handleImageChange} />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea className="form-control" value={editProductData.description} onChange={(e) => handleInputChange(e, 'description')} required />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" className="form-control" value={editProductData.price} onChange={(e) => handleInputChange(e, 'price')} required />
                                </div>
                                <div className="form-group">
                                    <label>Price Old</label>
                                    <input type="text" className="form-control" value={editProductData.price_old} onChange={(e) => handleInputChange(e, 'price_old')} />
                                </div>
                                <div className="form-group">
                                    <label>Stock Quantity</label>
                                    <input type="text" className="form-control" value={editProductData.stock_quantity} onChange={(e) => handleInputChange(e, 'stock_quantity')} />
                                </div>
                                <div className="form-group">
                                    <label>Brand</label>
                                    <input type="text" className="form-control" value={editProductData.brand} onChange={(e) => handleInputChange(e, 'brand')} />
                                </div>
                                <div className="form-group">
                                    <label>Origin</label>
                                    <input type="text" className="form-control" value={editProductData.origin} onChange={(e) => handleInputChange(e, 'origin')} />
                                </div>
                                <div className="form-group">
                                    <label>Size</label>
                                    <input type="text" className="form-control" value={editProductData.size} onChange={(e) => handleInputChange(e, 'size')} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-info">Save</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
            {/* Delete Modal HTML */}
            <div id="deleteEmployeeModal" className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleDeleteConfirmation(editProductData.Product_id);

                        }}>
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
                                <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmation}>Delete</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Admin;
