package com.group.Backend.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "courses")
public class Course {

    @Id
    private String courseId;
    private String courseName;
    private String email; // Add this field for teacher's email
    private String program;
    private String time;
    private String level;

    // Default constructor
    public Course() {
    }

    // Constructor with all fields
    public Course(String courseId, String courseName, String email, String program, String time, String level) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.email = email;
        this.program = program;
        this.time = time;
        this.level = level;
    }

    // Getters and setters
    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }
}
