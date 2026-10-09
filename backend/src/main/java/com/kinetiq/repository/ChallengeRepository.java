package com.kinetiq.repository;

import com.kinetiq.model.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    List<Challenge> findAllByOrderByCreatedAtDesc();
    List<Challenge> findByActiveTrueOrderByCreatedAtDesc();
}
