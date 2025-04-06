package com.group.Backend.Service;

import com.group.Backend.Domain.User;
import com.group.Backend.Domain.UserRepository;
import com.group.Backend.DTO.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

        // Save user
        User user = new User(request.getEmail(), hashedPassword);
        return userRepository.save(user);
    }
}
