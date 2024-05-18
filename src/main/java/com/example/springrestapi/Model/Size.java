package com.example.springrestapi.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "Size")
public class Size {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	 	@Column(name="Size_id")
	    private Long Size_id;
	 	
	 	@Column(name="Size_Name")
	 	private String Size_Name;
	 	
//	 	@OneToMany(mappedBy = "size")
////	 	@JsonIgnore
//	    private List<Productp> productSizes;
}
