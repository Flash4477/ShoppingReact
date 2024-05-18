package com.example.springrestapi.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserInfoRequest {
	    private String first_name; // Thay đổi từ FistName thành firstName
	    private String last_name;  // Thay đổi từ LastName thành lastName
	    private String phone_number;
	    private String address;
	    private String name_User;
	
}
