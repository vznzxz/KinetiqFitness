package com.kinetiq.config;

import com.kinetiq.model.*;
import com.kinetiq.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private FitnessGoalRepository goalRepository;

    @Autowired
    private WeightLogRepository weightLogRepository;

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private ChallengeParticipationRepository participationRepository;

    @Autowired
    private FitnessContentRepository contentRepository;

    @Autowired
    private SystemSettingRepository systemSettingRepository;

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return; // Data already seeded
        }

        System.out.println(">>> Seeding KINETIQ Initial Demonstration Data...");

        // 1. Create Admin
        User admin = new User();
        admin.setEmail("admin@kinetiq.fit");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setName("System Admin");
        admin.setRole("ROLE_ADMIN");
        admin.setFitnessLevel("Advanced");
        admin.setCurrentWeight(76.0);
        admin.setTargetWeight(74.0);
        admin.setHeight(180.0);
        admin.setPrimaryGoal("Athletic Performance");
        admin.setBio("Kinetiq Platform Lead & Fitness Conditioning Specialist.");
        admin.setStreakDays(28);
        admin.setPoints(2800);
        admin.setStatus("ACTIVE");
        admin = userRepository.save(admin);

        // 2. Create Demo User (Alex Mercer)
        User alex = new User();
        alex.setEmail("alex@kinetiq.fit");
        alex.setPassword(passwordEncoder.encode("user123"));
        alex.setName("Alex Mercer");
        alex.setRole("ROLE_USER");
        alex.setFitnessLevel("Advanced");
        alex.setCurrentWeight(78.5);
        alex.setTargetWeight(75.0);
        alex.setHeight(182.0);
        alex.setPrimaryGoal("Muscle Gain & Conditioning");
        alex.setBio("Triathlete and hybrid strength enthusiast aiming for sub-3h marathon and 200kg deadlift.");
        alex.setStreakDays(14);
        alex.setPoints(1450);
        alex.setStatus("ACTIVE");
        alex = userRepository.save(alex);

        // 3. Additional Users for management
        User sarah = new User();
        sarah.setEmail("sarah@kinetiq.fit");
        sarah.setPassword(passwordEncoder.encode("user123"));
        sarah.setName("Sarah Jenkins");
        sarah.setRole("ROLE_USER");
        sarah.setFitnessLevel("Intermediate");
        sarah.setCurrentWeight(62.0);
        sarah.setTargetWeight(60.0);
        sarah.setHeight(168.0);
        sarah.setPrimaryGoal("Marathon Training");
        sarah.setBio("Boston marathon qualifier candidate.");
        sarah.setStreakDays(9);
        sarah.setPoints(950);
        sarah.setStatus("ACTIVE");
        userRepository.save(sarah);

        User marcus = new User();
        marcus.setEmail("marcus@kinetiq.fit");
        marcus.setPassword(passwordEncoder.encode("user123"));
        marcus.setName("Marcus Vance");
        marcus.setRole("ROLE_USER");
        marcus.setFitnessLevel("Beginner");
        marcus.setCurrentWeight(88.0);
        marcus.setTargetWeight(80.0);
        marcus.setHeight(175.0);
        marcus.setPrimaryGoal("Fat Loss");
        marcus.setBio("Starting my fitness journey with KINETIQ.");
        marcus.setStreakDays(4);
        marcus.setPoints(400);
        marcus.setStatus("ACTIVE");
        userRepository.save(marcus);

        // 4. Fitness Goals for Alex
        FitnessGoal alexGoal = new FitnessGoal(alex, 5, 3200, 82.0, 75.0);
        alexGoal.setDeadline(LocalDate.now().plusMonths(2));
        goalRepository.save(alexGoal);

        // 5. Weight Logs for Alex (Trend over past 6 weeks)
        LocalDate today = LocalDate.now();
        weightLogRepository.save(new WeightLog(alex, 82.0, 18.5, today.minusWeeks(6)));
        weightLogRepository.save(new WeightLog(alex, 81.2, 17.8, today.minusWeeks(5)));
        weightLogRepository.save(new WeightLog(alex, 80.5, 17.2, today.minusWeeks(4)));
        weightLogRepository.save(new WeightLog(alex, 79.8, 16.5, today.minusWeeks(3)));
        weightLogRepository.save(new WeightLog(alex, 79.1, 16.0, today.minusWeeks(2)));
        weightLogRepository.save(new WeightLog(alex, 78.5, 15.4, today.minusDays(1)));

        // 6. Workouts for Alex
        Workout w1 = new Workout();
        w1.setUser(alex);
        w1.setType("Running");
        w1.setTitle("Morning 10K Tempo Run");
        w1.setDurationMinutes(52);
        w1.setIntensity("High");
        w1.setCaloriesBurned(580);
        w1.setWorkoutDate(today.minusDays(1));
        w1.setNotes("Maintained 5:12/km pace throughout. Solid heart rate stability.");
        workoutRepository.save(w1);

        Workout w2 = new Workout();
        w2.setUser(alex);
        w2.setType("Weightlifting");
        w2.setTitle("Upper Body Hypertrophy & Pull");
        w2.setDurationMinutes(65);
        w2.setIntensity("Extreme");
        w2.setCaloriesBurned(520);
        w2.setWorkoutDate(today.minusDays(2));
        w2.setNotes("Barbell Deadlifts: 5x5 @ 160kg, Weighted Pull-ups: 4x8, Barbell Rows: 4x10.");
        workoutRepository.save(w2);

        Workout w3 = new Workout();
        w3.setUser(alex);
        w3.setType("HIIT");
        w3.setTitle("High-Octane Tabata Conditioning");
        w3.setDurationMinutes(35);
        w3.setIntensity("High");
        w3.setCaloriesBurned(410);
        w3.setWorkoutDate(today.minusDays(3));
        w3.setNotes("Kettlebell snatches, burpee box jumps, assault bike sprints.");
        workoutRepository.save(w3);

        Workout w4 = new Workout();
        w4.setUser(alex);
        w4.setType("Cycling");
        w4.setTitle("Zone 3 Aerobic Threshold Ride");
        w4.setDurationMinutes(60);
        w4.setIntensity("Medium");
        w4.setCaloriesBurned(630);
        w4.setWorkoutDate(today.minusDays(4));
        w4.setNotes("Outdoor hilly loop. Kept cadence above 90 RPM.");
        workoutRepository.save(w4);

        Workout w5 = new Workout();
        w5.setUser(alex);
        w5.setType("Yoga");
        w5.setTitle("Deep Hip Mobility & Vinyasa Flow");
        w5.setDurationMinutes(45);
        w5.setIntensity("Low");
        w5.setCaloriesBurned(180);
        w5.setWorkoutDate(today.minusDays(5));
        w5.setNotes("Focused on posterior chain decompression and hip flexors.");
        workoutRepository.save(w5);

        Workout w6 = new Workout();
        w6.setUser(alex);
        w6.setType("Boxing");
        w6.setTitle("Heavy Bag Combinations & Speedwork");
        w6.setDurationMinutes(40);
        w6.setIntensity("Extreme");
        w6.setCaloriesBurned(490);
        w6.setWorkoutDate(today.minusDays(6));
        w6.setNotes("8 rounds of 3 min with 60s active rest.");
        workoutRepository.save(w6);

        // 7. Challenges
        Challenge ch1 = new Challenge();
        ch1.setTitle("30-Day Shred & Discipline");
        ch1.setDescription("Log at least 45 minutes of training every day for 30 consecutive days.");
        ch1.setCategory("Consistency");
        ch1.setTargetValue(30);
        ch1.setUnit("days");
        ch1.setTotalDays(30);
        ch1.setRewardBadge("Iron Discipline");
        ch1.setRewardPoints(600);
        ch1.setIcon("flame");
        ch1.setStartDate(today.minusDays(18));
        ch1.setEndDate(today.plusDays(12));
        ch1 = challengeRepository.save(ch1);

        Challenge ch2 = new Challenge();
        ch2.setTitle("Centurion 100K Endurance");
        ch2.setDescription("Accumulate 100 kilometers of running, cycling, or rowing this month.");
        ch2.setCategory("Cardio");
        ch2.setTargetValue(100);
        ch2.setUnit("km");
        ch2.setTotalDays(28);
        ch2.setRewardBadge("Centurion Runner");
        ch2.setRewardPoints(750);
        ch2.setIcon("zap");
        ch2.setStartDate(today.minusDays(14));
        ch2.setEndDate(today.plusDays(14));
        ch2 = challengeRepository.save(ch2);

        Challenge ch3 = new Challenge();
        ch3.setTitle("5,000 Push-Up Titan");
        ch3.setDescription("Conquer 5,000 chest and tricep push-ups across 21 structured days.");
        ch3.setCategory("Strength");
        ch3.setTargetValue(5000);
        ch3.setUnit("reps");
        ch3.setTotalDays(21);
        ch3.setRewardBadge("Titan Armor");
        ch3.setRewardPoints(500);
        ch3.setIcon("shield");
        ch3.setStartDate(today.minusDays(7));
        ch3.setEndDate(today.plusDays(14));
        challengeRepository.save(ch3);

        Challenge ch4 = new Challenge();
        ch4.setTitle("Daily Hydration & Core Mastery");
        ch4.setDescription("Hydrate with 3.5L water and complete 10 mins of core stabilization daily.");
        ch4.setCategory("Endurance");
        ch4.setTargetValue(14);
        ch4.setUnit("days");
        ch4.setTotalDays(14);
        ch4.setRewardBadge("Hydra Master");
        ch4.setRewardPoints(350);
        ch4.setIcon("heart");
        ch4.setStartDate(today.minusDays(20));
        ch4.setEndDate(today.minusDays(6));
        ch4 = challengeRepository.save(ch4);

        // 8. Challenge Participations for Alex
        ChallengeParticipation p1 = new ChallengeParticipation(alex, ch1);
        p1.setCurrentProgress(18);
        p1.setStatus("JOINED");
        participationRepository.save(p1);

        ChallengeParticipation p2 = new ChallengeParticipation(alex, ch2);
        p2.setCurrentProgress(68);
        p2.setStatus("JOINED");
        participationRepository.save(p2);

        ChallengeParticipation p4 = new ChallengeParticipation(alex, ch4);
        p4.setCurrentProgress(14);
        p4.setStatus("COMPLETED");
        p4.setCompletedDate(today.minusDays(6));
        participationRepository.save(p4);

        // 9. Fitness Guides / Content
        FitnessContent c1 = new FitnessContent();
        c1.setAuthor(admin);
        c1.setTitle("Zone 2 Aerobic Base: The Foundational Engine of All Elite Athletics");
        c1.setCategory("Endurance");
        c1.setContent("Zone 2 training (65-75% max HR) triggers mitochondrial biogenesis and elevates lactate clearance capacity. By dedicating 70-80% of weekly cardio volume to conversational-pace aerobic conditioning, athletes unlock sustained fat oxidation without overtaxing the central nervous system.");
        c1.setReadTime("6 min");
        c1.setStatus("APPROVED");
        c1.setTags("Zone 2, Cardio, Mitochondria, Recovery");
        c1.setLikes(42);
        contentRepository.save(c1);

        FitnessContent c2 = new FitnessContent();
        c2.setAuthor(admin);
        c2.setTitle("Optimal Protein Distribution: Leucine Triggers & Muscle Synthesis");
        c2.setCategory("Nutrition");
        c2.setContent("Consuming 1.6 to 2.2g of high-quality protein per kilogram of body weight distributed across 4 to 5 meals optimizes muscle protein synthesis (MPS). Each feeding should contain roughly 2.5 to 3g of leucine to trigger the mTOR pathway effectively.");
        c2.setReadTime("5 min");
        c2.setStatus("APPROVED");
        c2.setTags("Nutrition, Protein, Hypertrophy, Science");
        c2.setLikes(38);
        contentRepository.save(c2);

        FitnessContent c3 = new FitnessContent();
        c3.setAuthor(alex);
        c3.setTitle("How Periodizing Deload Weeks Prevented Overtraining Injury");
        c3.setCategory("Strength");
        c3.setContent("Every 5th or 6th training week, dropping total volume by 40-50% while maintaining intensity enables connective tissue repair, resets cortisol levels, and prepares neuromuscular pathways for new personal records.");
        c3.setReadTime("4 min");
        c3.setStatus("APPROVED");
        c3.setTags("Deload, Injury Prevention, Recovery");
        c3.setLikes(19);
        contentRepository.save(c3);

        FitnessContent c4 = new FitnessContent();
        c4.setAuthor(sarah);
        c4.setTitle("Carbohydrate Cycling Strategies for Marathon Race Prep");
        c4.setCategory("Nutrition");
        c4.setContent("Structuring carbohydrate intake according to daily glycogen depletion allows runners to maximize glycogen storage while sustaining efficient fat burning during low-intensity long runs.");
        c4.setReadTime("7 min");
        c4.setStatus("PENDING"); // Pending admin approval
        c4.setTags("Marathon, Carb Cycling, Race Fuel");
        c4.setLikes(5);
        contentRepository.save(c4);

        // 10. System Settings
        systemSettingRepository.save(new SystemSetting("app_name", "KINETIQ Precision Fitness", "Platform display name"));
        systemSettingRepository.save(new SystemSetting("maintenance_mode", "false", "Global maintenance toggle"));
        systemSettingRepository.save(new SystemSetting("daily_tip", "Consistency beats intensity. Master your daily routine.", "Daily banner motivational tip"));
        systemSettingRepository.save(new SystemSetting("registration_allowed", "true", "Whether new user signups are enabled"));
        systemSettingRepository.save(new SystemSetting("default_calorie_target", "2500", "Default weekly workout calorie target for new athletes"));

        // 11. Initial Platform Activity Logs
        activityLogRepository.save(new ActivityLog("System Initialized", "Kinetiq platform services started with full database schema", "System", "system"));
        activityLogRepository.save(new ActivityLog("Admin Created", "Initial administrator profile registered", "System Admin", "user"));
        activityLogRepository.save(new ActivityLog("Workout Logged", "Alex Mercer logged Morning 10K Tempo Run", "Alex Mercer", "workout"));
        activityLogRepository.save(new ActivityLog("Challenge Enrolled", "Alex Mercer enrolled in Centurion 100K Endurance", "Alex Mercer", "challenge"));

        System.out.println(">>> Initial Demonstration Data Seeded Successfully!");
    }
}
