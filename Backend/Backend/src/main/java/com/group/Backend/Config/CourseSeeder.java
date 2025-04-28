package com.group.Backend.Config;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.github.javafaker.Faker;
import com.group.Backend.Domain.Course;
import com.group.Backend.Domain.User;
import com.group.Backend.Repository.CourseRepository;
import com.group.Backend.Repository.UserRepository;

@Component
public class CourseSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(CourseSeeder.class);

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
            logger.info("Starting the course seeding process...");

            // Add default staff member
            User defaultStaff = addDefaultStaffMember();

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
                    int totalCourses = random.nextInt(31) + 20; // 20-50 courses
                    logger.info("Seeding {} courses for program: {}", totalCourses, program);

                    // Create teachers for this program
                    int teacherCount = totalCourses / 5 + 1; // One teacher per 5 courses roughly
                    List<User> programTeachers = IntStream.range(0, teacherCount)
                            .mapToObj(i -> {
                                String name = faker.name().fullName();
                                String email = name.replaceAll(" ", ".").toLowerCase() + "@example.com";
                                String encodedPwd = passwordEncoder.encode("letmein123");

                                // Save teacher user if not already there
                                if (userRepository.findByEmail(email) == null) {
                                    User user = new User(email, encodedPwd, "STAFF", program);
                                    userRepository.save(user);
                                    logger.info("Created user for teacher: {}", email);
                                }
                                return userRepository.findByEmail(email);
                            })
                            .toList();

                    // Add the default staff member to the list of teachers
                    programTeachers = new ArrayList<>(programTeachers);
                    programTeachers.add(defaultStaff);

                    // Assign courses to those teachers randomly (4–5 per teacher)
                    for (User teacher : programTeachers) {
                        if (!teacher.getProgram().equalsIgnoreCase(program)) {
                            logger.warn("Skipping teacher {} for program {} as they are not part of this program.",
                                    teacher.getEmail(), program);
                            continue; // Skip teachers not in the program
                        }

                        int teacherCourses = 4 + random.nextInt(2); // 4 to 5 courses
                        for (int i = 0; i < teacherCourses && totalCourses > 0; i++, totalCourses--) {
                            try {
                                String courseId = generateCourseId(program);
                                String courseName = generateCourseName(program);
                                String time = generateTime();
                                String level = random.nextBoolean() ? "Undergraduate" : "Graduate";

                                courseRepository.save(new Course(
                                        courseId, courseName, teacher.getEmail(), program, time, level));

                                logger.info("Assigned course {} - {} to teacher {}", courseId, courseName,
                                        teacher.getEmail());
                            } catch (Exception e) {
                                logger.error("Error creating course for program {}: {}", program, e.getMessage());
                            }
                        }
                    }
                }
            }

            logger.info("Course seeding process completed.");
        } else {
            logger.info("Courses already exist in the database. Skipping seeding process.");
        }
    }

    private User addDefaultStaffMember() {
        String email = "staff@example.com";
        String password = passwordEncoder.encode("password123");
        String role = "STAFF";
        String program = "computer science";

        User staff = userRepository.findByEmail(email);
        if (staff == null) {
            staff = new User(email, password, role, program);
            userRepository.save(staff);
            logger.info("Default staff member created: {}", email);
        } else {
            logger.info("Default staff member already exists: {}", email);
        }
        return staff;
    }

    private String generateCourseId(String program) {
        String code = program.replaceAll("[^A-Za-z]", "").toUpperCase();
        code = code.length() > 4 ? code.substring(0, 4) : code;
        return code + (100 + random.nextInt(400));
    }

    private String generateCourseName(String program) {
        String[] courseTopics = {
                "Introduction to",
                "Advanced",
                "Fundamentals of",
                "Principles of",
                "Applications of",
                "Foundations of",
                "Essentials of",
                "Theory of",
                "Concepts of",
                "Basics of",
                "Perspectives on",
                "Overview of",
                "Topics in",
                "Survey of",
                "Techniques in",
                "Strategies for",
                "Exploration of",
                "Methods in",
                "Practices in",
                "Contemporary Issues in"
        };
        return courseTopics[random.nextInt(courseTopics.length)] + " " + program;
    }

    private String generateTime() {
        String[] days = { "MWF", "TR" };
        int hour = 8 + random.nextInt(8); // 8 AM to 3 PM
        return days[random.nextInt(days.length)] + " " + hour + ":00–" + (hour + 1) + ":15";
    }
}
