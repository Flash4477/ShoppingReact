package com.example.springrestapi.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.springrestapi.Model.Product;
import com.example.springrestapi.Model.ProductCategory;


@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
//	 	@Query ("SELECT pc FROM ProductCategories pc WHERE pc.category.categoryId = :categoryId")
//	    List<ProductCategories> findProductsByCategoryId(@Param("categoryId") Long categoryId);
	@Query("SELECT pc.product FROM ProductCategory pc WHERE pc.category.Name_Category = :categoryName")
    List<Product> findProductsByCategoryName(@Param("categoryName") String categoryName);


}
