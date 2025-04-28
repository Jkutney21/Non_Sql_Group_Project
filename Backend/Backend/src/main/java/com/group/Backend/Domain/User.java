package com.group.Backend.Domain;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String id; // MongoDB's unique identifier
    private String userId; // Custom user ID
    private String email;
    private String password;
    private String role;
    private String program;

    // Default Constructor
    public User() {
        this.userId = generateUserId(); // Automatically generate userId
    }

    // Constructor with parameters
    public User(String email, String password, String role, String program) {
        this.userId = generateUserId(); // Automatically generate userId
        this.email = email;
        this.password = password;
        this.role = role;
        this.program = program;
    }

    // Utility method to generate a random userId
    private String generateUserId() {
        return UUID.randomUUID().toString();
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }
}
