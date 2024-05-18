package com.example.springrestapi.Service;

import com.example.springrestapi.Model.Size;

public interface SizeService {
	Size getSizeByName(String sizeName);
	Long saveOrUpdateSize(String sizeName);
	
}
