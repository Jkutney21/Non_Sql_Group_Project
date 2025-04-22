package com.group.Backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group.Backend.Domain.Course;
import com.group.Backend.Domain.CourseRepository;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository; // Corrected type

    public Course addCourse(Course course) {
        return courseRepository.save(course); // Save a new course
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll(); // Retrieve all courses
    }

    public Course getCourseById(String courseId) {
        return courseRepository.findById(courseId).orElse(null); // Find a course by ID
    }

    public void deleteCourse(String courseId) {
        courseRepository.deleteById(courseId); // Delete a course by ID
    }
}