package com.example.springrestapi.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageRequest {
	private int page;
	private int size;
}
