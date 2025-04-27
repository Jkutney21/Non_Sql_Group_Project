package com.group.Backend.Controller;

import java.util.List;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.group.Backend.Domain.FinancialAid;
import com.group.Backend.Service.FinancialAidService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
}
