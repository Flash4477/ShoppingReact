package com.example.springrestapi.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springrestapi.Model.ProductSize;
import com.example.springrestapi.Repository.ProductSizeRepository;

@Service
public class ProductSizeServiceImlp implements ProductSizeService {

	@Autowired
	private ProductSizeRepository productSizeRepository;
	
	 @Override
	    public List<Object[]> getSizeNameAndQuantityByProductId(Long Product_id) {
	        return productSizeRepository.getSizeNameAndQuantityByProductId(Product_id);
	  }

	@Override
	public Long getProductSizeIdBySizeNameAndProductId(String sizeName, Long productId) {
		 return productSizeRepository.getProductSizeIdBySizeNameAndProductId(sizeName, productId);
	}

	@Override
	public void saveProductSize(ProductSize productSize) {
		  productSizeRepository.save(productSize);
		
	}


	
	

}
