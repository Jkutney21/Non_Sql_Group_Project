package com.group.Backend.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "courses") // Specify the collection name
public class Course {

    @Id
    private String courseId; // Unique identifier for the course
    private String teacherName; // Name of the teacher
    private String program; // Program that usually takes this course
    private String time; // Time of the course
    private String level; // New field for level (e.g., Undergraduate or Graduate)

    // Constructors
    public Course() {
    }

    public Course(String courseId, String teacherName, String program, String time, String level) {
        this.courseId = courseId;
        this.teacherName = teacherName;
        this.program = program;
        this.time = time;
        this.level = level;
    }

    // Getters and Setters
    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
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

    public String getLevel() { // Getter for level
        return level;
    }

    public void setLevel(String level) { // Setter for level
        this.level = level;
    }
}