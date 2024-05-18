package com.example.springrestapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@EntityScan(basePackages = "com.example.springrestapi.Model")
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class SpringrestapiShoppeApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringrestapiShoppeApplication.class, args);
	}

}
