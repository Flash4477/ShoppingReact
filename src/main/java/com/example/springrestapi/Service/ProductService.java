package com.example.springrestapi.Service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.springrestapi.Model.Product;

@Service
public interface ProductService {
	Product saveProduct(Product product);

	List<Product> getAllProducts();

	Product getSingleProduct(Product productId);

	Product getSingleProduct(Long productId);

	void deleteProduct(Long Product_id);

	Product updateProduct(Product product);

	List<Product> searchProductsByName(String Name_Product);

	Page<Product> getAllProducts(Pageable pageable);
	
	 //void setSizeForProduct(Product product, String sizeName);
}
