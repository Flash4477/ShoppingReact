package com.example.springrestapi.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "Category")
public class Category {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	 	@Column(name="Category_id")
		private Long  Category_id;
	 	@Column(name="Name_Category")
		private String Name_Category;
}
