// Initial realistic mock data for Kinetiq fitness tracking application

export const INITIAL_USERS = [
  {
    id: "usr-1",
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    status: "Active",
    joinedDate: "2024-01-15",
    fitnessGoal: "Weight Loss & Endurance",
    activityLevel: "Very Active",
    height: 168, // cm
    weight: 62.5, // kg
    targetWeight: 59.0,
    dailyCalorieTarget: 2100,
    streakDays: 14,
    points: 1250,
  },
  {
    id: "usr-2",
    name: "Dave Miller",
    email: "admin.dave@kinetiq.io",
    role: "Admin",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    status: "Active",
    joinedDate: "2023-11-01",
    fitnessGoal: "Muscle Hypertrophy",
    activityLevel: "Moderate",
    height: 182,
    weight: 81.0,
    targetWeight: 82.0,
    dailyCalorieTarget: 2600,
    streakDays: 8,
    points: 2100,
  },
  {
    id: "usr-3",
    name: "Marcus Vance",
    email: "marcus.vance@fitmail.com",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    status: "Active",
    joinedDate: "2024-02-10",
    fitnessGoal: "Strength & Powerlifting",
    activityLevel: "Extremely Active",
    height: 178,
    weight: 88.0,
    targetWeight: 85.0,
    dailyCalorieTarget: 3000,
    streakDays: 22,
    points: 1890,
  },
  {
    id: "usr-4",
    name: "Elena Rostova",
    email: "elena.r@lifestyle.org",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    status: "Active",
    joinedDate: "2024-03-05",
    fitnessGoal: "Flexibility & Posture",
    activityLevel: "Lightly Active",
    height: 165,
    weight: 55.0,
    targetWeight: 55.0,
    dailyCalorieTarget: 1850,
    streakDays: 6,
    points: 920,
  },
  {
    id: "usr-5",
    name: "Tariq Al-Mansoor",
    email: "tariq.am@wellness.co",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: "Suspended",
    joinedDate: "2024-01-20",
    fitnessGoal: "Cardiovascular Health",
    activityLevel: "Moderate",
    height: 175,
    weight: 79.2,
    targetWeight: 72.0,
    dailyCalorieTarget: 2200,
    streakDays: 0,
    points: 340,
  },
  {
    id: "usr-6",
    name: "Chloe Bennett",
    email: "chloe.b@kinetiq.io",
    role: "Admin",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    status: "Active",
    joinedDate: "2023-12-12",
    fitnessGoal: "Overall Wellness",
    activityLevel: "Active",
    height: 170,
    weight: 64.0,
    targetWeight: 63.0,
    dailyCalorieTarget: 2000,
    streakDays: 19,
    points: 2450,
  }
];

