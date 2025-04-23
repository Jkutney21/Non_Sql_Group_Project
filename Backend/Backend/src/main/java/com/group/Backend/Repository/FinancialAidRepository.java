package com.group.Backend.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.group.Backend.Domain.FinancialAid;

import java.util.List;

public interface FinancialAidRepository extends MongoRepository<FinancialAid, String> {
    List<FinancialAid> findByUserId(String userId);
}