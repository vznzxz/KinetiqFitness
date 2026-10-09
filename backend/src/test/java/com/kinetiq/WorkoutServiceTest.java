package com.kinetiq;

import com.kinetiq.dto.WorkoutRequest;
import com.kinetiq.model.User;
import com.kinetiq.model.Workout;
import com.kinetiq.repository.UserRepository;
import com.kinetiq.service.WorkoutService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("h2")
@Transactional
class WorkoutServiceTest {

    @Autowired
    private WorkoutService workoutService;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testCreateGetUpdateDeleteWorkout() {
        User alex = userRepository.findByEmail("alex@kinetiq.fit").orElseThrow();

        // 1. Create Workout
        WorkoutRequest req = new WorkoutRequest();
        req.setType("Running");
        req.setTitle("Interval 5K");
        req.setDurationMinutes(30);
        req.setIntensity("High");
        req.setWorkoutDate(LocalDate.now());
        req.setNotes("High pace interval laps");

        Workout created = workoutService.createWorkout(alex, req);
        assertNotNull(created.getId());
        assertEquals("Interval 5K", created.getTitle());
        assertTrue(created.getCaloriesBurned() > 0);

        // 2. Fetch list
        List<Workout> workouts = workoutService.getWorkouts(alex, null, null);
        assertTrue(workouts.stream().anyMatch(w -> w.getId().equals(created.getId())));

        // 3. Update Workout
        WorkoutRequest updateReq = new WorkoutRequest();
        updateReq.setTitle("Interval 5K Updated");
        updateReq.setDurationMinutes(35);
        Workout updated = workoutService.updateWorkout(alex, created.getId(), updateReq);
        assertEquals("Interval 5K Updated", updated.getTitle());
        assertEquals(35, updated.getDurationMinutes());

        // 4. Delete Workout
        workoutService.deleteWorkout(alex, created.getId());
        List<Workout> afterDelete = workoutService.getWorkouts(alex, null, null);
        assertFalse(afterDelete.stream().anyMatch(w -> w.getId().equals(created.getId())));
    }
}
