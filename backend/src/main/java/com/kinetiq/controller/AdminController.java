package com.kinetiq.controller;

import com.kinetiq.dto.AdminStatsResponse;
import com.kinetiq.dto.ChallengeRequest;
import com.kinetiq.dto.ContentStatusRequest;
import com.kinetiq.dto.UserRoleRequest;
import com.kinetiq.model.ActivityLog;
import com.kinetiq.model.Challenge;
import com.kinetiq.model.FitnessContent;
import com.kinetiq.model.User;
import com.kinetiq.service.AdminService;
import com.kinetiq.service.FitnessContentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private FitnessContentService contentService;

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getAdminStats() {
        return ResponseEntity.ok(adminService.getAdminStats());
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<User> updateUserRoleAndStatus(
            @PathVariable Long id,
            @RequestBody UserRoleRequest request) {
        return ResponseEntity.ok(adminService.updateUserRoleAndStatus(id, request));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/content")
    public ResponseEntity<List<FitnessContent>> getAllContent() {
        return ResponseEntity.ok(contentService.getAllContent());
    }

    @PutMapping("/content/{id}/status")
    public ResponseEntity<FitnessContent> updateContentStatus(
            @PathVariable Long id,
            @RequestBody ContentStatusRequest request) {
        return ResponseEntity.ok(contentService.updateStatus(id, request.getStatus()));
    }

    @PostMapping("/challenges")
    public ResponseEntity<Challenge> createChallenge(@Valid @RequestBody ChallengeRequest request) {
        Challenge challenge = adminService.createChallenge(request);
        return new ResponseEntity<>(challenge, HttpStatus.CREATED);
    }

    @DeleteMapping("/challenges/{id}")
    public ResponseEntity<Void> deleteChallenge(@PathVariable Long id) {
        adminService.deleteChallenge(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/settings")
    public ResponseEntity<Map<String, String>> getSystemSettings() {
        return ResponseEntity.ok(adminService.getSystemSettings());
    }

    @PutMapping("/settings")
    public ResponseEntity<Map<String, String>> updateSystemSettings(@RequestBody Map<String, String> settings) {
        return ResponseEntity.ok(adminService.updateSystemSettings(settings));
    }

    @GetMapping("/activity-logs")
    public ResponseEntity<List<ActivityLog>> getActivityLogs() {
        return ResponseEntity.ok(adminService.getRecentActivity());
    }
}
