import React from 'react';
import '../FileCss/Footer.css'; // Import tệp CSS cho footer
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import các biểu tượng từ react-icons
const Footer = () => {
    return (
        <footer className='footerr'>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h4>Thông tin</h4>
                        <ul className='text-info'>
                            <li><a href="#">VỀ CHÚNG TÔI </a></li>
                            <li><a href="#">Tin tức</a></li>
                            <li><a href="#">Liên hệ</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>CHĂM SÓC KHÁCH HÀNG</h5>
                        <ul className='text-info'>
                            <li><a href="#">Chính sách đổi trả</a></li>
                            <li><a href="#">Hướng dẫn mua hàng</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h4>LIÊN HỆ & ĐỊA CHỈ </h4>
                        <p>Floors 4-5-6, Capital Place Building, No. 29, Lieu Giai Street, Ngoc Khanh ward, Ba Dinh District, Hanoi, Vietnam</p>
                        <p>Email: example@example.com</p>
                        <p>Điện thoại: +123 456 789</p>
                    </div>
                    <div className="col-md-3">
                        <h4>THEO DÕI </h4>
                        <ul className="social-icons">
                            <li><a href="#"><FaFacebook /></a></li>
                            <li><a href="#"><FaTwitter /></a></li>
                            <li><a href="#"><FaInstagram /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
