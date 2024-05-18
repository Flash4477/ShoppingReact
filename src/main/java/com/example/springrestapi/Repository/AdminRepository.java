package com.example.springrestapi.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springrestapi.Model.Admin;


@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
	Admin findByEmail (String Email);
}
