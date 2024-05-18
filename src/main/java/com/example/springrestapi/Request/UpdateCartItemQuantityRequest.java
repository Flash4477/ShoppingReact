package com.example.springrestapi.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UpdateCartItemQuantityRequest {
	private Long nguoiDungid;
    private Long productsizeid;
    private int quantity;
    private int price;
}
