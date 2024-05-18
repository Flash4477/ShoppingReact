package com.example.springrestapi.Request;



import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AddToCartRequest {
	private Long nguoiDungid;
	private Long productsizeid;
	private int quantity;
	private int price;
}
