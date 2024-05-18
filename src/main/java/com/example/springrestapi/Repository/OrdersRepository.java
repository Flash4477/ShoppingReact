package com.example.springrestapi.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.springrestapi.Model.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
//	@Query("SELECT o.createAt, o.Order_id, o.Subtotal " + "FROM Orders o " + "JOIN o.shoppingCart sc "
//			+ "JOIN sc.nguoiDung u " + "WHERE u.email = :email")
//	List<Object[]> findUserOrderDetailsByEmail(@Param("email") String email);

	Optional<Orders> findById(Long Order_id);

	@Query("SELECT o FROM Orders o " + "JOIN o.nguoiDung u " + "WHERE u.email = :email")
	List<Orders> findUserOrdersByEmail(@Param("email") String email);

}
