package com.example.springrestapi.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springrestapi.Model.Product;
import com.example.springrestapi.Service.ProductCategoryService;
import com.example.springrestapi.Service.ProductService;

@RestController
@RequestMapping
@CrossOrigin("*")
public class ProductCategoryController {
	@Autowired
	private ProductCategoryService productCategoryService;
	
	@Autowired
	private ProductService productService;
	
	@GetMapping("/products")
	public List<Product> getProductsByCategoryName(@RequestParam("categoryName") String categoryName) {
	    List<Product> products = productCategoryService.findProductsByCategoryName(categoryName);
	 // Nếu bạn muốn trả về thông tin chi tiết của sản phẩm, thì sử dụng ProductService
        // để lấy thông tin chi tiết dựa trên Product_id

         List<Product> detailedProducts = new ArrayList();
         for (Product productId : products) {
             Product product = productService.getSingleProduct(productId);
             detailedProducts.add(product);
         }
	    return products;
	}

}
