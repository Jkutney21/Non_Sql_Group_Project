package com.group.Backend.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group.Backend.DTO.AuthRequest;
import com.group.Backend.DTO.RegisterRequest;
import com.group.Backend.Domain.User;
import com.group.Backend.Repository.UserRepository;
import com.group.Backend.Security.JwtUtil;
import com.group.Backend.Service.RegistrationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://172.172.215.186:5173") // Allow requests from the frontend
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RegistrationService registrationService; // ✅ Added this
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        System.out.println("Login request received: " + authRequest);
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()));

            // Generate the JWT token
            String token = jwtUtil.generateToken(authRequest.getEmail());
            System.out.println("Authentication successful, token generated.");

            // Fetch the user's details from the database
            User user = userRepository.findByEmail(authRequest.getEmail());
            if (user == null) {
                return ResponseEntity.status(404).body("User not found");
            }

            // Return the token, program, and role in the response
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "program", user.getProgram(), // Replace expiration with program
                    "role", user.getRole(),
                    "id", user.getUserId()));
        } catch (AuthenticationException e) {
            System.out.println("Authentication failed: " + e.getMessage());
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterRequest request) {
        try {
            // Log the incoming request
            System.out.println("Received registration request: " + request);

            // Call the registration service
            User user = registrationService.register(request);

            // Log the successful registration
            System.out.println("User registered successfully: " + user);

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            // Log the exception
            System.err.println("Error occurred during registration: " + e.getMessage());
            e.printStackTrace();

            // Return an error response
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            System.out.println("Validate endpoint hit");

            // Check if the Authorization header is present and valid
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                System.out.println("Authorization header is missing or invalid: " + authHeader);
                return ResponseEntity.status(400).body("Missing or invalid Authorization header");
            }

            // Extract the token from the Authorization header
            String token = authHeader.substring(7); // Strip "Bearer "
            System.out.println("Extracted token: " + token);

            // Extract the username from the token
            String username = jwtUtil.extractUsername(token);

            System.out.println("Extracted username from token: " + username);

            // Validate the token
            if (!jwtUtil.validateToken(token)) {
                System.out.println("Token validation failed for token: " + token);
                return ResponseEntity.status(401).body("Invalid or expired token");
            }

            System.out.println("Token is valid for user: " + username);

            return ResponseEntity.ok(Map.of("message", "Token is valid", "user", username));
        } catch (Exception e) {
            System.out.println("Exception during token validation: " + e.getMessage());
            return ResponseEntity.status(401).body("Invalid token: " + e.getMessage());
        }
    }

}
