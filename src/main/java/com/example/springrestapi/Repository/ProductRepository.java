package com.example.springrestapi.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.springrestapi.Model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	Optional<Product> findById(Long Product_id);
	
//	List<Product> findByCategory_Name_Category(String categoryName);

//	@Query("SELECT p FROM Product p WHERE p.category.Name_Category = :categoryName")
//	List<Product> findProductsByCategoryName(@Param("categoryName") String categoryName);

	void deleteById(Long productId);

	List<Product> findByNameProductContaining(String Name_Product);

}
