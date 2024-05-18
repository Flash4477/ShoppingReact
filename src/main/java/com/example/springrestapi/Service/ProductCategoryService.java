package com.example.springrestapi.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.springrestapi.Model.Product;
import com.example.springrestapi.Model.ProductCategory;


public interface ProductCategoryService {
//	List<ProductCategories> getProductsByCategoryId(Long categoryId);
	List<Product> findProductsByCategoryName(String categoryName);

}
