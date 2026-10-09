package com.kinetiq.repository;

import com.kinetiq.model.FitnessContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FitnessContentRepository extends JpaRepository<FitnessContent, Long> {
    List<FitnessContent> findAllByOrderByCreatedAtDesc();
    List<FitnessContent> findByStatusOrderByCreatedAtDesc(String status);
}