export const INITIAL_WORKOUTS = [
  {
    id: "wo-1",
    userId: "usr-1",
    userName: "Sarah Jenkins",
    type: "Cardio",
    title: "Morning Riverbed Sprint & Jog",
    duration: 45, // mins
    intensity: "High",
    calories: 420,
    date: "2026-10-08",
    notes: "Maintained 155 bpm heart rate, covered 6.8 km around the east trail.",
    exercises: [
      { name: "Warmup Jog", sets: 1, duration: 10, distance: "1.2 km" },
      { name: "Interval Sprints", sets: 6, duration: 20, distance: "3.2 km" },
      { name: "Cooldown Walk", sets: 1, duration: 15, distance: "2.4 km" }
    ]
  },
  {
    id: "wo-2",
    userId: "usr-1",
    userName: "Sarah Jenkins",
    type: "Strength",
    title: "Lower Body Compound Power",
    duration: 55,
    intensity: "Medium",
    calories: 380,
    date: "2026-10-07",
    notes: "Focused on depth for Romanian deadlifts and Bulgarian split squats.",
    exercises: [
      { name: "Barbell Back Squat", sets: 4, reps: "8-10", weight: "65 kg" },
      { name: "Romanian Deadlift", sets: 3, reps: "10", weight: "70 kg" },
      { name: "Bulgarian Split Squat", sets: 3, reps: "12/side", weight: "16 kg dumbells" },
      { name: "Standing Calf Raises", sets: 4, reps: "15", weight: "50 kg" }
    ]
  },
  {
    id: "wo-3",
    userId: "usr-1",
    userName: "Sarah Jenkins",
    type: "HIIT",
    title: "Tabata Full Body Burner",
    duration: 30,
    intensity: "Extreme",
    calories: 350,
    date: "2026-10-05",
    notes: "20s on, 10s rest for 8 cycles each. High energy session!",
    exercises: [
      { name: "Burpees", sets: 4, duration: 4 },
      { name: "Kettlebell Swings", sets: 4, duration: 4, weight: "18 kg" },
      { name: "Mountain Climbers", sets: 4, duration: 4 },
      { name: "Box Jumps", sets: 4, duration: 4 }
    ]
  },
  {
    id: "wo-4",
    userId: "usr-1",
    userName: "Sarah Jenkins",
    type: "Yoga",
    title: "Vinyasa Mobility & Spine Flow",
    duration: 40,
    intensity: "Low",
    calories: 160,
    date: "2026-10-04",
    notes: "Great hip decompression and deep breathing recovery sequence.",
    exercises: [
      { name: "Sun Salutation A & B", sets: 5, duration: 15 },
      { name: "Warrior Sequences", sets: 3, duration: 15 },
      { name: "Pigeon Pose & Savasana", sets: 1, duration: 10 }
    ]
  },
  {
    id: "wo-5",
    userId: "usr-1",
    userName: "Sarah Jenkins",
    type: "Cycling",
    title: "Hill Climbs & Resistance Tempo",
    duration: 60,
    intensity: "High",
    calories: 540,
    date: "2026-10-02",
    notes: "Cadence average 85 RPM with 5 climbing intervals.",
    exercises: [
      { name: "Spin Tempo Ride", sets: 1, duration: 60, distance: "24.5 km" }
    ]
  },
  {
    id: "wo-6",
    userId: "usr-3",
    userName: "Marcus Vance",
    type: "Strength",
    title: "Heavy Bench & Delts Overload",
    duration: 75,
    intensity: "Extreme",
    calories: 610,
    date: "2026-10-08",
    notes: "Hit PR on flat barbell bench: 125 kg for triple.",
    exercises: [
      { name: "Barbell Bench Press", sets: 5, reps: "3-5", weight: "125 kg" },
      { name: "Incline DB Press", sets: 4, reps: "8", weight: "40 kg each" },
      { name: "Overhead Barbell Press", sets: 4, reps: "6", weight: "75 kg" }
    ]
  },
  {
    id: "wo-7",
    userId: "usr-4",
    userName: "Elena Rostova",
    type: "Pilates",
    title: "Reformer Core Core Core",
    duration: 50,
    intensity: "Medium",
    calories: 240,
    date: "2026-10-07",
    notes: "Deep transverse abdominal activation and posture realignment.",
    exercises: [
      { name: "The Hundred", sets: 1, duration: 5 },
      { name: "Short Box Series", sets: 3, duration: 15 },
      { name: "Elephant & Mermaid Stretches", sets: 2, duration: 15 }
    ]
  }
];

