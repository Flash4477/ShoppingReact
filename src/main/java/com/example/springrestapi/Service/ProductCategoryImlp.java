package com.example.springrestapi.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.example.springrestapi.Model.Product;
import com.example.springrestapi.Model.ProductCategory;
import com.example.springrestapi.Repository.ProductCategoryRepository;


@Service
public class ProductCategoryImlp implements ProductCategoryService {

	
	@Autowired
    private ProductCategoryRepository productCategoryRepository;
	
	@Lazy
	@Autowired
    private ProductService productService;

	 @Override
	    public List<Product> findProductsByCategoryName(String categoryName) {
	        // Sử dụng repository để lấy danh sách các Product_id dựa trên categoryName
	        List<Product> productIds = productCategoryRepository.findProductsByCategoryName(categoryName);

	        // Sau khi có danh sách các Product_id, bạn có thể sử dụng chúng để lấy thông tin chi tiết về sản phẩm
	        List<Product> products = new ArrayList<>();
	        for (Product productId : productIds) {
	            // Sử dụng ProductService để lấy thông tin chi tiết về sản phẩm dựa trên productId
	            Product product = productService.getSingleProduct(productId);
	            products.add(product);
	        }

	        return products;
	    }
	
//	@Override
//	public List<Long> findProductIdsByCategoryName(String categoryName) {
//		return productCategoryRepository.findProductIdsByCategoryName(categoryName);
//	}

//	 @Autowired
//	 private ProductCategoryService productCategoryService;
//	 
//	@Override
//	public List<ProductCategories> getProductsByCategoryId(Long categoryId) {
//		// TODO Auto-generated method stub
//		return productCategoryService.getProductsByCategoryId(categoryId);
//	}

}
