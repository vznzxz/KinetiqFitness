package com.kinetiq;

import com.kinetiq.dto.AdminStatsResponse;
import com.kinetiq.dto.ChallengeRequest;
import com.kinetiq.dto.UserRoleRequest;
import com.kinetiq.model.Challenge;
import com.kinetiq.model.User;
import com.kinetiq.repository.UserRepository;
import com.kinetiq.service.AdminService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("h2")
@Transactional
class AdminServiceTest {

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testAdminStatsAndUserRole() {
        AdminStatsResponse stats = adminService.getAdminStats();
        assertTrue(stats.getTotalUsers() >= 2);
        assertTrue(stats.getTotalWorkouts() >= 5);

        User marcus = userRepository.findByEmail("marcus@kinetiq.fit").orElseThrow();
        UserRoleRequest roleReq = new UserRoleRequest();
        roleReq.setRole("ROLE_ADMIN");
        roleReq.setStatus("ACTIVE");

        User updated = adminService.updateUserRoleAndStatus(marcus.getId(), roleReq);
        assertEquals("ROLE_ADMIN", updated.getRole());

        // Test create challenge
        ChallengeRequest chReq = new ChallengeRequest();
        chReq.setTitle("Test Iron Marathon");
        chReq.setCategory("Cardio");
        chReq.setTargetValue(42);
        chReq.setUnit("km");
        chReq.setTotalDays(14);
        chReq.setRewardBadge("Iron Medal");
        chReq.setRewardPoints(500);

        Challenge createdCh = adminService.createChallenge(chReq);
        assertNotNull(createdCh.getId());

        // Test update system settings
        Map<String, String> settings = adminService.updateSystemSettings(Map.of("maintenance_mode", "false"));
        assertEquals("false", settings.get("maintenance_mode"));
    }
}