export const INITIAL_FITNESS_CONTENT = [
  {
    id: "cnt-1",
    title: "Optimal Protein Timing for Hypertrophy & Recovery",
    category: "Nutrition",
    author: "Elena Rostova",
    authorRole: "User",
    summary: "Science-backed breakdown of leucine thresholds and post-workout nutrient windows.",
    content: "Consuming 25-40g of high biological value protein every 3 to 4 hours maximizes Muscle Protein Synthesis (MPS). Prioritize whole food sources supplemented with isolate post-resistance training to enhance muscle repair and glycogen replenishment.",
    readTime: "5 min read",
    status: "Approved",
    submittedDate: "2026-10-03",
    likes: 84,
    tags: ["Nutrition", "Protein", "Muscle Building"]
  },
  {
    id: "cnt-2",
    title: "Mastering the Deadlift: 5 Form Cues to Protect Your Spine",
    category: "Technique",
    author: "Marcus Vance",
    authorRole: "User",
    summary: "From wedge mechanics to lat engagement, eliminate lower back stress on heavy pulls.",
    content: "1. Pull slack out of the barbell before initiating lift.\n2. Engage lats by pretending to bend the bar across your shins.\n3. Push the floor away through your mid-foot rather than pulling with your lumbar spine.\n4. Lock hips and knees simultaneously at terminal lockout.\n5. Hinge at hips on the descent before bending knees.",
    readTime: "7 min read",
    status: "Approved",
    submittedDate: "2026-10-04",
    likes: 142,
    tags: ["Strength", "Deadlift", "Injury Prevention"]
  },
  {
    id: "cnt-3",
    title: "Zone 2 Cardio: The Longevity & Mitochondrial Superpower",
    category: "Workout Plan",
    author: "Sarah Jenkins",
    authorRole: "User",
    summary: "Why low-intensity steady state (LISS) training is the foundation of peak aerobic performance.",
    content: "Training in Zone 2 (60-70% max heart rate) builds dense mitochondrial networks, improves fat oxidation efficiency, and reduces systemic fatigue compared to chronic high-intensity sessions. Aim for 150-180 minutes weekly across 3 to 4 sessions.",
    readTime: "6 min read",
    status: "Pending",
    submittedDate: "2026-10-07",
    likes: 12,
    tags: ["Cardio", "Zone 2", "Longevity"]
  },
  {
    id: "cnt-4",
    title: "10-Day Rapid Detox & Extreme Water Flush Guide",
    category: "Nutrition",
    author: "Tariq Al-Mansoor",
    authorRole: "User",
    summary: "Drastic water flush regimen with electrolyte restrictions.",
    content: "Suggests drinking 8 liters of water daily while abstaining from sodium and whole solid food for 5 days.",
    readTime: "4 min read",
    status: "Rejected",
    rejectionReason: "Fails medical safety guidelines: extreme electrolyte depletion risk and unscientific detox claims.",
    submittedDate: "2026-10-01",
    likes: 1,
    tags: ["Diet", "Detox", "Caution"]
  },
  {
    id: "cnt-5",
    title: "Daily 15-Minute Hip Mobility Flow for Desk Workers",
    category: "Recovery",
    author: "Dave Miller",
    authorRole: "Admin",
    summary: "Combat prolonged sitting with targeted hip flexor, glute medius, and thoracic openers.",
    content: "Follow this 15-minute daily routine: 90/90 hip switches (2 mins), Couch stretch (3 mins/side), World's Greatest Stretch with thoracic reach (3 mins), and Deep Squat pry holds (3 mins).",
    readTime: "4 min read",
    status: "Approved",
    submittedDate: "2026-09-28",
    likes: 215,
    tags: ["Mobility", "Posture", "Desk Worker"]
  }
];

