package com.example.springrestapi.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springrestapi.Model.Size;
import com.example.springrestapi.Repository.SizeRepository;

@Service
public class SizeServiceImlp implements SizeService {

	@Autowired
	private SizeRepository sizeRepository;

	@Override
	public Size getSizeByName(String sizeName) {
		Long sizeId = sizeRepository.findSizeIdBySizeName(sizeName);
		// Kiểm tra xem sizeId có giá trị không
		if (sizeId != null) {
			// Nếu có giá trị, sử dụng sizeRepository để lấy đối tượng Size dựa trên sizeId
			return sizeRepository.getById(sizeId);
		}
		// Nếu sizeId không có giá trị, trả về null hoặc xử lý theo nhu cầu của bạn
		return null;
	}

	@Override
	public Long saveOrUpdateSize(String sizeName) {
		 Long sizeId = sizeRepository.findSizeIdBySizeName(sizeName);

	        if (sizeId == null) {
	            // If the size doesn't exist, create a new one
	            Size size = new Size();
	            size.setSize_Name(sizeName);
	            size = sizeRepository.save(size);
	            sizeId = size.getSize_id();
	        }

	        // Return the Size_id
	        return sizeId;
	}
}
