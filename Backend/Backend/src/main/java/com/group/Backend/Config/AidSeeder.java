package com.group.Backend.Config;

import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.github.javafaker.Faker;
import com.group.Backend.Domain.FinancialAid;
import com.group.Backend.Domain.User;
import com.group.Backend.Repository.FinancialAidRepository;
import com.group.Backend.Repository.UserRepository;

@Component
public class AidSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(AidSeeder.class);

    private final FinancialAidRepository financialAidRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Faker faker = new Faker();
    private final Random random = new Random();

    public AidSeeder(FinancialAidRepository financialAidRepository, UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.financialAidRepository = financialAidRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (financialAidRepository.count() == 0) {
            logger.info("Starting the financial aid seeding process...");

            // Add default student and staff accounts
            createDefaultAccounts();

            // Ensure there are at least 10 students in the database
            ensureMinimumStudents(20);

            // Filter users to include only students
            List<User> students = userRepository.findAll().stream()
                    .filter(user -> "STUDENT".equalsIgnoreCase(user.getRole()))
                    .toList();

            if (students.isEmpty()) {
                logger.warn("No students found in the database. Skipping financial aid seeding.");
                return;
            }

            for (User student : students) {
                // Always seed a "Pending" financial aid record with a non-zero amount
                FinancialAid pendingAid = new FinancialAid();
                pendingAid.setUserId(student.getUserId());
                pendingAid.setEmail(student.getEmail());
                pendingAid.setType("Pending");
                pendingAid.setAmount(1000 + random.nextInt(4001)); // Random amount between $1000 and $5000
                financialAidRepository.save(pendingAid);
                logger.info("Created 'Pending' financial aid record for student {} with amount ${}",
                        student.getEmail(), pendingAid.getAmount());

                // Seed 1-3 additional random financial aid records
                int aidCount = random.nextInt(3) + 1; // Each student gets 1-3 additional financial aid records
                IntStream.range(0, aidCount).forEach(i -> {
                    String type = generateAidType();
                    double amount = 500 + random.nextInt(4501); // Random amount between $500 and $5000

                    FinancialAid aid = new FinancialAid();
                    aid.setUserId(student.getUserId());
                    aid.setEmail(student.getEmail());
                    aid.setType(type);
                    aid.setAmount(amount);

                    financialAidRepository.save(aid);
                    logger.info("Created financial aid record for student {}: {} - ${}", student.getEmail(), type,
                            amount);
                });
            }

            logger.info("Financial aid seeding process completed.");
        } else {
            logger.info("Financial aid records already exist in the database. Skipping seeding process.");
        }
    }

    private void createDefaultAccounts() {
        if (userRepository.findByEmail("student@example.com") == null) {
            User student = new User("student@example.com",
                    passwordEncoder.encode("password123"), "STUDENT", "Computer Science");
            userRepository.save(student);
            logger.info("Default student account created: {}", student.getEmail());
        }
    }

    private void ensureMinimumStudents(int minimum) {
        long currentStudentCount = userRepository.findAll().stream()
                .filter(user -> "STUDENT".equalsIgnoreCase(user.getRole()))
                .count();

        if (currentStudentCount < minimum) {
            int studentsToCreate = minimum - (int) currentStudentCount;
            logger.info("Creating {} additional students to meet the minimum requirement of {}", studentsToCreate,
                    minimum);

            IntStream.range(0, studentsToCreate).forEach(i -> {
                String name = faker.name().fullName();
                String email = name.replaceAll(" ", ".").toLowerCase() + "@example.com";
                String password = passwordEncoder.encode("password123");
                String program = faker.educator().course();

                if (userRepository.findByEmail(email) == null) {
                    User student = new User(email, password, "STUDENT", program);
                    userRepository.save(student);
                    logger.info("Created student: {}", email);
                }
            });
        }
    }

    private String generateAidType() {
        String[] aidTypes = { "Scholarship", "Grant", "Loan", "Work-Study" }; // Exclude "Pending" from random types
        return aidTypes[random.nextInt(aidTypes.length)];
    }
}
