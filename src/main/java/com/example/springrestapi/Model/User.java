package com.example.springrestapi.Model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
@Getter
@Setter
@NoArgsConstructor
@Table(name = "nguoidung")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "nguoi_dung_id")
	private Long NguoiDung_id;

	@JsonProperty("name_User")
	@Column(name = "name_User")
	private String name_User;

	@JsonProperty("image")
	@Column(name = "image")
	private String Image;

	@JsonProperty("email")
	@Column(name = "email")
	private String email;

	@Column(name = "password")
	private String password;

	@JsonProperty("first_name")
	@Column(name = "first_name")
	private String fist_name;

	@JsonProperty("last_name")
	@Column(name = "last_name")
	private String last_name;

	@JsonProperty("address")
	@Column(name = "address")	
	private String address;

	@JsonProperty("phone_number")
	@Column(name = "phone_number")
	private String phone_number;

}
