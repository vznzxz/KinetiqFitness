package com.kinetiq.controller;

import com.kinetiq.dto.DashboardStatsResponse;
import com.kinetiq.model.User;
import com.kinetiq.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardStatsResponse> getDashboard(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(dashboardService.getUserDashboard(user));
    }
}
