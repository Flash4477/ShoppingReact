package com.example.springrestapi.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.springrestapi.Model.Product;
import com.example.springrestapi.Model.ShoppingCart;
import com.example.springrestapi.Model.User;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
	@Query("SELECT sc FROM ShoppingCart sc JOIN sc.productsize ps JOIN ps.product p WHERE sc.nguoiDung.NguoiDung_id = :nguoiDungId AND ps.productSizeId = :productSizeId")
	ShoppingCart findShoppingCartByNguoiDungIdAndProductsizeProductSizeId(@Param("nguoiDungId") Long nguoiDungId, @Param("productSizeId") Long productSizeId);

	Optional<ShoppingCart> findById( Long Cart_id);

	@Query("SELECT sc FROM ShoppingCart sc WHERE sc.nguoiDung.NguoiDung_id = :nguoiDungId")
	List<ShoppingCart> findByNguoiDung_NguoiDung_id(@Param("nguoiDungId") Long nguoiDungId);
}
