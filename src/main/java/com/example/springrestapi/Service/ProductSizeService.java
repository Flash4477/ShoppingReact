package com.example.springrestapi.Service;

import java.util.List;

import com.example.springrestapi.Model.ProductSize;




public interface ProductSizeService {
	 List<Object[]> getSizeNameAndQuantityByProductId(Long Product_id);
	    // Khai báo một phương thức để lấy SizeName và quantity_size dựa trên Product_id
	 
	 Long getProductSizeIdBySizeNameAndProductId(String sizeName, Long productId);

	void saveProductSize(ProductSize productSize);
}
