package com.example.springrestapi.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.springrestapi.Model.LoginUser;
import com.example.springrestapi.Model.User;
import com.example.springrestapi.Reponse.LoginMessage;
import com.example.springrestapi.Reponse.RegisterMessage;
import com.example.springrestapi.Repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImlp implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public RegisterMessage addUser(User user) {
		try {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			userRepository.save(user);
			return new RegisterMessage("User added successfully", true);
		} catch (Exception ex) {
			return new RegisterMessage("Failed to add user: " + ex.getMessage(), false);
		}
	}

	@Override
	public LoginMessage loginUser(LoginUser loginUser) {
		User user = userRepository.findByEmail(loginUser.getEmail());
		if (user == null) {
			return new LoginMessage("Người dùng không tồn tại", false);
		}
		if (passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
			return new LoginMessage("Đăng nhập thành công", true);
		} else {
			return new LoginMessage("Đăng nhập thất bại. Sai mật khẩu", false);
		}
	}

	@Override
	public User getSingleUser(Long NguoiDung_id) {
		Optional<User> userOptional = userRepository.findById(NguoiDung_id);

		if (userOptional.isPresent()) {
			return userOptional.get();
		} else {
			// Xử lý trường hợp không tìm thấy người dùng
			// Có thể trả về một giá trị null hoặc một giá trị mặc định khác tùy theo yêu
			// cầu của bạn
			return null;
		}
	}

	@Override
	public List<User> getUsersByEmail(String email) {
		return userRepository.findAllByEmail(email);
	}

	@Transactional
	@Override
	public void updateAddressByEmail(String email, String newAddress) {
		userRepository.updateAddressByEmail(email, newAddress);
	}

	@Transactional
	@Override
	public void updateUserInfoByEmail(String email, String firstName, String lastName, String phoneNumber,
			String address) {
		userRepository.updateUserInfoByEmail(email, firstName, lastName, phoneNumber, address);
	}

	 @Override
	    public void updateUser(User user) {
	        // Implement the logic to update the user in the database
	        userRepository.save(user);  // Assuming you are using a repository for user data
	    }

	@Override
	public List<User> getAllUsers() {
		  return userRepository.findAll();
		
	}

	@Override
	public void DeleteUser(Long NguoiDung_id) {
		  Optional<User> optionalUser = userRepository.findById(NguoiDung_id);
		  if (optionalUser.isPresent()) {
		        // If exists, delete the user
		        userRepository.deleteById(NguoiDung_id);
		    } else {
		        // Handle the case when the user doesn't exist
		        throw new RuntimeException("User not found with ID: " + NguoiDung_id);
		    }
	}

	@Override
	public Page<User> getAllUser(Pageable pageable) {
		return userRepository.findAll(pageable);
	}

	

	
}
