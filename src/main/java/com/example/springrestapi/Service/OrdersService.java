package com.example.springrestapi.Service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.springrestapi.Model.Orders;
import com.example.springrestapi.Model.User;

public interface OrdersService {
	Orders createOrder(Orders order);

	void deleteOrder(Long orderId);

//	List<Object[]> findUserOrderDetailsByEmail(String email);
	 List<Orders> findUserOrdersByEmail(String email);

	List<Orders> getAllOrders();
	
	Page<Orders> PagingOrders(Pageable pageable);
}
