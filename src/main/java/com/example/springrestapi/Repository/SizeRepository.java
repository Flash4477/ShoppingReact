package com.example.springrestapi.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.springrestapi.Model.Size;

@Repository
public interface SizeRepository extends JpaRepository<Size, Long> {
	 @Query("SELECT s.Size_id FROM Size s WHERE s.Size_Name = :sizeName")
	    Long findSizeIdBySizeName(@Param("sizeName") String sizeName);

}
	