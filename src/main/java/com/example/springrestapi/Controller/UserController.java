package com.example.springrestapi.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.springrestapi.Model.LoginUser;
import com.example.springrestapi.Model.Product;
import com.example.springrestapi.Model.User;
import com.example.springrestapi.Reponse.LoginMessage;
import com.example.springrestapi.Reponse.RegisterMessage;
import com.example.springrestapi.Repository.UserRepository;
import com.example.springrestapi.Request.UpdateAddressRequest;
import com.example.springrestapi.Request.UpdateUserInfoRequest;
import com.example.springrestapi.Service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping
@CrossOrigin("*")

public class UserController {

	private final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private Cloudinary cloudinary;

	
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/user/save")
	public ResponseEntity<RegisterMessage> saveUser(@RequestBody User user) {
	    RegisterMessage response = userService.addUser(user);

	    if (response.getStatus()) {
	        // If the status is true (success), return a 200 OK response with the RegisterMessage
	        return ResponseEntity.ok(response);
	    } else {
	        // If the status is false (failure), return a 400 Bad Request response with the RegisterMessage
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	    }
	}

	@GetMapping("/user/all")
	public ResponseEntity<List<User>> getAllUsers() {
	    List<User> users = userService.getAllUsers();

	    if (!users.isEmpty()) {
	        return ResponseEntity.ok(users); // Trả về danh sách tất cả người dùng
	    } else {
	        return ResponseEntity.notFound().build(); // Không có người dùng nào
	    }
	}




	@PostMapping("user/login")
	public ResponseEntity<LoginMessage> login(@RequestBody LoginUser loginUser) {
		LoginMessage loginResult = userService.loginUser(loginUser);

		if (loginResult.getMessage().equals("Login successfully")) {
			return ResponseEntity.ok(loginResult); // Đăng nhập thành công
		} else {
			return ResponseEntity.badRequest().body(loginResult); // Đăng nhập thất bại
		}
	}

	@GetMapping("/user/{NguoiDung_id}")
	public ResponseEntity<User> getSingleUser(@PathVariable Long NguoiDung_id) {
		User user = userService.getSingleUser(NguoiDung_id);

		if (user != null) {
			return ResponseEntity.ok(user); // Trả về thông tin người dùng
		} else {
			return ResponseEntity.notFound().build(); // Không tìm thấy người dùng
		}
	}
	
	@DeleteMapping("/user/delete/{NguoiDung_id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long NguoiDung_id) {
	    try {
	        userService.DeleteUser(NguoiDung_id);
	        return ResponseEntity.ok("User deleted successfully");
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");
	    }
	}


	@GetMapping("/user/getByEmail")
	public ResponseEntity<List<User>> getUsersByEmail(@RequestParam String email) {
		List<User> users = userService.getUsersByEmail(email);

		if (!users.isEmpty()) {
			return ResponseEntity.ok(users); // Trả về danh sách người dùng dựa trên email
		} else {
			return ResponseEntity.notFound().build(); // Không tìm thấy người dùng
		}
	}
	
	
	@PutMapping("/user/updateAddress/{email}")
	public ResponseEntity<String> updateAddress(@PathVariable String email, @RequestBody UpdateAddressRequest updateRequest) {
	    try {
	        userService.updateAddressByEmail(email, updateRequest.getNewAddress());
	        return ResponseEntity.ok("Địa chỉ người dùng đã được cập nhật thành công.");
	    } catch (Exception e) {
	        // Log lỗi
	        logger.error("Lỗi khi cập nhật địa chỉ người dùng", e);

	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi cập nhật địa chỉ người dùng.");
	    }
	}
	
	
	@PutMapping("/user/updateInfo/{email}")
	public ResponseEntity<String> updateUserInfo(
	    @PathVariable String email,
	    @RequestBody UpdateUserInfoRequest updateRequest) {
	    try {
	        userService.updateUserInfoByEmail(email, 
	            updateRequest.getFirst_name(),
	            updateRequest.getLast_name(), 
	            updateRequest.getPhone_number(), 
	            updateRequest.getAddress());
	        	updateRequest.getName_User();
	        return ResponseEntity.ok("Thông tin người dùng đã được cập nhật thành công.");
	    } catch (Exception e) {
	    	logger.error("Lỗi khi cập nhật thông tin người dùng",e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi cập nhật thông tin người dùng.");
	    }
	}

	@PutMapping("/user/updateImage/{email}")
	public ResponseEntity<String> updateProfileImage(
	    @PathVariable String email,
	    @RequestParam("file") MultipartFile file) {
	    try {
	        User user = userRepository.findByEmail(email);
	        if (user == null) {
	            return ResponseEntity.notFound().build();
	        }

	        // Định nghĩa thư mục trong Cloudinary (nếu cần)
	        String folderName = "user_images";
	        Map<String, Object> params = ObjectUtils.asMap("folder", folderName);

	        // Upload file lên Cloudinary
	        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), params);

	        // Lưu thông tin về ảnh vào đối tượng User
	        user.setImage((String) uploadResult.get("secure_url"));
	        userService.updateUser(user);

	        return ResponseEntity.ok("Hình ảnh người dùng đã được cập nhật thành công.");
	    } catch (Exception e) {
	        logger.error("Lỗi khi cập nhật hình ảnh người dùng", e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body("Lỗi khi cập nhật hình ảnh người dùng.");
	    }
	}

	
	@GetMapping("/user/getall")
	public ResponseEntity<Page<User>> getAllUser(Pageable pageable) {
		Page<User> users = userService.getAllUser(pageable);
		return new ResponseEntity<>(users, HttpStatus.OK);
	}


}
