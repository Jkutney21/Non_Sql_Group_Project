package com.group.Backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.group.Backend.Domain.FinancialAid;
import com.group.Backend.Repository.FinancialAidRepository;

@Service
public class FinancialAidService {
    private final FinancialAidRepository repo;

    public FinancialAidService(FinancialAidRepository repo) {
        this.repo = repo;
    }

    public List<FinancialAid> getAidByUser(String userId) {
        return repo.findByUserId(userId);
    }

    public FinancialAid addAid(FinancialAid aid) {
        return repo.save(aid);
    }

    public List<FinancialAid> getAidByType(String type) {
        return repo.findByType(type);
    }
    
    public FinancialAid getAidById(String id) {
        return repo.findById(id).orElse(null);
    }

    public FinancialAid updateAid(FinancialAid aid) {
        return repo.save(aid);
    }
}
