package com.example.springrestapi.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class OrderCartRequest {

	private Long orderId;

	private Long productSizeId;
	
	 private int QuantityOrder;
}
