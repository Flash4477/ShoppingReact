package com.example.springrestapi.Service;

import java.util.List;

import com.example.springrestapi.Model.ShoppingCart;
import com.example.springrestapi.Request.AddToCartRequest;
import com.example.springrestapi.Request.RemoveFromCartRequest;
import com.example.springrestapi.Request.UpdateCartItemQuantityRequest;

public interface ShoppingCartService {
	String addToCart(AddToCartRequest addToCartRequest);

	void removefromCart(RemoveFromCartRequest removeFromCartRequest);

	void updateCartItemQuantity(UpdateCartItemQuantityRequest updateCartItemQuantityRequest);

	List<ShoppingCart> getCartItemsByUserId(Long NguoiDung_id);

}
