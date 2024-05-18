package com.example.springrestapi.Model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "shoppingcart")
public class ShoppingCart {


	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Cart_id")
    private Long Cart_id;

    @ManyToOne
    @JoinColumn(name = "nguoi_dung_id")
    private User nguoiDung;

    @ManyToOne
    @JoinColumn(name = "productsizeid")
    private ProductSize productsize;

    @Column(name = "Quantity")
    private int quantity;
    
    @Column(name="pricecart")
    private Integer PriceCart;


}
