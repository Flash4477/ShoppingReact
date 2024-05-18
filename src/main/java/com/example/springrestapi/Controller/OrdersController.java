package com.example.springrestapi.Controller;

import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springrestapi.Model.Orders;
import com.example.springrestapi.Model.Product;
import com.example.springrestapi.Service.OrdersService;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
public class OrdersController {
	@Autowired
	private OrdersService ordersService;

	@PostMapping("createOrders")
	public Orders createOrder(@RequestBody Orders order) {
		// Xử lý yêu cầu để tạo đơn hàng và trả về đơn hàng đã được tạo
		return ordersService.createOrder(order);
	}

	@DeleteMapping("/{orderId}")
	public void deleteOrder(@PathVariable Long orderId) {
		// Xử lý yêu cầu để xóa đơn hàng dựa trên ID
		ordersService.deleteOrder(orderId);
	}
	
	
	@GetMapping("/all")
    public ResponseEntity<List<Orders>> getAllOrders() {
        List<Orders> allOrders = ordersService.getAllOrders();

        if (allOrders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Trả về 404 nếu không có đơn hàng nào
        } else {
            return new ResponseEntity<>(allOrders, HttpStatus.OK);
        }
    }
	
	@GetMapping("/user/{email}")
	public ResponseEntity<List<Orders>> getUserOrders(@PathVariable String email) {
	    List<Orders> userOrders = ordersService.findUserOrdersByEmail(email);
	    
	    if (userOrders.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Trả về 404 nếu không tìm thấy đơn hàng
	    } else {
	        return new ResponseEntity<>(userOrders, HttpStatus.OK);
	    }
	}
	
	
	@GetMapping("/paging")
	public ResponseEntity<Page<Orders>> getAllOrdersPaging(Pageable pageable) {
		Page<Orders> orders = ordersService.PagingOrders(pageable);
		return new ResponseEntity<>(orders, HttpStatus.OK);
	}


}
