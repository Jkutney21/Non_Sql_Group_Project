package com.group.Backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.group.Backend.DTO.RegisterRequest;
import com.group.Backend.Domain.User;
import com.group.Backend.Repository.UserRepository;

@Service
public class RegistrationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(RegisterRequest request) {
        // Check for existing user
        if (userRepository.findByEmail(request.getEmail()) != null) {
            throw new RuntimeException("Email already in use.");
        }

        // Hash password
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        // Save user with default role "USER"
        User user = new User(request.getEmail(), hashedPassword, "STUDENT", request.getProgram()); // Set default role to "STUDENT"
        user.setRole(request.getRole()); // Set the role from the request
        return userRepository.save(user);
    }
}