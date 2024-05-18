package com.example.springrestapi.Request;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.springrestapi.Model.Product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ProductRequest {
	// private List<String> sizeName; // Change the type to List<String>
	private Product product;
	 
}
