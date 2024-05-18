package com.example.springrestapi.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.springrestapi.Model.OrderCart;

@Repository
public interface OrderCartRepository extends JpaRepository<OrderCart, Long> {
//	@Query("SELECT nd.name_User AS tenNguoiDung, p.nameProduct AS tenSanPham, sc.quantity AS quantity, sc.PriceCart AS giaTien, s.Size_Name AS sizeName, ord.Paymentmethod AS phuongThucThanhToan, ord.createAt AS thoiGianTao,  nd.address AS diaChi, p.Image AS hinhAnhSanPham FROM OrderCart o INNER JOIN o.shoppingCart sc INNER JOIN sc.nguoiDung nd INNER JOIN sc.productsize ps INNER JOIN ps.product p INNER JOIN ps.size s INNER JOIN o.orders ord")
//	List<Object[]> getCustomOrderData();
//
//	@Query("SELECT nd.name_User AS tenNguoiDung, p.nameProduct AS tenSanPham, sc.quantity AS quantity, sc.PriceCart AS giaTien, s.Size_Name AS sizeName, ord.Paymentmethod AS phuongThucThanhToan, ord.createAt AS thoiGianTao, nd.address AS diaChi, p.Image AS hinhAnhSanPham, ord.Subtotal AS subtotal, nd.phone_number AS soDienThoai FROM OrderCart o INNER JOIN o.shoppingCart sc INNER JOIN sc.nguoiDung nd INNER JOIN sc.productsize ps INNER JOIN ps.product p INNER JOIN ps.size s INNER JOIN o.orders ord WHERE nd.id = :userId")
//	List<Object[]> getCustomOrderDataByUserId(@Param("userId") Long userId);

	Optional<OrderCart> findById(Long orderCartId);

//	@Query("SELECT o.orders.Order_id AS OrderId, o.orders.createAt AS CreateAt, o.orders.Paymentmethod AS PaymentMethod, o.orders.Subtotal AS Subtotal FROM OrderCart o WHERE o.shoppingCart.nguoiDung.email = :userEmail")
//	List<Object[]> findOrderInfoByUserEmail(@Param("userEmail") String userEmail);
	
	
	@Query("SELECT o.nguoiDung.name_User AS TenNguoiDung, p.Price as GiaSP ,  p.nameProduct AS TenSanPham, oc.orders.Order_id AS OrderId, p.Image AS HinhAnhSanPham, ps.size AS Size, oc.QuantityOrder AS SoLuong, oc.orders.Subtotal AS Subtotal  ,oc.orders.createAt as CreateAT " +
		       "FROM OrderCart oc " +
		       "JOIN oc.orders o " +
		       "JOIN oc.productsize ps " +
		       "JOIN ps.product p " +
		       "WHERE o.nguoiDung.email = :userEmail")
		List<Object[]> findProductInfoByUserEmail(@Param("userEmail") String userEmail);



}
