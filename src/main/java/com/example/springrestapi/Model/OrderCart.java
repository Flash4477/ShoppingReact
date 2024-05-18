package com.example.springrestapi.Model;

import java.sql.Date;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
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
@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ordercart")
public class OrderCart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_cart_id")
	private Long orderCartId;

	@ManyToOne
	@JoinColumn(name = "productsizeid")
	private ProductSize productsize;

	@ManyToOne
	@JoinColumn(name = "order_id")
	private Orders orders;
	
	@Column(name = "quantity_order")
	private int QuantityOrder;

}
