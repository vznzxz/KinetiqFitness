package com.kinetiq.controller;

import com.kinetiq.dto.GoalRequest;
import com.kinetiq.dto.WeightLogRequest;
import com.kinetiq.model.FitnessGoal;
import com.kinetiq.model.User;
import com.kinetiq.model.WeightLog;
import com.kinetiq.service.GoalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @GetMapping
    public ResponseEntity<FitnessGoal> getGoal(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(goalService.getGoal(user));
    }

    @PutMapping
    public ResponseEntity<FitnessGoal> updateGoal(
            @AuthenticationPrincipal User user,
            @RequestBody GoalRequest request) {
        return ResponseEntity.ok(goalService.updateGoal(user, request));
    }

    @GetMapping("/weight-history")
    public ResponseEntity<List<WeightLog>> getWeightHistory(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(goalService.getWeightHistory(user));
    }

    @PostMapping("/weight-history")
    public ResponseEntity<WeightLog> logWeight(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody WeightLogRequest request) {
        WeightLog saved = goalService.logWeight(user, request);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
}
