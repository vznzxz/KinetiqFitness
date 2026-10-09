package com.kinetiq.controller;

import com.kinetiq.dto.WorkoutRequest;
import com.kinetiq.model.User;
import com.kinetiq.model.Workout;
import com.kinetiq.service.WorkoutService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    @Autowired
    private WorkoutService workoutService;

    @GetMapping
    public ResponseEntity<List<Workout>> getWorkouts(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(workoutService.getWorkouts(user, startDate, endDate));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Workout> getWorkoutById(@AuthenticationPrincipal User user, @PathVariable Long id) {
        return ResponseEntity.ok(workoutService.getWorkoutById(user, id));
    }

    @PostMapping
    public ResponseEntity<Workout> createWorkout(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody WorkoutRequest request) {
        Workout workout = workoutService.createWorkout(user, request);
        return new ResponseEntity<>(workout, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Workout> updateWorkout(
            @AuthenticationPrincipal User user,
            @PathVariable Long id,
            @RequestBody WorkoutRequest request) {
        Workout updated = workoutService.updateWorkout(user, id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkout(@AuthenticationPrincipal User user, @PathVariable Long id) {
        workoutService.deleteWorkout(user, id);
        return ResponseEntity.noContent().build();
    }
}
