package com.kinetiq.repository;

import com.kinetiq.model.ChallengeParticipation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChallengeParticipationRepository extends JpaRepository<ChallengeParticipation, Long> {
    List<ChallengeParticipation> findByUserId(Long userId);
    Optional<ChallengeParticipation> findByUserIdAndChallengeId(Long userId, Long challengeId);
    long countByChallengeId(Long challengeId);
    List<ChallengeParticipation> findByChallengeId(Long challengeId);
    List<ChallengeParticipation> findByUserIdAndStatus(Long userId, String status);
}
