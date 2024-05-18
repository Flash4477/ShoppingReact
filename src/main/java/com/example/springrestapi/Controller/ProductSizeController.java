package com.example.springrestapi.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springrestapi.Model.Size;
import com.example.springrestapi.Repository.SizeRepository;
import com.example.springrestapi.Service.ProductSizeService;

@RequestMapping
@CrossOrigin("*")
@RestController
public class ProductSizeController {
	
	@Autowired
	private ProductSizeService productSizeService;
	
	@GetMapping("/productsize/get-size-info/{productId}")
    public ResponseEntity<?> getSizeInfoByProductId(@PathVariable Long productId) {
        List<Object[]> sizeInfo = productSizeService.getSizeNameAndQuantityByProductId(productId);
        if (sizeInfo != null && !sizeInfo.isEmpty()) {
            return ResponseEntity.ok(sizeInfo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	 @GetMapping("/productsize/getproductsizeid")
	    public ResponseEntity<?> getProductSizeIdBySizeAndProductId(@RequestParam String sizeName, @RequestParam Long productId) {
	        Long productSizeId = productSizeService.getProductSizeIdBySizeNameAndProductId(sizeName, productId);

	        if (productSizeId != null) {
	            return ResponseEntity.ok(productSizeId);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
	
}
