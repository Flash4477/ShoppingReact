package com.example.springrestapi.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.springrestapi.Model.Orders;
import com.example.springrestapi.Repository.OrdersRepository;

@Service
public class OrdersServiceImlp implements OrdersService {

	@Autowired
	private OrdersRepository ordersRepository;

	@Override
	public Orders createOrder(Orders order) {
		return ordersRepository.save(order);
	}

	@Override
	public void deleteOrder(Long orderId) {
		ordersRepository.deleteById(orderId);

	}

	@Override
	public List<Orders> findUserOrdersByEmail(String email) {
		return ordersRepository.findUserOrdersByEmail(email);
	}

	@Override
	public List<Orders> getAllOrders() {
		return ordersRepository.findAll();
	}

	@Override
	public Page<Orders> PagingOrders(Pageable pageable) {
		return ordersRepository.findAll(pageable);
	}

//	@Override
//	public List<Object[]> findUserOrderDetailsByEmail(String email) {
//		  return ordersRepository.findUserOrderDetailsByEmail(email);
//	}

}
