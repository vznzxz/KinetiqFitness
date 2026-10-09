package com.kinetiq.service;

import com.kinetiq.dto.WorkoutRequest;
import com.kinetiq.exception.BadRequestException;
import com.kinetiq.exception.ResourceNotFoundException;
import com.kinetiq.model.ActivityLog;
import com.kinetiq.model.User;
import com.kinetiq.model.Workout;
import com.kinetiq.repository.ActivityLogRepository;
import com.kinetiq.repository.UserRepository;
import com.kinetiq.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityLogRepository activityLogRepository;

    public List<Workout> getWorkouts(User user, LocalDate startDate, LocalDate endDate) {
        if (startDate != null && endDate != null) {
            return workoutRepository.findByUserIdAndWorkoutDateBetweenOrderByWorkoutDateDesc(user.getId(), startDate, endDate);
        }
        return workoutRepository.findByUserIdOrderByWorkoutDateDesc(user.getId());
    }

    public Workout getWorkoutById(User user, Long id) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Workout not found with id: " + id));

        // Check ownership or admin
        if (!workout.getUser().getId().equals(user.getId()) && !"ROLE_ADMIN".equals(user.getRole())) {
            throw new BadRequestException("Access denied: You can only view your own workouts");
        }
        return workout;
    }

    @Transactional
    public Workout createWorkout(User user, WorkoutRequest request) {
        Workout workout = new Workout();
        workout.setUser(user);
        workout.setType(request.getType());
        workout.setTitle(request.getTitle() != null && !request.getTitle().isBlank() 
                ? request.getTitle() 
                : request.getType() + " Session");
        workout.setDurationMinutes(request.getDurationMinutes());
        workout.setIntensity(request.getIntensity() != null ? request.getIntensity() : "Medium");
        
        // Calculate calories if not provided
        int calories = request.getCaloriesBurned() != null && request.getCaloriesBurned() > 0
                ? request.getCaloriesBurned()
                : calculateEstimatedCalories(request.getType(), request.getDurationMinutes(), workout.getIntensity());
        workout.setCaloriesBurned(calories);
        
        workout.setWorkoutDate(request.getWorkoutDate() != null ? request.getWorkoutDate() : LocalDate.now());
        workout.setNotes(request.getNotes());
        workout.setExercisesJson(request.getExercisesJson());

        Workout saved = workoutRepository.save(workout);

        // Update user streak and points
        User freshUser = userRepository.findById(user.getId()).orElse(user);
        freshUser.setStreakDays(freshUser.getStreakDays() + 1);
        freshUser.setPoints(freshUser.getPoints() + 50);
        userRepository.save(freshUser);

        // Log platform activity
        activityLogRepository.save(new ActivityLog(
                "Logged Workout",
                saved.getTitle() + " (" + saved.getDurationMinutes() + " mins, " + saved.getCaloriesBurned() + " kcal)",
                user.getName(),
                "workout"
        ));

        return saved;
    }

    @Transactional
    public Workout updateWorkout(User user, Long id, WorkoutRequest request) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Workout not found with id: " + id));

        if (!workout.getUser().getId().equals(user.getId()) && !"ROLE_ADMIN".equals(user.getRole())) {
            throw new BadRequestException("Access denied: You can only edit your own workouts");
        }

        if (request.getType() != null) workout.setType(request.getType());
        if (request.getTitle() != null) workout.setTitle(request.getTitle());
        if (request.getDurationMinutes() != null) workout.setDurationMinutes(request.getDurationMinutes());
        if (request.getIntensity() != null) workout.setIntensity(request.getIntensity());
        if (request.getCaloriesBurned() != null && request.getCaloriesBurned() > 0) {
            workout.setCaloriesBurned(request.getCaloriesBurned());
        } else if (request.getDurationMinutes() != null) {
            workout.setCaloriesBurned(calculateEstimatedCalories(workout.getType(), workout.getDurationMinutes(), workout.getIntensity()));
        }
        if (request.getWorkoutDate() != null) workout.setWorkoutDate(request.getWorkoutDate());
        if (request.getNotes() != null) workout.setNotes(request.getNotes());
        if (request.getExercisesJson() != null) workout.setExercisesJson(request.getExercisesJson());

        return workoutRepository.save(workout);
    }

    @Transactional
    public void deleteWorkout(User user, Long id) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Workout not found with id: " + id));

        if (!workout.getUser().getId().equals(user.getId()) && !"ROLE_ADMIN".equals(user.getRole())) {
            throw new BadRequestException("Access denied: You can only delete your own workouts");
        }

        workoutRepository.delete(workout);

        activityLogRepository.save(new ActivityLog(
                "Deleted Workout",
                "Workout entry #" + id + " was deleted",
                user.getName(),
                "workout"
        ));
    }

    private int calculateEstimatedCalories(String type, int durationMins, String intensity) {
        double multiplier = switch (intensity.toLowerCase()) {
            case "extreme" -> 12.0;
            case "high" -> 9.5;
            case "medium" -> 7.0;
            default -> 4.5;
        };

        double typeFactor = switch (type.toLowerCase()) {
            case "running" -> 1.2;
            case "hiit" -> 1.3;
            case "cycling" -> 1.1;
            case "swimming" -> 1.15;
            case "boxing" -> 1.25;
            case "yoga" -> 0.7;
            default -> 1.0;
        };

        return (int) Math.round(durationMins * multiplier * typeFactor);
    }
}
