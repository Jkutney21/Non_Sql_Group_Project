package com.group.Backend.Config;

import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
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
    private final Faker faker = new Faker();
    private final Random random = new Random();

    public AidSeeder(FinancialAidRepository financialAidRepository, UserRepository userRepository) {
        this.financialAidRepository = financialAidRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        if (financialAidRepository.count() == 0) {
            logger.info("Starting the financial aid seeding process...");

            List<User> users = userRepository.findAll();
            if (users.isEmpty()) {
                logger.warn("No users found in the database. Skipping financial aid seeding.");
                return;
            }

            for (User user : users) {
                int aidCount = random.nextInt(3) + 1; // Each user gets 1-3 financial aid records
                IntStream.range(0, aidCount).forEach(i -> {
                    String type = generateAidType();
                    double amount = 500 + random.nextInt(4501); // Random amount between $500 and $5000

                    FinancialAid aid = new FinancialAid();
                    aid.setUserId(user.getUserId());
                    aid.setType(type);
                    aid.setAmount(amount);

                    financialAidRepository.save(aid);
                    logger.info("Created financial aid record for user {}: {} - ${}", user.getEmail(), type, amount);
                });
            }

            logger.info("Financial aid seeding process completed.");
        } else {
            logger.info("Financial aid records already exist in the database. Skipping seeding process.");
        }
    }

    private String generateAidType() {
        String[] aidTypes = { "Scholarship", "Grant", "Loan", "Work-Study" };
        return aidTypes[random.nextInt(aidTypes.length)];
    }
}