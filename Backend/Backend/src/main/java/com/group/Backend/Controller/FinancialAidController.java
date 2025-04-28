package com.group.Backend.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.group.Backend.Domain.FinancialAid;
import com.group.Backend.Service.FinancialAidService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/aid")
public class FinancialAidController {

    private static final Logger logger = LoggerFactory.getLogger(FinancialAidController.class);

    private final FinancialAidService service;

    public FinancialAidController(FinancialAidService service) {
        this.service = service;
    }

    @GetMapping("/user/{userId}")
    public List<FinancialAid> getAidByUser(@PathVariable("userId") String userId) {
        try {
            logger.info("Received request to get financial aid for user with ID: {}", userId);
            List<FinancialAid> aidList = service.getAidByUser(userId);
            if (aidList.isEmpty()) {
                logger.warn("No financial aid records found for user with ID: {}", userId);
            } else {
                logger.info("Retrieved {} financial aid records for user with ID: {}", aidList.size(), userId);
            }
            return aidList;
        } catch (Exception e) {
            logger.error("Error occurred while retrieving financial aid for user with ID: {}", userId, e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "An error occurred while processing the request");
        }
    }

    @PostMapping
    public FinancialAid createAid(@RequestBody FinancialAid aid) {
        return service.addAid(aid);
    }

    @GetMapping("/type/{type}")
    public List<FinancialAid> getAidByType(@PathVariable("type") String type) {
        logger.info("Received request to get financial aid with type: {}", type);
        try {
            List<FinancialAid> aidList = service.getAidByType(type);

            if (aidList.isEmpty()) {
                logger.warn("No financial aid records found with type: {}", type);
            } else {
                logger.info("Retrieved {} financial aid records with type: {}", aidList.size(), type);
            }

            return aidList;
        } catch (Exception e) {
            logger.error("Error occurred while retrieving financial aid with type: {}", type, e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "An error occurred while processing the request");
        }
    }

    @PutMapping("/{id}/type")
    public FinancialAid updateAidType(@PathVariable("id") String id, @RequestBody String type) {
        logger.info("Received request to update financial aid type for ID: {} to {}", id, type);
        try {
            // Validate that the type is not null or empty
            if (type == null || type.trim().isEmpty()) {
                logger.warn("Invalid type provided for ID: {}", id);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Type cannot be null or empty");
            }

            FinancialAid aid = service.getAidById(id);
            if (aid == null) {
                logger.warn("No financial aid record found with ID: {}", id);
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Financial aid record not found");
            }

            aid.setType(type.trim()); // Trim any extra whitespace
            FinancialAid updatedAid = service.updateAid(aid);
            logger.info("Updated financial aid type for ID: {} to {}", id, type);
            return updatedAid;
        } catch (Exception e) {
            logger.error("Error occurred while updating financial aid type for ID: {}", id, e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "An error occurred while processing the request");
        }
    }

}
