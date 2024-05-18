package com.example.springrestapi.Model;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import jakarta.persistence.JoinColumn;
@Entity
@ToString
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Products")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "Product_id")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Product // implements Serializable//
{
//    /**
//	 * 
//	 */
//	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Product_id")
	@JsonProperty("Product_id")
	private Long Product_id;
	
	@Column(name = "Name_Product")
	@JsonProperty("Name_Product")
	private String nameProduct;
	
	@Column(name = "Description")
	private String Description;
	
	@Column(name = "Price")
	private float Price;
	
	@Column(name = "Stock_quantity")
	private int Stock_quantity;
	
	@Column(name = "Image")
	private String Image;
	
	@Column(name = "Price_old")
	private float Price_old;
	
	@Column(name = "Origin")
	private String Origin;
	
	@Column(name = "Brand")
	private String Brand;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
	private List<ProductSize> productSizes;

	
//    @JsonManagedReference
//    @OneToMany(fetch = FetchType.LAZY,mappedBy = "product")
//    @JsonIgnore
//    private List<Productp> productSize;

//    @ElementCollection
//    @CollectionTable(name = "Product_Size_Names", joinColumns = @JoinColumn(name = "Product_id"))
//    @Column(name = "Size_Name")
//    private List<String> sizeNames;

//    @ManyToOne
//    @JoinColumn(name = "Category_id")
//    private Category category; // Assuming you have a Category entity
}
