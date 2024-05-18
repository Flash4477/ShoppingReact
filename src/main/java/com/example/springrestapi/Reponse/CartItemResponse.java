package com.example.springrestapi.Reponse;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CartItemResponse {
	private String nameProduct;
	private int quantity;
	private String nameSize;
	private String Image;
    private float PriceCart;
	private float Price;
	private Long productSizeId;
	private Long Cart_id;
	
	private String FirstName;
	private String LastName;
	private String Address;
	private String PhoneNumber;
	private String  name_User;
}
