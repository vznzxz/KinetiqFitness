package com.kinetiq.service;

import com.kinetiq.config.JwtTokenProvider;
import com.kinetiq.dto.AuthRequest;
import com.kinetiq.dto.AuthResponse;
import com.kinetiq.dto.RegisterRequest;
import com.kinetiq.exception.BadRequestException;
import com.kinetiq.model.ActivityLog;
import com.kinetiq.model.FitnessGoal;
import com.kinetiq.model.User;
import com.kinetiq.repository.ActivityLogRepository;
import com.kinetiq.repository.FitnessGoalRepository;
import com.kinetiq.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FitnessGoalRepository goalRepository;

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered: " + request.getEmail());
        }

        User user = new User();
        user.setEmail(request.getEmail().toLowerCase().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName().trim());
        user.setRole("ROLE_USER");
        user.setFitnessLevel(request.getFitnessLevel());
        user.setCurrentWeight(request.getCurrentWeight());
        user.setTargetWeight(request.getTargetWeight());
        user.setHeight(request.getHeight());
        user.setPrimaryGoal(request.getPrimaryGoal());
        user.setBio(request.getBio());
        user.setStatus("ACTIVE");
        user.setStreakDays(1);
        user.setPoints(100);

        User savedUser = userRepository.save(user);

        // Create initial default goal
        FitnessGoal goal = new FitnessGoal(
                savedUser,
                4,
                2500,
                request.getCurrentWeight(),
                request.getTargetWeight()
        );
        goalRepository.save(goal);

        // Log activity
        activityLogRepository.save(new ActivityLog(
                "User Registered",
                "New athlete " + savedUser.getName() + " joined Kinetiq",
                savedUser.getName(),
                "user"
        ));

        String token = jwtTokenProvider.generateToken(savedUser.getEmail(), savedUser.getRole(), savedUser.getId());
        return new AuthResponse(token, savedUser);
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        if (!"ACTIVE".equalsIgnoreCase(user.getStatus())) {
            throw new BadRequestException("Account has been suspended. Please contact administrator.");
        }

        // Log login activity
        activityLogRepository.save(new ActivityLog(
                "User Logged In",
                user.getName() + " authenticated successfully",
                user.getName(),
                "user"
        ));

        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole(), user.getId());
        return new AuthResponse(token, user);
    }

    public User getProfile(User currentUser) {
        return userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new BadRequestException("User not found"));
    }

    @Transactional
    public User updateProfile(User currentUser, com.kinetiq.dto.UserProfileRequest request) {
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new BadRequestException("User not found"));

        if (request.getName() != null && !request.getName().isBlank()) {
            user.setName(request.getName());
        }
        if (request.getFitnessLevel() != null) {
            user.setFitnessLevel(request.getFitnessLevel());
        }
        if (request.getCurrentWeight() != null) {
            user.setCurrentWeight(request.getCurrentWeight());
        }
        if (request.getTargetWeight() != null) {
            user.setTargetWeight(request.getTargetWeight());
        }
        if (request.getHeight() != null) {
            user.setHeight(request.getHeight());
        }
        if (request.getPrimaryGoal() != null) {
            user.setPrimaryGoal(request.getPrimaryGoal());
        }
        if (request.getBio() != null) {
            user.setBio(request.getBio());
        }
        if (request.getAvatar() != null) {
            user.setAvatar(request.getAvatar());
        }

        activityLogRepository.save(new ActivityLog(
                "Profile Updated",
                user.getName() + " updated biometric stats and goals",
                user.getName(),
                "user"
        ));

        return userRepository.save(user);
    }
}
