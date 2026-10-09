package com.kinetiq.service;

import com.kinetiq.exception.BadRequestException;
import com.kinetiq.exception.ResourceNotFoundException;
import com.kinetiq.model.ActivityLog;
import com.kinetiq.model.Challenge;
import com.kinetiq.model.ChallengeParticipation;
import com.kinetiq.model.User;
import com.kinetiq.repository.ActivityLogRepository;
import com.kinetiq.repository.ChallengeParticipationRepository;
import com.kinetiq.repository.ChallengeRepository;
import com.kinetiq.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
public class ChallengeService {

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private ChallengeParticipationRepository participationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityLogRepository activityLogRepository;

    public List<Map<String, Object>> getChallengesForUser(User user) {
        List<Challenge> challenges = challengeRepository.findAllByOrderByCreatedAtDesc();
        List<ChallengeParticipation> participations = participationRepository.findByUserId(user.getId());

        Map<Long, ChallengeParticipation> userPartMap = new HashMap<>();
        for (ChallengeParticipation p : participations) {
            userPartMap.put(p.getChallenge().getId(), p);
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (Challenge ch : challenges) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", ch.getId());
            map.put("title", ch.getTitle());
            map.put("description", ch.getDescription());
            map.put("category", ch.getCategory());
            map.put("targetValue", ch.getTargetValue());
            map.put("unit", ch.getUnit());
            map.put("totalDays", ch.getTotalDays());
            map.put("rewardBadge", ch.getRewardBadge());
            map.put("rewardPoints", ch.getRewardPoints());
            map.put("icon", ch.getIcon());
            map.put("active", ch.getActive());
            map.put("startDate", ch.getStartDate());
            map.put("endDate", ch.getEndDate());

            long participantsCount = participationRepository.countByChallengeId(ch.getId());
            map.put("participantsCount", participantsCount);

            ChallengeParticipation p = userPartMap.get(ch.getId());
            if (p != null) {
                map.put("userStatus", p.getStatus());
                map.put("userProgress", p.getCurrentProgress());
                map.put("joinedDate", p.getJoinedDate());
                map.put("completedDate", p.getCompletedDate());
            } else {
                map.put("userStatus", "Available");
                map.put("userProgress", 0);
            }

            result.add(map);
        }

        return result;
    }

    public Challenge getChallengeById(Long id) {
        return challengeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Challenge not found with id: " + id));
    }

    @Transactional
    public ChallengeParticipation joinChallenge(User user, Long challengeId) {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new ResourceNotFoundException("Challenge not found with id: " + challengeId));

        Optional<ChallengeParticipation> existing = participationRepository.findByUserIdAndChallengeId(user.getId(), challengeId);
        if (existing.isPresent()) {
            throw new BadRequestException("You have already joined this challenge: " + challenge.getTitle());
        }

        ChallengeParticipation participation = new ChallengeParticipation(user, challenge);
        ChallengeParticipation saved = participationRepository.save(participation);

        activityLogRepository.save(new ActivityLog(
                "Joined Challenge",
                user.getName() + " enrolled in " + challenge.getTitle(),
                user.getName(),
                "challenge"
        ));

        return saved;
    }

    @Transactional
    public ChallengeParticipation checkInChallenge(User user, Long challengeId, int increment) {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new ResourceNotFoundException("Challenge not found with id: " + challengeId));

        ChallengeParticipation participation = participationRepository.findByUserIdAndChallengeId(user.getId(), challengeId)
                .orElseThrow(() -> new BadRequestException("You must join this challenge before recording progress"));

        int nextProgress = Math.min(challenge.getTotalDays(), participation.getCurrentProgress() + increment);
        participation.setCurrentProgress(nextProgress);

        if (nextProgress >= challenge.getTotalDays() && !"COMPLETED".equalsIgnoreCase(participation.getStatus())) {
            participation.setStatus("COMPLETED");
            participation.setCompletedDate(LocalDate.now());

            // Award points and streak bonus to user
            User freshUser = userRepository.findById(user.getId()).orElse(user);
            freshUser.setPoints(freshUser.getPoints() + challenge.getRewardPoints());
            userRepository.save(freshUser);

            activityLogRepository.save(new ActivityLog(
                    "Challenge Completed",
                    user.getName() + " conquered " + challenge.getTitle() + " (Earned " + challenge.getRewardBadge() + " + " + challenge.getRewardPoints() + " pts)",
                    user.getName(),
                    "challenge"
            ));
        } else {
            activityLogRepository.save(new ActivityLog(
                    "Challenge Check-In",
                    user.getName() + " checked into " + challenge.getTitle() + " (" + nextProgress + "/" + challenge.getTotalDays() + ")",
                    user.getName(),
                    "challenge"
            ));
        }

        return participationRepository.save(participation);
    }

    public List<ChallengeParticipation> getUserHistory(User user) {
        return participationRepository.findByUserIdAndStatus(user.getId(), "COMPLETED");
    }
}
