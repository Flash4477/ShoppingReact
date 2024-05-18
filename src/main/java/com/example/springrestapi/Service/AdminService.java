package com.example.springrestapi.Service;

import java.util.List;

import com.example.springrestapi.Model.Admin;
import com.example.springrestapi.Model.LoginAdmin;
import com.example.springrestapi.Reponse.LoginMessage;

public interface AdminService {
	LoginMessage loginAdmin(LoginAdmin loginAdmin);

	void migratePasswordsToBCrypt();
	
	List<Admin> getAllAdmins();
	
	Admin  getAdminByEmail(String email);

}
