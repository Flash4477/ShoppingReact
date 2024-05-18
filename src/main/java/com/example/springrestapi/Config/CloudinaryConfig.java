package com.example.springrestapi.Config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Value("${cloudinary.cloud-name}")
    private String cloudName;

    @Value("${cloudinary.api-key}")
    private String apiKey;

    @Value("${cloudinary.api-secret}")
    private String apiSecret;

    @Bean
    public Cloudinary cloudinary() {
        // Add your Cloudinary configuration here
    	return new Cloudinary(ObjectUtils.asMap(
    	        "cloud_name", "df0kl17wd",
    	        "api_key", "515339362473582",
    	        "api_secret", "O9NtBTBiB5MrQ04gjr3wf4G4ck0"));
    }
}
