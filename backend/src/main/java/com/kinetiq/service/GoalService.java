package com.kinetiq.service;

import com.kinetiq.dto.GoalRequest;
import com.kinetiq.dto.WeightLogRequest;
import com.kinetiq.model.ActivityLog;
import com.kinetiq.model.FitnessGoal;
import com.kinetiq.model.User;
import com.kinetiq.model.WeightLog;
import com.kinetiq.repository.ActivityLogRepository;
import com.kinetiq.repository.FitnessGoalRepository;
import com.kinetiq.repository.UserRepository;
import com.kinetiq.repository.WeightLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class GoalService {

    @Autowired
    private FitnessGoalRepository goalRepository;

    @Autowired
    private WeightLogRepository weightLogRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityLogRepository activityLogRepository;

    public FitnessGoal getGoal(User user) {
        return goalRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    FitnessGoal newGoal = new FitnessGoal(user, 4, 2500, user.getCurrentWeight(), user.getTargetWeight());
                    return goalRepository.save(newGoal);
                });
    }

    @Transactional
    public FitnessGoal updateGoal(User user, GoalRequest request) {
        FitnessGoal goal = getGoal(user);

        if (request.getWeeklyWorkoutsTarget() != null) {
            goal.setWeeklyWorkoutsTarget(request.getWeeklyWorkoutsTarget());
        }
        if (request.getWeeklyCaloriesTarget() != null) {
            goal.setWeeklyCaloriesTarget(request.getWeeklyCaloriesTarget());
        }
        if (request.getStartingWeightKg() != null) {
            goal.setStartingWeightKg(request.getStartingWeightKg());
        }
        if (request.getTargetWeightKg() != null) {
            goal.setTargetWeightKg(request.getTargetWeightKg());
            // Update user target weight as well
            User u = userRepository.findById(user.getId()).orElse(user);
            u.setTargetWeight(request.getTargetWeightKg());
            userRepository.save(u);
        }
        if (request.getDeadline() != null) {
            goal.setDeadline(request.getDeadline());
        }
        goal.setUpdatedAt(LocalDateTime.now());

        activityLogRepository.save(new ActivityLog(
                "Updated Fitness Goal",
                user.getName() + " updated weekly workout and calorie targets",
                user.getName(),
                "workout"
        ));

        return goalRepository.save(goal);
    }

    public List<WeightLog> getWeightHistory(User user) {
        return weightLogRepository.findByUserIdOrderByRecordedDateAsc(user.getId());
    }

    @Transactional
    public WeightLog logWeight(User user, WeightLogRequest request) {
        LocalDate date = request.getRecordedDate() != null ? request.getRecordedDate() : LocalDate.now();
        WeightLog log = new WeightLog(user, request.getWeightKg(), request.getBodyFatPercentage(), date);
        WeightLog saved = weightLogRepository.save(log);

        // Update current weight in user profile
        User u = userRepository.findById(user.getId()).orElse(user);
        u.setCurrentWeight(request.getWeightKg());
        userRepository.save(u);

        activityLogRepository.save(new ActivityLog(
                "Logged Weight Progress",
                user.getName() + " recorded new weight: " + request.getWeightKg() + " kg",
                user.getName(),
                "workout"
        ));

        return saved;
    }
}
