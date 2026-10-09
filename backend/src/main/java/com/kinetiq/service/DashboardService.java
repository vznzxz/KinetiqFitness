package com.kinetiq.service;

import com.kinetiq.dto.DashboardStatsResponse;
import com.kinetiq.model.FitnessGoal;
import com.kinetiq.model.User;
import com.kinetiq.model.Workout;
import com.kinetiq.repository.FitnessGoalRepository;
import com.kinetiq.repository.UserRepository;
import com.kinetiq.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class DashboardService {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private FitnessGoalRepository goalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChallengeService challengeService;

    public DashboardStatsResponse getUserDashboard(User user) {
        User freshUser = userRepository.findById(user.getId()).orElse(user);

        long totalWorkouts = workoutRepository.countByUserId(freshUser.getId());
        Long totalCalories = workoutRepository.sumCaloriesBurnedByUserId(freshUser.getId());
        Long totalMinutes = workoutRepository.sumDurationMinutesByUserId(freshUser.getId());

        List<Workout> allWorkouts = workoutRepository.findByUserIdOrderByWorkoutDateDesc(freshUser.getId());
        List<Workout> recentWorkouts = allWorkouts.stream().limit(5).toList();

        // Breakdown by workout type
        Map<String, Integer> typeBreakdown = new LinkedHashMap<>();
        for (Workout w : allWorkouts) {
            typeBreakdown.put(w.getType(), typeBreakdown.getOrDefault(w.getType(), 0) + 1);
        }

        // 7-day calories trend
        Map<String, Integer> weeklyCaloriesTrend = new LinkedHashMap<>();
        LocalDate today = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("EEE");
        for (int i = 6; i >= 0; i--) {
            LocalDate d = today.minusDays(i);
            String dayKey = d.format(fmt);
            weeklyCaloriesTrend.put(dayKey, 0);
        }

        for (Workout w : allWorkouts) {
            if (!w.getWorkoutDate().isBefore(today.minusDays(6)) && !w.getWorkoutDate().isAfter(today)) {
                String dayKey = w.getWorkoutDate().format(fmt);
                weeklyCaloriesTrend.put(dayKey, weeklyCaloriesTrend.getOrDefault(dayKey, 0) + w.getCaloriesBurned());
            }
        }

        FitnessGoal goal = goalRepository.findByUserId(freshUser.getId())
                .orElseGet(() -> new FitnessGoal(freshUser, 4, 2500, freshUser.getCurrentWeight(), freshUser.getTargetWeight()));

        List<Map<String, Object>> userChallenges = challengeService.getChallengesForUser(freshUser);
        List<Map<String, Object>> activeChallenges = userChallenges.stream()
                .filter(c -> "JOINED".equalsIgnoreCase((String) c.get("userStatus")))
                .limit(4)
                .toList();

        DashboardStatsResponse response = new DashboardStatsResponse();
        response.setTotalWorkouts(totalWorkouts);
        response.setTotalCaloriesBurned(totalCalories != null ? totalCalories : 0L);
        response.setTotalDurationMinutes(totalMinutes != null ? totalMinutes : 0L);
        response.setStreakDays(freshUser.getStreakDays());
        response.setPoints(freshUser.getPoints());
        response.setGoal(goal);
        response.setRecentWorkouts(recentWorkouts);
        response.setWorkoutTypeBreakdown(typeBreakdown);
        response.setWeeklyCaloriesTrend(weeklyCaloriesTrend);
        response.setActiveChallenges(activeChallenges);

        return response;
    }
}
