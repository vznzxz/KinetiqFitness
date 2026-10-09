package com.kinetiq.service;

import com.kinetiq.dto.AdminStatsResponse;
import com.kinetiq.dto.ChallengeRequest;
import com.kinetiq.dto.UserRoleRequest;
import com.kinetiq.exception.ResourceNotFoundException;
import com.kinetiq.model.*;
import com.kinetiq.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private FitnessContentRepository contentRepository;

    @Autowired
    private SystemSettingRepository systemSettingRepository;

    @Autowired
    private ActivityLogRepository activityLogRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public User updateUserRoleAndStatus(Long userId, UserRoleRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }
        if (request.getStatus() != null) {
            user.setStatus(request.getStatus());
        }

        User saved = userRepository.save(user);

        activityLogRepository.save(new ActivityLog(
                "User Permissions Updated",
                "User " + user.getEmail() + " set to " + user.getRole() + " (" + user.getStatus() + ")",
                "Admin",
                "user"
        ));

        return saved;
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        userRepository.delete(user);

        activityLogRepository.save(new ActivityLog(
                "User Deleted",
                "User " + user.getEmail() + " removed by Admin",
                "Admin",
                "user"
        ));
    }

    @Transactional
    public Challenge createChallenge(ChallengeRequest request) {
        Challenge ch = new Challenge();
        ch.setTitle(request.getTitle());
        ch.setDescription(request.getDescription());
        ch.setCategory(request.getCategory());
        ch.setTargetValue(request.getTargetValue());
        ch.setUnit(request.getUnit());
        ch.setTotalDays(request.getTotalDays());
        ch.setRewardBadge(request.getRewardBadge());
        ch.setRewardPoints(request.getRewardPoints());
        ch.setIcon(request.getIcon() != null ? request.getIcon() : "flame");
        ch.setStartDate(request.getStartDate());
        ch.setEndDate(request.getEndDate());
        ch.setActive(true);

        Challenge saved = challengeRepository.save(ch);

        activityLogRepository.save(new ActivityLog(
                "Created Challenge",
                "Admin launched new challenge: " + saved.getTitle(),
                "Admin",
                "challenge"
        ));

        return saved;
    }

    @Transactional
    public void deleteChallenge(Long challengeId) {
        Challenge ch = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new ResourceNotFoundException("Challenge not found with id: " + challengeId));

        challengeRepository.delete(ch);

        activityLogRepository.save(new ActivityLog(
                "Deleted Challenge",
                "Admin removed challenge: " + ch.getTitle(),
                "Admin",
                "challenge"
        ));
    }

    public Map<String, String> getSystemSettings() {
        List<SystemSetting> list = systemSettingRepository.findAll();
        Map<String, String> settings = new HashMap<>();
        for (SystemSetting s : list) {
            settings.put(s.getSettingKey(), s.getSettingValue());
        }
        return settings;
    }

    @Transactional
    public Map<String, String> updateSystemSettings(Map<String, String> newSettings) {
        for (Map.Entry<String, String> entry : newSettings.entrySet()) {
            SystemSetting setting = systemSettingRepository.findBySettingKey(entry.getKey())
                    .orElse(new SystemSetting(entry.getKey(), entry.getValue(), "Application configuration"));
            setting.setSettingValue(entry.getValue());
            systemSettingRepository.save(setting);
        }

        activityLogRepository.save(new ActivityLog(
                "System Settings Updated",
                "Admin adjusted system settings: " + newSettings.keySet(),
                "Admin",
                "system"
        ));

        return getSystemSettings();
    }

    public List<ActivityLog> getRecentActivity() {
        return activityLogRepository.findTop50Logs();
    }

    public AdminStatsResponse getAdminStats() {
        long totalUsers = userRepository.count();
        long totalWorkouts = workoutRepository.count();
        Long totalCalories = workoutRepository.sumTotalCaloriesBurnedAllUsers();
        Long totalMinutes = workoutRepository.sumTotalDurationMinutesAllUsers();
        long activeChallenges = challengeRepository.count();
        long pendingContent = contentRepository.findByStatusOrderByCreatedAtDesc("PENDING").size();

        return new AdminStatsResponse(
                totalUsers,
                totalWorkouts,
                totalCalories != null ? totalCalories : 0L,
                totalMinutes != null ? totalMinutes : 0L,
                activeChallenges,
                pendingContent
        );
    }
}
