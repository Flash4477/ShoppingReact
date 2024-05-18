package com.example.springrestapi.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.example.springrestapi.Model.OrderCart;
import com.example.springrestapi.Model.Orders;
import com.example.springrestapi.Model.ProductSize;
import com.example.springrestapi.Model.ShoppingCart;
import com.example.springrestapi.Model.User;
import com.example.springrestapi.Repository.OrderCartRepository;
import com.example.springrestapi.Repository.OrdersRepository;
import com.example.springrestapi.Repository.ProductSizeRepository;
import com.example.springrestapi.Repository.ShoppingCartRepository;
import com.example.springrestapi.Repository.UserRepository;
import com.example.springrestapi.Request.OrderCartRequest;
import com.example.springrestapi.Service.OrderCartService;
import com.example.springrestapi.Service.OrdersService;
import com.example.springrestapi.Service.ShoppingCartService;

@RequestMapping
@RestController
@CrossOrigin("*")
public class OrderCartController {
	@Autowired
	private OrderCartService orderCartService;

	@Autowired
	private ShoppingCartService shoppingCartService;

	@Autowired
	private OrdersService ordersService;

	@Autowired
	private ShoppingCartRepository shoppingCartRepository;

	@Autowired
	private OrdersRepository ordersRepository;

	@Autowired
	private OrderCartRepository orderCartRepository;
	
	@Autowired 
	private ProductSizeRepository productSizeRepository;
	
	@Autowired
	private UserRepository userRepository;

	// @GetMapping("/ordercarts")
	// public List<Object[]> getCustomOrderCartInfo() {
	// // Gọi service để lấy thông tin đặt hàng theo yêu cầu của bạn.
	// return orderCartService.getCustomOrderCartInfo();
	// }

	@PostMapping("/ordercart/create")
	public ResponseEntity<String> createOrderCarts(@RequestBody List<OrderCartRequest> orderCartRequests) {
	    List<OrderCart> orderCarts = new ArrayList<>();

	    for (OrderCartRequest request : orderCartRequests) {
	        Orders order = ordersRepository.findById(request.getOrderId()).orElse(null);
	        ProductSize productSize = productSizeRepository.findById(request.getProductSizeId()).orElse(null);

	        if (order != null && productSize != null) {
	            OrderCart orderCart = new OrderCart();
	            orderCart.setProductsize(productSize);
	            orderCart.setOrders(order);
	            orderCart.setQuantityOrder(request.getQuantityOrder());
	            orderCarts.add(orderCart);
	        }
	    }

	    orderCartRepository.saveAll(orderCarts);

	    return ResponseEntity.ok("OrderCarts created successfully");
	}


	@DeleteMapping("/ordercarts/{orderCartId}")
	public void deleteOrderCart(@PathVariable Long orderCartId) {
		// Gọi service để xóa một bản ghi đặt hàng dựa trên orderCartId.
		orderCartService.deleteOrderCart(orderCartId);
	}

	@GetMapping("/ordercarts/all")
	public List<OrderCart> getAllOrderCarts() {
		// Gọi service để lấy tất cả các bản ghi đặt hàng.
		return orderCartService.getAllOrderCarts();
	}

	@GetMapping("/ordercarts/user/{userEmail}")
	public ResponseEntity<List<Object[]>> findOrderInfoByUserEmail(@PathVariable String userEmail) {
		List<Object[]> orderInfo = orderCartService.findOrderInfoByUserEmail(userEmail);
		if (!orderInfo.isEmpty()) {
			return new ResponseEntity<>(orderInfo, HttpStatus.OK);
		} else {
			// Xử lý trường hợp không tìm thấy đơn hàng hoặc địa chỉ email không hợp lệ
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
