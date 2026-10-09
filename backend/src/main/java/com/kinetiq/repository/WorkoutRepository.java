package com.kinetiq.repository;

import com.kinetiq.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    List<Workout> findByUserIdOrderByWorkoutDateDesc(Long userId);

    List<Workout> findByUserIdAndWorkoutDateBetweenOrderByWorkoutDateDesc(Long userId, LocalDate startDate, LocalDate endDate);

    long countByUserId(Long userId);

    @Query("SELECT COALESCE(SUM(w.caloriesBurned), 0) FROM Workout w WHERE w.user.id = :userId")
    Long sumCaloriesBurnedByUserId(@Param("userId") Long userId);

    @Query("SELECT COALESCE(SUM(w.durationMinutes), 0) FROM Workout w WHERE w.user.id = :userId")
    Long sumDurationMinutesByUserId(@Param("userId") Long userId);

    @Query("SELECT COALESCE(SUM(w.caloriesBurned), 0) FROM Workout w")
    Long sumTotalCaloriesBurnedAllUsers();

    @Query("SELECT COALESCE(SUM(w.durationMinutes), 0) FROM Workout w")
    Long sumTotalDurationMinutesAllUsers();
}
