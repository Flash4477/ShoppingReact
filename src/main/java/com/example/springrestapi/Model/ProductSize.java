package com.example.springrestapi.Model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "productsize")
public class ProductSize {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("productsizeid")
	@Column(name = "productsizeid")
	private Long productSizeId;

	@ManyToOne
	@JoinColumn(name = "Product_id") // Tên cột khóa ngoại trong bảng ProductSize
	private Product product;

	@ManyToOne
	@JoinColumn(name = "Size_id") // Tên cột khóa ngoại trong bảng ProductSize
	private Size size;

	private int quantity_size;
	
	
	
}
