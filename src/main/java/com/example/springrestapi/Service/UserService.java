package com.example.springrestapi.Service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.example.springrestapi.Model.LoginUser;
import com.example.springrestapi.Model.Product;
import com.example.springrestapi.Model.User;
import com.example.springrestapi.Reponse.LoginMessage;
import com.example.springrestapi.Reponse.RegisterMessage;

public interface UserService {
	RegisterMessage addUser(User user);

	LoginMessage loginUser(LoginUser loginUser);

	User getSingleUser(Long NguoiDung_id);

	List<User> getUsersByEmail(String email);

	void updateAddressByEmail(String email, String newAddress);

	void updateUserInfoByEmail(String email, String firstName, String lastName, String phoneNumber, String address);

	void updateUser(User user); // Add this method for updating the user directly

	List<User> getAllUsers();
	
	void DeleteUser(Long NguoiDung_id);
	
	Page<User> getAllUser(Pageable pageable);
}
