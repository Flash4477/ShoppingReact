package com.example.springrestapi.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.example.springrestapi.Model.Product;
import com.example.springrestapi.Model.ProductSize;
import com.example.springrestapi.Model.Size;
import com.example.springrestapi.Repository.ProductRepository;
import com.example.springrestapi.Repository.ProductSizeRepository;
import com.example.springrestapi.Repository.SizeRepository;


@Service  
public class ProductServiceImlp implements ProductService {
	@Autowired
	private ProductRepository pRepository;	
	
	@Autowired
	private SizeRepository sizeRepository;
	
	@Autowired
	private ProductSizeRepository productSizeRepository;
	
	
//	  @Autowired
//	  private SizeRepository sizeRepository;
	
	@Override
	public Product saveProduct(Product product) {
		return pRepository.save(product);
	}

	@Override
    public List<Product> getAllProducts() {
        return pRepository.findAll(); // Sử dụng ProductRepository để lấy danh sách sản phẩm từ cơ sở dữ liệu.
    }

	@Override
	public Product getSingleProduct(Long Product_id) {
	    Optional<Product> product = pRepository.findById(Product_id);
	    if (product.isPresent()) {
	        return product.get();
	    }
	    throw new RuntimeException("Product is not found for the id " + Product_id);
	}

	@Override
	public void deleteProduct(Long Product_id) {
			 pRepository.deleteById(Product_id);
	   
	}

	@Override
	public Product updateProduct(Product product) {
		return pRepository.save(product);
	}

	@Override
	public Product getSingleProduct(Product productId) {
	    Optional<Product> product = pRepository.findById(productId.getProduct_id()); // Giả sử Product có một phương thức getId() để lấy ID.

	    if (product.isPresent()) {
	        return product.get(); // Trả về sản phẩm nếu nó tồn tại trong cơ sở dữ liệu.
	    } else {
	       return null;
	    }
	}

	@Override
	public List<Product> searchProductsByName(String Name_Product) {
	    return pRepository.findByNameProductContaining(Name_Product);
	}

	@Override
	public Page<Product> getAllProducts(Pageable pageable) {
		  return pRepository.findAll(pageable);
	}

	

//	@Override
//	public void setSizeForProduct(Product product, String sizeName) {
//		 Product savedProduct = pRepository.save(product);
//
//	        // Lấy Size_id từ bảng Size bằng sizename
//	        Size size = sizeRepository.findSizeIdBySizeName( sizeName);
//
//	        // Tạo ProductSize và lưu vào bảng ProductSize
//	        ProductSize productSize = new ProductSize();
//	        productSize.setProduct(savedProduct);
//	        productSize.setSize(size);
//	        productSizeRepository.save(productSize);
//	}



//	@Override
//	public List<Product> getProductsByCategoryName(String categoryName) {
//		return pRepository.findProductsByCategoryName(categoryName);	
//	}

//	@Override
//	public List<Product> getProductsByCategoryId(Long categoryId) {
//	
//		 List<Product> products = pRepository.findByCategory_CategoryId(categoryId);
//		    return products;
//	}
	

//	@Override
//	public List<String> getSizeNamesByProductId(Long Product_id) {
//	    return sizeRepository.findSizeNamesByProductId(Product_id);
//	}

//	@Override
//	public List<Product> getProductsByCategory(String categoryName) {
//	    return pRepository.findByCategory_Name_Category(categoryName);
//	}

		
}
