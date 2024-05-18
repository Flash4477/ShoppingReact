package com.example.springrestapi.Service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.springrestapi.Model.OrderCart;
import com.example.springrestapi.Model.User;
import com.example.springrestapi.Repository.OrderCartRepository;
import com.example.springrestapi.Repository.UserRepository;

@Service
public class OrderCartServiceImlp implements OrderCartService {

	@Autowired
	private OrderCartRepository orderCartRepository;
	
	@Autowired
	private UserRepository userRepository;
	
//	@Override
//	public List<Object[]> getCustomOrderCartInfo() {
//	    // Lấy thông tin người dùng hiện tại
//	    UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//	    String email = userDetails.getUsername(); // Email người dùng hiện tại
//
//	    // Sử dụng email để lấy danh sách đơn hàng của người dùng hiện tại
//	    List<User> users = userRepository.findAllByEmail(email);
//
//	    if (!users.isEmpty()) {
//	        // Lấy ID của người dùng hiện tại (chú ý rằng có thể có nhiều người dùng với cùng một email)
//	        Long userId = users.get(0).getNguoiDung_id();
//
//	        // Sử dụng ID người dùng để truy vấn đơn hàng
//	        return orderCartRepository.getCustomOrderDataByUserId(userId);
//	    } else {
//	        // Xử lý trường hợp không tìm thấy người dùng
//	        // Trả về một danh sách rỗng hoặc thực hiện xử lý phù hợp với yêu cầu của bạn
//	        return Collections.emptyList();
//	    }
//	}


	@Override
	public OrderCart createOrderCart(OrderCart orderCart) {
		return orderCartRepository.save(orderCart);
	}

	@Override
	public void deleteOrderCart(Long orderCartId) {
		 orderCartRepository.deleteById(orderCartId);
		
	}

	@Override
	public List<OrderCart> getAllOrderCarts() {
		  return orderCartRepository.findAll();
	}


	@Override
	public List<Object[]> findOrderInfoByUserEmail(String userEmail) {
	    List<User> users = userRepository.findAllByEmail(userEmail);

	    if (!users.isEmpty()) {
	        // Lấy ID của người dùng với địa chỉ email đã cung cấp
	        Long userId = users.get(0).getNguoiDung_id();

	        // Sử dụng ID của người dùng để truy vấn thông tin đơn hàng
	        List<Object[]> orderInfo = orderCartRepository.findProductInfoByUserEmail(userEmail);

	        if (orderInfo.isEmpty()) {
	            // Xử lý trường hợp không tìm thấy thông tin đơn hàng cho người dùng
	            // Bạn có thể trả về một danh sách rỗng hoặc xử lý nó dựa trên yêu cầu cụ thể của bạn
	            return Collections.emptyList();
	        } else {
	            return orderInfo;
	        }
	    } else {
	        // Xử lý trường hợp không tìm thấy người dùng với địa chỉ email đã cung cấp
	        // Bạn có thể trả về một danh sách rỗng hoặc xử lý nó dựa trên yêu cầu cụ thể của bạn
	        return Collections.emptyList();
	    }
	}


}
