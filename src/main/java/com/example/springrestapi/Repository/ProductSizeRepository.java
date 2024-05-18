package com.example.springrestapi.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.springrestapi.Model.ProductSize;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize, Long> {
	@Query("SELECT ps.size.Size_Name, ps.quantity_size FROM ProductSize ps WHERE ps.product.Product_id = :productId")
	List<Object[]> getSizeNameAndQuantityByProductId(@Param("productId") Long productId);

	Optional<ProductSize> findById(Long productsizeid);

	@Query("SELECT ps FROM ProductSize ps WHERE ps.product.Product_id = :Product_id")
	ProductSize findByProduct_Product_id(@Param("Product_id") Long Product_id);

	@Query("SELECT ps.productSizeId FROM ProductSize ps WHERE ps.size.Size_Name = :sizeName AND ps.product.Product_id = :productId")
	Long getProductSizeIdBySizeNameAndProductId(@Param("sizeName") String sizeName, @Param("productId") Long productId);

}
