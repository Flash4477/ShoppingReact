package com.example.springrestapi.Reponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class LoginMessage  {
		String message;
		Boolean status;
}
