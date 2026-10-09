package com.kinetiq.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "fitness_goals")
public class FitnessGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonIgnore
    private User user;

    private Integer weeklyWorkoutsTarget = 4;

    private Integer weeklyCaloriesTarget = 2500;

    private Double startingWeightKg = 75.0;

    private Double targetWeightKg = 70.0;

    private LocalDate deadline;

    private LocalDateTime updatedAt = LocalDateTime.now();

    public FitnessGoal() {}

    public FitnessGoal(User user, Integer weeklyWorkoutsTarget, Integer weeklyCaloriesTarget, Double startingWeightKg, Double targetWeightKg) {
        this.user = user;
        this.weeklyWorkoutsTarget = weeklyWorkoutsTarget;
        this.weeklyCaloriesTarget = weeklyCaloriesTarget;
        this.startingWeightKg = startingWeightKg;
        this.targetWeightKg = targetWeightKg;
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getWeeklyWorkoutsTarget() {
        return weeklyWorkoutsTarget != null ? weeklyWorkoutsTarget : 4;
    }

    public void setWeeklyWorkoutsTarget(Integer weeklyWorkoutsTarget) {
        this.weeklyWorkoutsTarget = weeklyWorkoutsTarget;
    }

    public Integer getWeeklyCaloriesTarget() {
        return weeklyCaloriesTarget != null ? weeklyCaloriesTarget : 2500;
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

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
