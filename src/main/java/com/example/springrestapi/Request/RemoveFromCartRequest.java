package com.example.springrestapi.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RemoveFromCartRequest {
	private Long nguoiDungid;
	private Long productsizeid;
}
