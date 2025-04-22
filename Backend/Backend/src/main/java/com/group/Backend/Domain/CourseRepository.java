package com.group.Backend.Domain;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRepository extends MongoRepository<Course, String> {
    // Additional query methods can be defined here if needed
}