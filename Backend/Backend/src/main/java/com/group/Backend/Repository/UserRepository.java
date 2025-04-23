package com.group.Backend.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.group.Backend.Domain.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}