package com.kinetiq.dto;

public class AdminStatsResponse {
    private long totalUsers;
    private long totalWorkouts;
    private long totalCaloriesBurned;
    private long totalDurationMinutes;
    private long activeChallenges;
    private long pendingContentCount;

    public AdminStatsResponse() {}

    public AdminStatsResponse(long totalUsers, long totalWorkouts, long totalCaloriesBurned, long totalDurationMinutes, long activeChallenges, long pendingContentCount) {
        this.totalUsers = totalUsers;
        this.totalWorkouts = totalWorkouts;
        this.totalCaloriesBurned = totalCaloriesBurned;
        this.totalDurationMinutes = totalDurationMinutes;
        this.activeChallenges = activeChallenges;
        this.pendingContentCount = pendingContentCount;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalWorkouts() {
        return totalWorkouts;
    }

    public void setTotalWorkouts(long totalWorkouts) {
        this.totalWorkouts = totalWorkouts;
    }

    public long getTotalCaloriesBurned() {
        return totalCaloriesBurned;
    }

    public void setTotalCaloriesBurned(long totalCaloriesBurned) {
        this.totalCaloriesBurned = totalCaloriesBurned;
    }

    public long getTotalDurationMinutes() {
        return totalDurationMinutes;
    }

    public void setTotalDurationMinutes(long totalDurationMinutes) {
        this.totalDurationMinutes = totalDurationMinutes;
    }

    public long getActiveChallenges() {
        return activeChallenges;
    }

    public void setActiveChallenges(long activeChallenges) {
        this.activeChallenges = activeChallenges;
    }

    public long getPendingContentCount() {
        return pendingContentCount;
    }

    public void setPendingContentCount(long pendingContentCount) {
        this.pendingContentCount = pendingContentCount;
    }
}
