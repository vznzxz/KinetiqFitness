package com.kinetiq.dto;

import java.time.LocalDate;

public class GoalRequest {
    private Integer weeklyWorkoutsTarget;
    private Integer weeklyCaloriesTarget;
    private Double startingWeightKg;
    private Double targetWeightKg;
    private LocalDate deadline;

    public GoalRequest() {}

    public Integer getWeeklyWorkoutsTarget() {
        return weeklyWorkoutsTarget;
    }

    public void setWeeklyWorkoutsTarget(Integer weeklyWorkoutsTarget) {
        this.weeklyWorkoutsTarget = weeklyWorkoutsTarget;
    }

    public Integer getWeeklyCaloriesTarget() {
        return weeklyCaloriesTarget;
    }

    public void setWeeklyCaloriesTarget(Integer weeklyCaloriesTarget) {
        this.weeklyCaloriesTarget = weeklyCaloriesTarget;
    }

    public Double getStartingWeightKg() {
        return startingWeightKg;
    }

    public void setStartingWeightKg(Double startingWeightKg) {
        this.startingWeightKg = startingWeightKg;
    }

    public Double getTargetWeightKg() {
        return targetWeightKg;
    }

    public void setTargetWeightKg(Double targetWeightKg) {
        this.targetWeightKg = targetWeightKg;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }
}
