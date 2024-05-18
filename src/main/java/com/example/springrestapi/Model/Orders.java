package com.example.springrestapi.Model;

import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Orders")
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Order_id")
	private Long Order_id;

	@Column(name = "subtotal")
	private int Subtotal;

	@Column(name = "Paymentmethod")
	private String Paymentmethod;

	@CreationTimestamp
	@Column(name = "createat", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Date createAt;

	@ManyToOne // Đánh dấu mối quan hệ nhiều một
	@JoinColumn(name = "nguoi_dung_id") // Tên cột làm khóa ngoại
	private User nguoiDung; // Tên trường là đối tượng tham chiếu đến User

}
