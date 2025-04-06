package com.group.Backend.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Apply CORS mapping to all endpoints
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") 
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow these HTTP methods
                .allowedHeaders("Origin", "Content-Type", "Accept", "Authorization") // Allow these headers in requests
                .exposedHeaders("Authorization") // If needed, expose Authorization headers in responses
                .allowCredentials(true); // Allow sending credentials (cookies, etc.)
    }


}
