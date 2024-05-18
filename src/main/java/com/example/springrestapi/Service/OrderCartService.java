package com.example.springrestapi.Service;

import java.util.List;
import com.example.springrestapi.Model.OrderCart;

public interface OrderCartService {
//    List<Object[]> getCustomOrderCartInfo();
    
    OrderCart createOrderCart(OrderCart orderCart);
    
    void deleteOrderCart(Long orderCartId);
    
    List<OrderCart> getAllOrderCarts();
    
    List<Object[]> findOrderInfoByUserEmail(String userEmail);
}
