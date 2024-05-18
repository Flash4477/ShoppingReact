package com.example.springrestapi.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.springrestapi.Model.ShoppingCart;
import com.example.springrestapi.Model.User;
import com.example.springrestapi.Reponse.CartItemResponse;
import com.example.springrestapi.Request.AddToCartRequest;
import com.example.springrestapi.Request.RemoveFromCartRequest;
import com.example.springrestapi.Request.UpdateCartItemQuantityRequest;
import com.example.springrestapi.Service.ShoppingCartService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
@CrossOrigin("*")
@RequestMapping("/cart")
public class ShoppingCartController {

	  private static final Logger logger = LoggerFactory.getLogger(ShoppingCartController.class);
    @Autowired
    private ShoppingCartService shoppingCartService;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody AddToCartRequest addToCartRequest) {
            return ResponseEntity.ok(shoppingCartService.addToCart(addToCartRequest));

    }



    @PostMapping("/remove")
    public ResponseEntity<String> removeFromCart(@RequestBody RemoveFromCartRequest removeFromCartRequest) {
        try {
            shoppingCartService.removefromCart(removeFromCartRequest); // Gọi hàm với tham số là đối tượng RemoveFromCartRequest

            return ResponseEntity.ok("Sản phẩm đã được xóa khỏi giỏ hàng thành công.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi xóa sản phẩm khỏi giỏ hàng.");
        }
    }



    @PostMapping("/update")
    public ResponseEntity<String> updateCartItemQuantity(@RequestBody UpdateCartItemQuantityRequest updateRequest) {
        try {
            shoppingCartService.updateCartItemQuantity(updateRequest);

            return ResponseEntity.ok("Số lượng mục giỏ hàng đã được cập nhật thành công.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi cập nhật số lượng mục giỏ hàng.");
        }
    }



    @GetMapping("/items/{userId}")
    public ResponseEntity<List<CartItemResponse>> getCartItemsByUserId(@PathVariable Long userId) {
        List<ShoppingCart> cartItems = shoppingCartService.getCartItemsByUserId(userId);
        List<CartItemResponse> cartItemData = new ArrayList<>();


        for (ShoppingCart cartItem : cartItems) {
            CartItemResponse itemData = new CartItemResponse();
            itemData.setNameProduct(cartItem.getProductsize().getProduct().getNameProduct());
            itemData.setQuantity(cartItem.getQuantity());
            itemData.setNameSize(cartItem.getProductsize().getSize().getSize_Name());
            itemData.setImage(cartItem.getProductsize().getProduct().getImage());
            itemData.setPrice(cartItem.getProductsize().getProduct().getPrice());
            itemData.setPriceCart(cartItem.getPriceCart());
            itemData.setProductSizeId(cartItem.getProductsize().getProductSizeId());
            itemData.setCart_id(cartItem.getCart_id());
            
            User user = cartItem.getNguoiDung();
            itemData.setFirstName(user.getFist_name());
            itemData.setLastName(user.getLast_name());
            itemData.setAddress(user.getAddress());
            itemData.setPhoneNumber(user.getPhone_number());
            itemData.setName_User(user.getName_User());
            
            cartItemData.add(itemData);
        }

        return ResponseEntity.ok(cartItemData);
    }
}
