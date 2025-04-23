package com.group.Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group.Backend.Domain.FinancialAid;

public interface FinancialAidRepository extends JpaRepository<FinancialAid, String> {
    List<FinancialAid> findByUserId(String userId);
}