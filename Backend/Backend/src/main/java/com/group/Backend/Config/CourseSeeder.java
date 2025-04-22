package com.group.Backend.Config;

import java.util.List;
import com.github.javafaker.Faker;
import java.util.Random;
import java.util.stream.IntStream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.group.Backend.Domain.Course;
import com.group.Backend.Domain.CourseRepository;
import com.group.Backend.Domain.User;
import com.group.Backend.Domain.UserRepository;

@Component
public class CourseSeeder implements CommandLineRunner {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Faker faker = new Faker();
    private final Random random = new Random();

    public CourseSeeder(CourseRepository courseRepository, UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (courseRepository.count() == 0) {
            List<List<String>> collegesPrograms = List.of(
                    List.of("Communication Studies", "English", "History", "Sociology", "Political Science",
                            "Theatre and Dance", "Art and Design", "Music", "Religious Studies", "Women's Studies"),
                    List.of("Elementary Education", "Early Childhood Education", "Secondary Education",
                            "Special Education", "Educational Leadership", "Career and Technology Education"),
                    List.of("Health Studies", "Nursing", "Nutrition", "Kinesiology", "Biology", "Environmental Science",
                            "Computer Science", "Cybersecurity", "Design and Drafting Technology"),
                    List.of("Accounting", "Finance", "Marketing", "Management", "Entrepreneurship", "Aviation",
                            "Criminal Justice", "Social Work"));

            for (List<String> programList : collegesPrograms) {
                for (String program : programList) {
                    int count = random.nextInt(31) + 20; // between 20 and 50
                    IntStream.range(0, count).forEach(i -> {
                        String courseId = generateCourseId(program);
                        String teacher = faker.name().fullName();
                        String time = generateTime();
                        String level = random.nextBoolean() ? "Undergraduate" : "Graduate";

                        // Save the course
                        courseRepository.save(new Course(courseId, teacher, program, time, level));

                        // Create a user for the teacher with role STAFF
                        if (userRepository
                                .findByEmail(teacher.replaceAll(" ", ".").toLowerCase() + "@example.com") == null) {
                            String email = teacher.replaceAll(" ", ".").toLowerCase() + "@example.com";
                            String password = passwordEncoder.encode("password123"); // Default password
                            userRepository.save(new User(email, password, "STAFF", program));
                        }
                    });
                }
            }
        }
    }

    private String generateCourseId(String program) {
        String code = program.replaceAll("[^A-Za-z]", "").toUpperCase();
        code = code.length() > 4 ? code.substring(0, 4) : code;
        return code + (100 + random.nextInt(400));
    }

    private String generateTime() {
        String[] days = { "MWF", "TR" };
        int hour = 8 + random.nextInt(8); // 8 AM to 3 PM
        return days[random.nextInt(days.length)] + " " + hour + ":00–" + (hour + 1) + ":15";
    }
}