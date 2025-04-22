package com.group.Backend.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "courses") // Correctly applied at the class level
public class Course {

    @Id
    private String courseId;
    private String courseName;
    private String teacherName;
    private String program;
    private String time;
    private String level;

    // Default constructor (required by Spring Data)
    public Course() {
    }

    // Constructor with all fields
    public Course(String courseId, String courseName, String teacherName, String program, String time, String level) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.teacherName = teacherName;
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

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
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