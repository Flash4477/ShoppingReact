package com.example.springrestapi.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springrestapi.Model.Product;
import com.example.springrestapi.Model.ProductSize;
import com.example.springrestapi.Model.ShoppingCart;
import com.example.springrestapi.Model.User;
import com.example.springrestapi.Repository.ProductRepository;
import com.example.springrestapi.Repository.ProductSizeRepository;
import com.example.springrestapi.Repository.ShoppingCartRepository;
import com.example.springrestapi.Repository.UserRepository;
import com.example.springrestapi.Request.AddToCartRequest;
import com.example.springrestapi.Request.RemoveFromCartRequest;
import com.example.springrestapi.Request.UpdateCartItemQuantityRequest;

@Service
public class ShoppingCartServiceImlp implements ShoppingCartService {

	@Autowired
	private ShoppingCartRepository shoppingCartRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ProductSizeRepository productSizeRepository;

	@Override
	public String addToCart(AddToCartRequest addToCartRequest) {
	    if (addToCartRequest.getNguoiDungid() != null && addToCartRequest.getProductsizeid() != null) {
	        // Lấy thông tin người dùng
	        Optional<User> userOptional = userRepository.findById(addToCartRequest.getNguoiDungid());

	        // Lấy thông tin sản phẩm kích thước
	        Optional<ProductSize> productSizeOptional = productSizeRepository.findById(addToCartRequest.getProductsizeid());

	        if (userOptional.isPresent() && productSizeOptional.isPresent()) {
	            User user = userOptional.get();
	            ProductSize productSize = productSizeOptional.get();

	            // Lấy giá ban đầu từ sản phẩm
	            int initialPrice = (int) productSize.getProduct().getPrice();

	            // Tính giá mới dựa trên số lượng
	            int newQuantity = addToCartRequest.getQuantity();
	            int newPrice = initialPrice * newQuantity;

	            // Tìm mục giỏ hàng hiện có hoặc tạo một mục mới
	            ShoppingCart existingCartItem = shoppingCartRepository.findShoppingCartByNguoiDungIdAndProductsizeProductSizeId(
	                addToCartRequest.getNguoiDungid(), addToCartRequest.getProductsizeid());

	            if (existingCartItem != null) {
	                // Nếu mục giỏ hàng đã tồn tại, cập nhật số lượng và giá
	                existingCartItem.setQuantity(existingCartItem.getQuantity() + addToCartRequest.getQuantity());
	                existingCartItem.setPriceCart(existingCartItem.getQuantity()*initialPrice);
	                shoppingCartRepository.save(existingCartItem);
	                return "Giỏ hàng đã có sản phẩm. Cập nhật số lượng và giá thành công";
	            } else {
	                // Nếu mục giỏ hàng không tồn tại, tạo một mục mới với số lượng và giá mới
	                ShoppingCart newCartItem = new ShoppingCart();
	                newCartItem.setNguoiDung(user);
	                newCartItem.setProductsize(productSize);
	                newCartItem.setQuantity(newQuantity);
	                newCartItem.setPriceCart(newPrice);  
	                shoppingCartRepository.save(newCartItem);
	                return "Thêm sản phẩm thành công";
	            }
	        }
	    }
	    return "Lỗi";
	}



	@Override
	public void removefromCart(RemoveFromCartRequest removeFromCartRequest) {
	    Long NguoiDung_id = removeFromCartRequest.getNguoiDungid();
	    Long productsizeid = removeFromCartRequest.getProductsizeid();
	    
	    // Tìm mục giỏ hàng dựa trên NguoiDung_id và productsizeid
	    ShoppingCart cartItemToRemove = shoppingCartRepository
	            .findShoppingCartByNguoiDungIdAndProductsizeProductSizeId(NguoiDung_id, productsizeid);

	    if (cartItemToRemove != null) {
	        // Nếu mục giỏ hàng tồn tại, xóa nó khỏi cơ sở dữ liệu
	        shoppingCartRepository.delete(cartItemToRemove);
	    } else {
	        // Nếu không tìm thấy mục giỏ hàng, bạn có thể ném một ngoại lệ ItemNotFoundException hoặc in ra thông báo lỗi
	       System.out.println("Mục giỏ hàng không tồn tại");
	    }
	}


	
	@Override
	public void updateCartItemQuantity(UpdateCartItemQuantityRequest updateCartItemQuantityRequest) {
	    Long NguoiDung_id = updateCartItemQuantityRequest.getNguoiDungid();
	    Long productsizeid = updateCartItemQuantityRequest.getProductsizeid();
	    int newQuantity = updateCartItemQuantityRequest.getQuantity();

	    User user = userRepository.findById(NguoiDung_id).orElse(null);
	    ProductSize productSize = productSizeRepository.findById(productsizeid).orElse(null);

	    if (user != null && productSize != null) {
	        ShoppingCart existingCartItem = shoppingCartRepository.findShoppingCartByNguoiDungIdAndProductsizeProductSizeId(NguoiDung_id, productsizeid);
	        if (existingCartItem != null) {
	            // Get the initial price from the product
	            int initialPrice = (int) productSize.getProduct().getPrice();

	            // Calculate the new price based on the new quantity
	            int newPrice = initialPrice * newQuantity;

	            existingCartItem.setQuantity(newQuantity);
	            existingCartItem.setPriceCart(newPrice);
	            shoppingCartRepository.save(existingCartItem);
	        } else {
	            throw new RuntimeException("Mục giỏ hàng không tồn tại.");
	        }
	    } else {
	        throw new RuntimeException("Không tìm thấy người dùng hoặc sản phẩm.");
	    }
	}



	@Override
	public List<ShoppingCart> getCartItemsByUserId(Long NguoiDung_id) {
		// Truy vấn cơ sở dữ liệu để lấy danh sách các mục giỏ hàng của người dùng có
		// UserId cụ thể
		List<ShoppingCart> cartItems = shoppingCartRepository.findByNguoiDung_NguoiDung_id(NguoiDung_id);
		
		 for (ShoppingCart cartItem : cartItems) {
	            User user = cartItem.getNguoiDung();
	            String address = user.getAddress();
	            String phone = user.getPhone_number();
	            String firstName = user.getFist_name();
	            String lastName = user.getLast_name();

	            // Bây giờ bạn có thể sử dụng thông tin này hoặc đưa vào cấu trúc dữ liệu phù hợp
	            // Ví dụ: bạn có thể thêm vào danh sách các đối tượng chứa thông tin này và trả về danh sách đó.
	        }
		return cartItems;
	}

}
