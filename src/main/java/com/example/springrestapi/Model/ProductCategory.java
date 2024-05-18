package com.example.springrestapi.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "productcategory")
public class ProductCategory {
	  @Id
	  @Column(name="Product_categoryid")
	  private Long ProductCategory_id;
	  
	  @ManyToOne
	  @JoinColumn(name = "Product_id")
	  private Product product;
	  
	  @ManyToOne
	  @JoinColumn(name = "Category_id")
	  private Category category;
}
