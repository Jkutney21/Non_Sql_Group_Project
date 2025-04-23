package com.group.Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.group.Backend.Config",
    "com.group.Backend.Controller",
    "com.group.Backend.Service",
    "com.group.Backend.Repository",
    "com.group.Backend.Domain",
    "com.group.Backend.DTO",
    "com.group.Backend.Security"
})
public class BackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
}