export const INITIAL_CHALLENGES = [
  {
    id: "ch-1",
    title: "30-Day Core Crusher",
    category: "Core & Stability",
    difficulty: "Intermediate",
    durationDays: 30,
    startDate: "2026-10-01",
    endDate: "2026-10-30",
    description: "Daily progressive abdominal and stabilizer routines: hollow body holds, side planks, bird-dogs, and hanging leg raises.",
    targetGoal: "Complete 25 out of 30 daily sessions",
    participantsCount: 342,
    rewardPoints: 500,
    rewardBadge: "🏆 Core Titan",
    userStatus: "Joined", // "Joined" | "Not Joined" | "Completed"
    userProgress: 8, // days completed
    totalDays: 30,
    featured: true
  },
  {
    id: "ch-2",
    title: "100 km Cycling & Running Sprint",
    category: "Endurance",
    difficulty: "Advanced",
    durationDays: 21,
    startDate: "2026-10-05",
    endDate: "2026-10-26",
    description: "Log a cumulative 100 kilometers across road runs, trail running, or outdoor/stationary cycling.",
    targetGoal: "Cover 100.0 km total distance",
    participantsCount: 218,
    rewardPoints: 750,
    rewardBadge: "⚡ Century Pioneer",
    userStatus: "Joined",
    userProgress: 42.5, // km covered
    totalDays: 21,
    targetMetric: "100 km",
    currentMetric: "42.5 km",
    featured: true
  },
  {
    id: "ch-3",
    title: "10,000 Steps Daily Blitz",
    category: "Daily Activity",
    difficulty: "Beginner",
    durationDays: 14,
    startDate: "2026-10-10",
    endDate: "2026-10-24",
    description: "Build effortless daily movement habits. Hit 10k steps every single day for 14 consecutive days.",
    targetGoal: "14 consecutive 10,000-step days",
    participantsCount: 512,
    rewardPoints: 300,
    rewardBadge: "👟 Step Master",
    userStatus: "Not Joined",
    userProgress: 0,
    totalDays: 14,
    featured: false
  },
  {
    id: "ch-4",
    title: "Iron Discipline: 20-Day Heavy Lifting Streak",
    category: "Strength",
    difficulty: "Beast",
    durationDays: 20,
    startDate: "2026-10-15",
    endDate: "2026-11-04",
    description: "Execute 4 focused compound resistance training sessions per week with progressive overload.",
    targetGoal: "Log 12 strength workouts",
    participantsCount: 165,
    rewardPoints: 1000,
    rewardBadge: "⚔️ Iron Titan",
    userStatus: "Not Joined",
    userProgress: 0,
    totalDays: 20,
    featured: false
  }
];

export const INITIAL_CHALLENGE_HISTORY = [
  {
    id: "hist-1",
    challengeTitle: "Autumn Cardio Blitz (50 km)",
    category: "Cardio",
    completedDate: "2026-09-28",
    result: "Completed",
    rank: "#14 of 420",
    badgeEarned: "🍁 Fall Pacer",
    pointsAwarded: 450,
    metricAchieved: "54.2 km / 50 km"
  },
  {
    id: "hist-2",
    challengeTitle: "21-Day Mindfulness & Yoga Retreat",
    category: "Mobility",
    completedDate: "2026-09-05",
    result: "Completed",
    rank: "#8 of 180",
    badgeEarned: "🧘 Zen Disciple",
    pointsAwarded: 350,
    metricAchieved: "21 / 21 sessions"
  },
  {
    id: "hist-3",
    challengeTitle: "Summer Shred 45-Day High Intensity",
    category: "HIIT",
    completedDate: "2026-08-15",
    result: "Partial (82%)",
    rank: "#55 of 600",
    badgeEarned: "🔥 Summer Warrior",
    pointsAwarded: 280,
    metricAchieved: "37 / 45 days"
  }
];

export const INITIAL_SYSTEM_SETTINGS = {
  platformName: "Kinetiq",
  tagline: "Precision Online Fitness Tracking & Performance Analytics",
  maintenanceMode: false,
  userRegistrationOpen: true,
  defaultUnitSystem: "Metric", // "Metric" (kg, km) or "Imperial" (lbs, mi)
  defaultDailyCalorieTarget: 2200,
  maxWorkoutDurationMins: 360,
  enableAiGuidance: true,
  autoApproveVerifiedTrainers: false,
  notificationDigestFrequency: "Daily",
  allowedWorkoutTypes: [
    "Cardio",
    "Strength",
    "HIIT",
    "Yoga",
    "Cycling",
    "Pilates",
    "Swimming",
    "Calisthenics",
    "Walking"
  ],
  supportEmail: "support@kinetiq.io",
  systemVersion: "v2.4.0-stable"
};

