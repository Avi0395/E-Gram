package com.egram.egram.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.egram.egram.model.Citizen;

public interface CitizenRepository extends JpaRepository<Citizen, Long> {
    boolean existsByAadhaarNumber(String aadhaarNumber);

    Optional<Citizen> findByAadhaarNumber(String aadhaarNumber);
}
