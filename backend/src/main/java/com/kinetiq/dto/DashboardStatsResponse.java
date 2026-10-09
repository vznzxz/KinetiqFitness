package com.kinetiq.dto;

import com.kinetiq.model.FitnessGoal;
import com.kinetiq.model.Workout;
import java.util.List;
import java.util.Map;

public class DashboardStatsResponse {
    private long totalWorkouts;
    private long totalDurationMinutes;
    private long totalCaloriesBurned;
    private int streakDays;
    private int points;
    private FitnessGoal goal;
    private List<Workout> recentWorkouts;
    private Map<String, Integer> workoutTypeBreakdown;
    private Map<String, Integer> weeklyCaloriesTrend;
    private List<Map<String, Object>> activeChallenges;

    public DashboardStatsResponse() {}

    public long getTotalWorkouts() {
        return totalWorkouts;
    }

    public void setTotalWorkouts(long totalWorkouts) {
        this.totalWorkouts = totalWorkouts;
    }

    public long getTotalDurationMinutes() {
        return totalDurationMinutes;
    }

    public void setTotalDurationMinutes(long totalDurationMinutes) {
        this.totalDurationMinutes = totalDurationMinutes;
    }

    public long getTotalCaloriesBurned() {
        return totalCaloriesBurned;
    }

    public void setTotalCaloriesBurned(long totalCaloriesBurned) {
        this.totalCaloriesBurned = totalCaloriesBurned;
    }

    public int getStreakDays() {
        return streakDays;
    }

    public void setStreakDays(int streakDays) {
        this.streakDays = streakDays;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public FitnessGoal getGoal() {
        return goal;
    }

    public void setGoal(FitnessGoal goal) {
        this.goal = goal;
    }

    public List<Workout> getRecentWorkouts() {
        return recentWorkouts;
    }

    public void setRecentWorkouts(List<Workout> recentWorkouts) {
        this.recentWorkouts = recentWorkouts;
    }

    public Map<String, Integer> getWorkoutTypeBreakdown() {
        return workoutTypeBreakdown;
    }

    public void setWorkoutTypeBreakdown(Map<String, Integer> workoutTypeBreakdown) {
        this.workoutTypeBreakdown = workoutTypeBreakdown;
    }

    public Map<String, Integer> getWeeklyCaloriesTrend() {
        return weeklyCaloriesTrend;
    }

    public void setWeeklyCaloriesTrend(Map<String, Integer> weeklyCaloriesTrend) {
        this.weeklyCaloriesTrend = weeklyCaloriesTrend;
    }

    public List<Map<String, Object>> getActiveChallenges() {
        return activeChallenges;
    }

    public void setActiveChallenges(List<Map<String, Object>> activeChallenges) {
        this.activeChallenges = activeChallenges;
    }
}
