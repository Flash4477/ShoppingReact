package com.example.springrestapi.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.springrestapi.Model.Admin;
import com.example.springrestapi.Model.LoginAdmin;
import com.example.springrestapi.Reponse.LoginMessage;
import com.example.springrestapi.Repository.AdminRepository;

import jakarta.transaction.Transactional;


@Service
public class AdminServiceImlp implements AdminService {
	
	@Autowired
	public AdminRepository adminRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	

	@Override
	public LoginMessage loginAdmin(LoginAdmin loginAdmin) {
	    Admin admin = adminRepository.findByEmail(loginAdmin.getEmail());
	    
	    if (admin == null) {
	        return new LoginMessage("Người dùng không tồn tại", false);
	    }

	    // Kiểm tra xem mật khẩu nhập vào có phải là mật khẩu thô
	    if (loginAdmin.getPassword().equals(admin.getPassword())) {
	        return new LoginMessage("Đăng nhập thành công", true);
	    } else {
	        return new LoginMessage("Đăng nhập thất bại. Sai mật khẩu", false);
	    }
	}


	@Transactional
    public void migratePasswordsToBCrypt() {
        List<Admin> admins = adminRepository.findAll();

        for (Admin admin : admins) {
            // Migrate each password to BCrypt
            String oldPassword = admin.getPassword();
            String newPassword = passwordEncoder.encode(oldPassword);
            admin.setPassword(newPassword);
        }

        // Save the updated admins with BCrypt passwords
        adminRepository.saveAll(admins);
    }


	@Override
	public List<Admin> getAllAdmins() {
		 return adminRepository.findAll();
	}


	@Override
	public Admin getAdminByEmail(String email) {
		 return adminRepository.findByEmail(email);
	}


	
}
