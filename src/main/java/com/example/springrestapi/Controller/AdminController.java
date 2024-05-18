package com.example.springrestapi.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springrestapi.Model.Admin;
import com.example.springrestapi.Model.LoginAdmin;
import com.example.springrestapi.Reponse.LoginMessage;
import com.example.springrestapi.Service.AdminService;

@RestController
@RequestMapping
@CrossOrigin("*")
public class AdminController {

	@Autowired
	public AdminService adminService;

	@PostMapping("admin/login")
	public ResponseEntity<LoginMessage> login(@RequestBody LoginAdmin loginAdmin) {
		// adminService.migratePasswordsToBCrypt();
		LoginMessage loginResult = adminService.loginAdmin(loginAdmin);

		if (loginResult.getMessage().equals("Login successfully")) {
			return ResponseEntity.ok(loginResult); // Đăng nhập thành công
		} else {
			return ResponseEntity.badRequest().body(loginResult); // Đăng nhập thất bại
		}
	}

	@GetMapping("admin/getAllAdmins")
	public List<Admin> getAllAdmins() {
		return adminService.getAllAdmins();
	}

	@GetMapping("admin/getAdminByEmail")
	public ResponseEntity<Admin> getAdminByEmail(@RequestParam String email) {
		Admin admin = adminService.getAdminByEmail(email);
		if (admin != null) {
			return new ResponseEntity<>(admin, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
