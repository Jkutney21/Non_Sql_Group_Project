package com.group.Backend.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.group.Backend.Domain.FinancialAid;

public interface FinancialAidRepository extends MongoRepository<FinancialAid, String> {
    List<FinancialAid> findByUserId(String userId);

    List<FinancialAid> findByType(String type);
}
