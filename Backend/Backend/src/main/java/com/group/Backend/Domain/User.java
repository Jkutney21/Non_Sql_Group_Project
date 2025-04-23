package com.group.Backend.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Entity;

@Entity
@Document(collection = "users")
public class User {

    @Id
    private String email;
    private String password;
    private String role = "USER";
    private String program; // New field for program

    // Constructors
    public User() {
    }

    public User(String email, String password, String role, String program) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.program = program;
    }

    // Getters and Setters
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