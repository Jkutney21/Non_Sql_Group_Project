package com.group.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group.Backend.Domain.User;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);
}