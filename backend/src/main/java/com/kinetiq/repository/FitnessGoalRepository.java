package com.kinetiq.repository;

import com.kinetiq.model.FitnessGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FitnessGoalRepository extends JpaRepository<FitnessGoal, Long> {
    Optional<FitnessGoal> findByUserId(Long userId);
}