export const INITIAL_ACTIVITY_LOGS = [
  {
    id: "act-1",
    timestamp: "Just now",
    actor: "Sarah Jenkins",
    action: "Logged Workout",
    details: "Morning Riverbed Sprint & Jog (45 mins, 420 kcal)",
    type: "workout"
  },
  {
    id: "act-2",
    timestamp: "12 mins ago",
    actor: "Dave Miller (Admin)",
    action: "Approved Content",
    details: "Optimal Protein Timing for Hypertrophy & Recovery",
    type: "admin"
  },
  {
    id: "act-3",
    timestamp: "45 mins ago",
    actor: "Marcus Vance",
    action: "Joined Challenge",
    details: "100 km Cycling & Running Sprint",
    type: "challenge"
  },
  {
    id: "act-4",
    timestamp: "2 hours ago",
    actor: "Sarah Jenkins",
    action: "Challenge Progress Check-in",
    details: "Logged Day 8 in 30-Day Core Crusher",
    type: "challenge"
  },
  {
    id: "act-5",
    timestamp: "3 hours ago",
    actor: "Dave Miller (Admin)",
    action: "System Setting Updated",
    details: "Updated Default Calorie Target to 2,200 kcal",
    type: "system"
  },
  {
    id: "act-6",
    timestamp: "5 hours ago",
    actor: "Elena Rostova",
    action: "Submitted Content",
    details: "New article submitted for review: Zone 2 Cardio",
    type: "content"
  }
];

export const WEIGHT_PROGRESS_DATA = [
  { date: "Sep 08", weight: 64.8, fat: 23.2 },
  { date: "Sep 15", weight: 64.2, fat: 22.8 },
  { date: "Sep 22", weight: 63.7, fat: 22.4 },
  { date: "Sep 29", weight: 63.1, fat: 22.0 },
  { date: "Oct 06", weight: 62.5, fat: 21.6 }
];

export const WEEKLY_CALORIE_DATA = [
  { day: "Thu", calories: 420, target: 500, duration: 45 },
  { day: "Fri", calories: 380, target: 500, duration: 55 },
  { day: "Sat", calories: 540, target: 500, duration: 60 },
  { day: "Sun", calories: 160, target: 400, duration: 40 },
  { day: "Mon", calories: 350, target: 500, duration: 30 },
  { day: "Tue", calories: 490, target: 500, duration: 50 },
  { day: "Wed", calories: 420, target: 500, duration: 45 }
];

export const ADMIN_STATS_DATA = {
  activeUsersCount: 1420,
  totalWorkoutsLogged: 18450,
  activeChallengesCount: 12,
  contentSubmissionsCount: 48,
  monthlyEngagement: [
    { month: "May", activeUsers: 840, workouts: 9200, challenges: 480 },
    { month: "Jun", activeUsers: 990, workouts: 11400, challenges: 620 },
    { month: "Jul", activeUsers: 1120, workouts: 13800, challenges: 790 },
    { month: "Aug", activeUsers: 1260, workouts: 15300, challenges: 940 },
    { month: "Sep", activeUsers: 1380, workouts: 17200, challenges: 1100 },
    { month: "Oct", activeUsers: 1420, workouts: 18450, challenges: 1240 }
  ],
  workoutTypeDistribution: [
    { type: "Strength", percentage: 34, color: "#38bdf8" },
    { type: "Cardio", percentage: 28, color: "#06b6d4" },
    { type: "HIIT", percentage: 18, color: "#f43f5e" },
    { type: "Yoga/Mobility", percentage: 12, color: "#a855f7" },
    { type: "Cycling", percentage: 8, color: "#eab308" }
  ]
};
