package com.group.Backend.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group.Backend.Domain.FinancialAid;
import com.group.Backend.Service.FinancialAidService;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from the frontend
@RequestMapping("/api/aid")
public class FinancialAidController {

    private final FinancialAidService service;

    public FinancialAidController(FinancialAidService service) {
        this.service = service;
    }

    @GetMapping("/user/{userId}")
    public List<FinancialAid> getAidByUser(@PathVariable String userId) {
        return service.getAidByUser(userId);
    }

    @PostMapping
    public FinancialAid createAid(@RequestBody FinancialAid aid) {
        return service.addAid(aid);
    }
}
