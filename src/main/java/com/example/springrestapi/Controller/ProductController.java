package com.example.springrestapi.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.example.springrestapi.Model.Product;
import com.example.springrestapi.Model.ProductSize;
import com.example.springrestapi.Model.Size;
import com.example.springrestapi.Reponse.ProductReponse;
import com.example.springrestapi.Request.ProductRequest;
import com.example.springrestapi.Service.ProductService;
import com.example.springrestapi.Service.ProductSizeService;
import com.example.springrestapi.Service.SizeService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@RestController
@RequestMapping
@CrossOrigin("*")
public class ProductController {
	@Autowired
	@Lazy
	ProductService pService;
	
	@Autowired
	private SizeService sizeService;
	
	@Autowired
	private ProductSizeService productSizeService;

	@Autowired
	private Cloudinary cloudinary;

	@PostMapping("/product")
	public ResponseEntity<Product> createProduct(@RequestBody Product product) {
	   

	    // Kiểm tra sản phẩm có được gửi lên không
	    if (product == null) {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }

	    // Lưu sản phẩm vào cơ sở dữ liệu
	    Product createdProduct = pService.saveProduct(product);

	    // Trả về phản hồi với sản phẩm đã tạo
	    return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
	}


	@GetMapping("/products/all") // Sử dụng phương thức GET để lấy danh sách sản phẩm
	public ResponseEntity<List<Product>> getAllProducts() {
		List<Product> products = pService.getAllProducts();
		return new ResponseEntity<>(products, HttpStatus.OK);
	}

	@GetMapping("/products/")
	public ResponseEntity<Product> getProductById(@RequestParam Long productId) {
		Product product = pService.getSingleProduct(productId);
		if (product != null) {
			return new ResponseEntity<Product>(product, HttpStatus.OK);
		} else {
			return new ResponseEntity<Product>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/products/search")
	public ResponseEntity<List<Product>> searchProductsByName(@RequestParam String name) {
		List<Product> products = pService.searchProductsByName(name);
		if (products.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(products, HttpStatus.OK);
	}

	@DeleteMapping("/products/{Product_id}")
	public ResponseEntity<HttpStatus> deleteProduct(@PathVariable Long Product_id) {
	    try {
	        pService.deleteProduct(Product_id);
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    } catch (Exception e) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}


	@PutMapping("/products/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
		product.setProduct_id(id);
		return new ResponseEntity<Product>(pService.updateProduct(product), HttpStatus.OK);
	}

	@GetMapping("/products/getall")
	public ResponseEntity<Page<Product>> getAllProducts(Pageable pageable) {
		Page<Product> products = pService.getAllProducts(pageable);
		return new ResponseEntity<>(products, HttpStatus.OK);
	}

	@PostMapping("/products/uploadImage/{productId}")
	public ResponseEntity<String> handleImageUpload(@PathVariable Long productId,
			@RequestParam("file") MultipartFile file) {
		try {
			Product product = pService.getSingleProduct(productId);
			if (product == null) {
				return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
			}

			// Định nghĩa thư mục trong Cloudinary (nếu cần)
			String folderName = "img_api";
			Map<String, Object> params = ObjectUtils.asMap("folder", folderName);

			// Upload file lên Cloudinary
			Map uploadResult = cloudinary.uploader().upload(file.getBytes(), params);

			// Lưu thông tin về ảnh vào đối tượng Product
			product.setImage((String) uploadResult.get("secure_url"));
			pService.updateProduct(product);

			return new ResponseEntity<>("Image uploaded successfully for product with ID " + productId, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error uploading image", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/products/uploadImage")
	public ResponseEntity<String> handleImageUpload(@RequestParam("file") MultipartFile file) {
	    try {
	        // Định nghĩa thư mục trong Cloudinary (nếu cần)
	        String folderName = "img_api";
	        Map<String, Object> params = ObjectUtils.asMap("folder", folderName);

	        // Upload file lên Cloudinary
	        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), params);
	        
	        // Create a new Product or update the image in an existing one
	        String imageUrl = (String) uploadResult.get("secure_url");
	        
//	        pService.saveProduct(product);
	        System.out.println(imageUrl);
	        return new ResponseEntity<>("{\"imageUrl\":\"" + imageUrl + "\"}", HttpStatus.OK);
	        
	    } catch (Exception e) {
	        return new ResponseEntity<>("Error uploading image", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	    
	}


}
