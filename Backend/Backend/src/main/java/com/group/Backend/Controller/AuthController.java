package com.group.Backend.Controller;

import com.group.Backend.DTO.AuthRequest;
import com.group.Backend.DTO.RegisterRequest;
import com.group.Backend.Domain.User;
import com.group.Backend.Security.JwtUtil;
import com.group.Backend.Service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from the frontend
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RegistrationService registrationService; // ✅ Added this

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        System.out.println("Login request received: " + authRequest);
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()
                    )
            );

            // Generate the JWT token
            String token = jwtUtil.generateToken(authRequest.getEmail());

            // Extract expiration time from the token
            Date expiration = jwtUtil.extractExpiration(token);
            System.out.println("Authentication successful, token generated. Expiration time: " + expiration);

            // Return the token and expiration in the response
            return ResponseEntity.ok().body(Map.of(
                    "token", token,
                    "expiresAt", expiration.toString()
            ));
        } catch (AuthenticationException e) {
            System.out.println("Authentication failed: " + e.getMessage());
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }


    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterRequest request) {
        User user = registrationService.register(request);
        return ResponseEntity.ok(user);
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
