package com.group.Backend.Domain;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByProgramContainingIgnoreCase(String program);
}