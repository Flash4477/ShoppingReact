package com.example.springrestapi.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.springrestapi.Model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findOneByEmailAndPassword(String Email, String Password);

	User findByEmail(String Email);

	@Modifying
	@Query("UPDATE User u SET u.address = :newAddress WHERE u.email = :email")
	void updateAddressByEmail(@Param("email") String email, @Param("newAddress") String newAddress);

	
	@Modifying
	@Query("UPDATE User u SET u.fist_name = :firstName, u.last_name = :lastName, u.phone_number = :phoneNumber, u.address = :address WHERE u.email = :email")
	void updateUserInfoByEmail(@Param("email") String email, @Param("firstName") String firstName, @Param("lastName") String lastName, @Param("phoneNumber") String phoneNumber, @Param("address") String address);

	
	void deleteById(Long UserId);

	Optional<User> findById(Long UserId);

	@Query("SELECT u FROM User u WHERE u.email = :email")
	List<User> findAllByEmail(@Param("email") String email);
}
