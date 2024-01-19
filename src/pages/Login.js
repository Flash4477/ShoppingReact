import React, { useState } from "react";
import Header from "./Header";
import '../FileCss/Login.css';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Thêm biến trạng thái lỗi
  const navigate = useNavigate();

  const handleLogin = () => {

    setError(""); // Đặt giá trị lỗi về rỗng khi người dùng thử đăng nhập lại

    if (!email || !password) {
      setError("Vui lòng điền đầy đủ email và password.");
      return;
    }

    fetch("http://localhost:8081/api/v2/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          console.log("Đăng nhập thành công");
          
          // Lưu token và thông tin người dùng vào sessionStorage
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("email",email);
          const userId = sessionStorage.getItem('userId',data.userId);
          // Thực hiện các thay đổi trạng thái sau khi đăng nhập thành công
          // Ví dụ: Cập nhật state hoặc context, và sau đó chuyển hướng trang
          // Đảm bảo cập nhật state hoặc context trước khi chuyển hướng
  
  
          // Sau khi cập nhật state hoặc context, thực hiện chuyển hướng
          navigate("/");
        } else {
          // Xử lý lỗi dựa trên message từ máy chủ
          if (data.message === "Email không chính xác") {
            setError("Email không chính xác");
          } else if (data.message === "Password không chính xác") {
            setError("Password không chính xác");
          } else {
            setError("Lỗi không xác định: " + data.message);
          }
        }
      })
      .catch((error) => {
        console.error("Lỗi kết nối tới máy chủ: " + error);
      });
  
  };

  

  const handleAdminLogin = () => {
    setError(""); // Clear any existing error messages

    if (!email || !password) {
      setError("Vui lòng điền đầy đủ email và password.");
      return;
    }

    fetch("http://localhost:8081/api/v2/admin/login", { // Update the API endpoint for admin login
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          console.log("Đăng nhập quản trị thành công");

          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("email", email);
          const adminId = sessionStorage.getItem('adminId', data.adminId);

          // Handle state/context updates and redirection for successful admin login
          // ...

          navigate("/Admin/quanlysanpham"); // Redirect to the admin dashboard or any desired route
        } else {
          // Handle admin login errors based on the message from the server
          if (data.message === "Email không chính xác") {
            setError("Email không chính xác");
          } else if (data.message === "Password không chính xác") {
            setError("Password không chính xác");
          } else {
            setError("Lỗi không xác định: " + data.message);
          }
        }
      })
      .catch((error) => {
        console.error("Lỗi kết nối tới máy chủ: " + error);
      });
  };

  
  return (
    <div className="Login">
      <Header />
      <div className="form-Login">
      <div className="form-container">
        <h2 className="form-title">Đăng nhập</h2>
        {error && <div className="error-message">{error}</div>} {/* Hiển thị thông báo lỗi */}
        <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="button" onClick={handleLogin}>
          Đăng nhập
        </button>

        <button className="button Admin " onClick={handleAdminLogin}>
          Đăng nhập Admin
        </button>
      </div>
      
    </div>
    </div>
    
  );
} 

export default Login;
