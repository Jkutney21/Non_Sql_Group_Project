package com.group.Backend.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.group.Backend.Domain.Course;
import com.group.Backend.Service.CourseService;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from the frontend
public class CourseController {

    private static final Logger logger = LoggerFactory.getLogger(CourseController.class);

    @Autowired
    private CourseService courseService;

    @PostMapping("/add")
    public Course addCourse(@RequestBody Course course) {
        logger.info("Received request to add a course: {}", course);
        Course addedCourse = courseService.addCourse(course);
        logger.info("Course added successfully: {}", addedCourse);
        return addedCourse;
    }

    @GetMapping("/department")
    public List<Course> getCoursesByDepartment(@RequestParam String department) {
        logger.info("Received request to get courses by department: {}", department);
        if (department == null || department.isEmpty()) {
            logger.error("Department is null or empty");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Department cannot be null or empty");
        }
        List<Course> courses = courseService.getCoursesByDepartment(department);
        logger.info("Courses retrieved for department {}: {}", department, courses);
        return courses;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        logger.info("Received request to get all courses");
        List<Course> courses = courseService.getAllCourses();
        logger.info("All courses retrieved: {}", courses);
        return courses;
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable String id) {
        logger.info("Received request to get course by ID: {}", id);
        Course course = courseService.getCourseById(id);
        if (course == null) {
            logger.error("Course not found with ID: {}", id);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found");
        }
        logger.info("Course retrieved: {}", course);
        return course;
    }

    @DeleteMapping("/{id}")
    public String deleteCourse(@PathVariable String id) {
        logger.info("Received request to delete course with ID: {}", id);
        courseService.deleteCourse(id);
        logger.info("Course deleted successfully with ID: {}", id);
        return "Course deleted successfully!";
    }
}