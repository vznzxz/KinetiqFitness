package com.kinetiq;

import com.kinetiq.dto.AuthRequest;
import com.kinetiq.dto.AuthResponse;
import com.kinetiq.dto.RegisterRequest;
import com.kinetiq.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("h2")
@Transactional
class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Test
    void testRegisterAndLogin() {
        RegisterRequest reg = new RegisterRequest();
        reg.setName("Test Athlete");
        reg.setEmail("testrunner@kinetiq.fit");
        reg.setPassword("secret123");
        reg.setFitnessLevel("Intermediate");
        reg.setCurrentWeight(72.5);
        reg.setTargetWeight(68.0);
        reg.setHeight(175.0);
        reg.setPrimaryGoal("Endurance");

        AuthResponse regResponse = authService.register(reg);
        assertNotNull(regResponse.getToken());
        assertEquals("testrunner@kinetiq.fit", regResponse.getUser().getEmail());

        // Login with valid credentials
        AuthResponse loginResponse = authService.login(new AuthRequest("testrunner@kinetiq.fit", "secret123"));
        assertNotNull(loginResponse.getToken());
        assertEquals("Test Athlete", loginResponse.getUser().getName());

        // Login with invalid credentials should fail
        assertThrows(BadCredentialsException.class, () -> {
            authService.login(new AuthRequest("testrunner@kinetiq.fit", "wrongpassword"));
        });
    }
}
