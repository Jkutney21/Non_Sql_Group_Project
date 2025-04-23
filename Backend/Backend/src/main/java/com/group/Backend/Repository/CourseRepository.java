package com.group.Backend.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.group.Backend.Domain.Course;

public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByProgramContainingIgnoreCase(String program);
}