import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  api,
  authApi,
  workoutApi,
  goalApi,
  challengeApi,
  contentApi,
  dashboardApi,
  adminApi,
  healthApi
} from '../services/api';
import {
  INITIAL_USERS,
  INITIAL_WORKOUTS,
  INITIAL_FITNESS_CONTENT,
  INITIAL_CHALLENGES,
  INITIAL_CHALLENGE_HISTORY,
  INITIAL_SYSTEM_SETTINGS,
  INITIAL_ACTIVITY_LOGS,
  WEIGHT_PROGRESS_DATA
} from '../mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => api.getCachedUser() || null);
  const [token, setToken] = useState(() => api.getToken() || null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [backendOnline, setBackendOnline] = useState(false);

  // App Data State
  const [workouts, setWorkouts] = useState([]);
  const [goals, setGoals] = useState(null);
  const [weightHistory, setWeightHistory] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [challengeHistory, setChallengeHistory] = useState([]);
  const [fitnessContent, setFitnessContent] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);

  // Admin Data State
  const [users, setUsers] = useState([]);
  const [adminStats, setAdminStats] = useState(null);
  const [adminContent, setAdminContent] = useState([]);
  const [systemSettings, setSystemSettings] = useState(INITIAL_SYSTEM_SETTINGS);
  const [activityLogs, setActivityLogs] = useState([]);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', title = null) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts(prev => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Check Backend Health & Connectivity
  const checkBackendHealth = useCallback(async () => {
    try {
      const res = await healthApi.check();
      if (res && res.status === 'UP') {
        setBackendOnline(true);
        return true;
      }
    } catch {
      setBackendOnline(false);
    }
    return false;
  }, []);

  // Load Admin Platform Data
  const loadAdminData = useCallback(async () => {
    try {
      const [uList, aStats, aContent, aSettings, aLogs] = await Promise.allSettled([
        adminApi.getUsers(),
        adminApi.getStats(),
        adminApi.getContent(),
        adminApi.getSettings(),
        adminApi.getActivityLogs()
      ]);

      if (uList.status === 'fulfilled' && Array.isArray(uList.value)) setUsers(uList.value);
      else setUsers(INITIAL_USERS);

      if (aStats.status === 'fulfilled') setAdminStats(aStats.value);

      if (aContent.status === 'fulfilled' && Array.isArray(aContent.value)) setAdminContent(aContent.value);
      else setAdminContent(INITIAL_FITNESS_CONTENT);

      if (aSettings.status === 'fulfilled' && aSettings.value) setSystemSettings(aSettings.value);

      if (aLogs.status === 'fulfilled' && Array.isArray(aLogs.value)) setActivityLogs(aLogs.value);
      else setActivityLogs(INITIAL_ACTIVITY_LOGS);
    } catch (err) {
      console.warn('Error loading admin data:', err);
    }
  }, []);

  // Load User Data from Backend or Local Fallback
  const loadUserData = useCallback(async (user) => {
    if (!user) return;
    try {
      // 1. Workouts
      try {
        const wList = await workoutApi.getWorkouts();
        if (Array.isArray(wList)) setWorkouts(wList);
      } catch {
        setWorkouts(INITIAL_WORKOUTS.filter(w => w.userId === user.id || user.role === 'ROLE_ADMIN' || user.role === 'Admin'));
      }

      // 2. Goals
      try {
        const g = await goalApi.getGoal();
        if (g) setGoals(g);
      } catch {
        setGoals({
          weeklyWorkoutsTarget: 4,
          weeklyCaloriesTarget: 2500,
          startingWeightKg: user.currentWeight || 75.0,
          targetWeightKg: user.targetWeight || 70.0
        });
      }

      // 3. Weight History
      try {
        const wh = await goalApi.getWeightHistory();
        if (Array.isArray(wh) && wh.length > 0) setWeightHistory(wh);
        else setWeightHistory(WEIGHT_PROGRESS_DATA);
      } catch {
        setWeightHistory(WEIGHT_PROGRESS_DATA);
      }

      // 4. Challenges
      try {
        const chList = await challengeApi.getChallenges();
        if (Array.isArray(chList)) setChallenges(chList);
      } catch {
        setChallenges(INITIAL_CHALLENGES);
      }

      // 5. Challenge History
      try {
        const hist = await challengeApi.getHistory();
        if (Array.isArray(hist) && hist.length > 0) setChallengeHistory(hist);
        else setChallengeHistory(INITIAL_CHALLENGE_HISTORY);
      } catch {
        setChallengeHistory(INITIAL_CHALLENGE_HISTORY);
      }

      // 6. Public Content
      try {
        const cnt = await contentApi.getPublicContent();
        if (Array.isArray(cnt)) setFitnessContent(cnt);
      } catch {
        setFitnessContent(INITIAL_FITNESS_CONTENT);
      }

      // 7. Dashboard Stats
      try {
        const ds = await dashboardApi.getStats();
        if (ds) setDashboardStats(ds);
      } catch {
        // Compute from local workouts
      }

      // If user is Admin, load Admin data
      const isAdminRole = user.role === 'ROLE_ADMIN' || user.role === 'Admin';
      if (isAdminRole) {
        loadAdminData();
      }
    } catch (err) {
      console.warn('Error loading user data:', err);
    }
  }, [loadAdminData]);

  // Initialize Auth on app mount
  useEffect(() => {
    const initAuth = async () => {
      setIsLoadingAuth(true);
      const isOnline = await checkBackendHealth();

      const existingToken = api.getToken();
      if (existingToken && isOnline) {
        try {
          const freshUser = await authApi.getMe();
          setCurrentUser(freshUser);
          api.setCachedUser(freshUser);
          await loadUserData(freshUser);
        } catch (err) {
          console.warn('Token expired or invalid during init:', err);
          api.clearAuth();
          setCurrentUser(null);
          setToken(null);
        }
      } else if (currentUser) {
        // Offline or cached session
        await loadUserData(currentUser);
      }
      setIsLoadingAuth(false);
    };

    initAuth();

    // Listen to token expired events
    const handleAuthExpired = () => {
      setCurrentUser(null);
      setToken(null);
      showToast('Your session has expired. Please sign in again.', 'warning', 'Session Expired');
    };
    window.addEventListener('kinetiq-auth-expired', handleAuthExpired);

    return () => {
      window.removeEventListener('kinetiq-auth-expired', handleAuthExpired);
    };
  }, [checkBackendHealth, loadUserData, showToast]);

  // Auth Actions
  const login = async (email, password) => {
    try {
      const isOnline = await checkBackendHealth();
      if (isOnline) {
        const response = await authApi.login(email, password);
        api.setToken(response.token);
        api.setCachedUser(response.user);
        setToken(response.token);
        setCurrentUser(response.user);
        await loadUserData(response.user);
        showToast(`Welcome back, ${response.user.name}!`, 'success', 'Login Successful');
        return response.user;
      } else {
        // Fallback demo matching
        const normalized = email.toLowerCase().trim();
        const found = INITIAL_USERS.find(u => u.email.toLowerCase() === normalized);
        if (found) {
          api.setToken('demo-token-offline');
          api.setCachedUser(found);
          setToken('demo-token-offline');
          setCurrentUser(found);
          await loadUserData(found);
          showToast(`Signed in as ${found.name} (Demo Mode)`, 'info', 'Offline Ready');
          return found;
        } else {
          throw new Error('User not found. Use alex@kinetiq.fit or admin@kinetiq.fit');
        }
      }
    } catch (err) {
      showToast(err.message || 'Login failed', 'error', 'Authentication Error');
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const isOnline = await checkBackendHealth();
      if (isOnline) {
        const response = await authApi.register(userData);
        api.setToken(response.token);
        api.setCachedUser(response.user);
        setToken(response.token);
        setCurrentUser(response.user);
        await loadUserData(response.user);
        showToast(`Welcome to Kinetiq, ${response.user.name}! Account created.`, 'success', 'Athlete Enrolled');
        return response.user;
      } else {
        const newUser = {
          id: `u-${Date.now()}`,
          ...userData,
          role: 'ROLE_USER',
          streakDays: 1,
          points: 100,
          status: 'ACTIVE'
        };
        api.setToken('demo-token-reg');
        api.setCachedUser(newUser);
        setToken('demo-token-reg');
        setCurrentUser(newUser);
        await loadUserData(newUser);
        showToast(`Welcome ${newUser.name}! Enrolled in demo mode.`, 'success', 'Athlete Enrolled');
        return newUser;
      }
    } catch (err) {
      showToast(err.message || 'Registration failed', 'error', 'Enrollment Error');
      throw err;
    }
  };

  const logout = () => {
    api.clearAuth();
    setCurrentUser(null);
    setToken(null);
    setWorkouts([]);
    setGoals(null);
    showToast('You have been logged out safely.', 'info', 'Logged Out');
  };

  const updateUserProfile = async (profileData) => {
    try {
      if (backendOnline) {
        const updated = await authApi.updateProfile(profileData);
        setCurrentUser(updated);
        api.setCachedUser(updated);
        showToast('Profile and biometric parameters updated!', 'success', 'Profile Updated');
        return updated;
      } else {
        const updated = { ...currentUser, ...profileData };
        setCurrentUser(updated);
        api.setCachedUser(updated);
        showToast('Profile updated locally.', 'success', 'Profile Updated');
        return updated;
      }
    } catch (err) {
      showToast(err.message || 'Could not update profile', 'error', 'Profile Error');
      throw err;
    }
  };

  // Workout CRUD Actions
  const logWorkout = async (workoutData) => {
    try {
      const payload = {
        type: workoutData.type,
        title: workoutData.title || `${workoutData.type} Session`,
        durationMinutes: Number(workoutData.durationMinutes || workoutData.duration),
        intensity: workoutData.intensity || 'Medium',
        caloriesBurned: workoutData.caloriesBurned ? Number(workoutData.caloriesBurned) : null,
        workoutDate: workoutData.workoutDate || workoutData.date || new Date().toISOString().split('T')[0],
        notes: workoutData.notes || '',
        exercisesJson: workoutData.exercisesJson || (workoutData.exercises ? JSON.stringify(workoutData.exercises) : '')
      };

      if (backendOnline) {
        const saved = await workoutApi.createWorkout(payload);
        setWorkouts(prev => [saved, ...prev]);
        // Update user stats
        setCurrentUser(prev => prev ? {
          ...prev,
          streakDays: (prev.streakDays || 0) + 1,
          points: (prev.points || 0) + 50
        } : prev);
        showToast(`Workout "${saved.title}" recorded! +50 pts`, 'success', 'Workout Logged');
        return saved;
      } else {
        const localSaved = {
          id: `wo-${Date.now()}`,
          userId: currentUser.id,
          user: currentUser,
          ...payload,
          duration: payload.durationMinutes,
          calories: payload.caloriesBurned || Math.round(payload.durationMinutes * 8),
          caloriesBurned: payload.caloriesBurned || Math.round(payload.durationMinutes * 8),
          date: payload.workoutDate
        };
        setWorkouts(prev => [localSaved, ...prev]);
        setCurrentUser(prev => ({
          ...prev,
          streakDays: (prev.streakDays || 0) + 1,
          points: (prev.points || 0) + 50
        }));
        showToast(`Workout "${localSaved.title}" recorded locally! +50 pts`, 'success', 'Workout Logged');
        return localSaved;
      }
    } catch (err) {
      showToast(err.message || 'Failed to log workout', 'error', 'Log Error');
      throw err;
    }
  };

  const updateWorkout = async (id, updatedData) => {
    try {
      const payload = {
        type: updatedData.type,
        title: updatedData.title,
        durationMinutes: Number(updatedData.durationMinutes || updatedData.duration),
        intensity: updatedData.intensity,
        caloriesBurned: updatedData.caloriesBurned ? Number(updatedData.caloriesBurned) : null,
        workoutDate: updatedData.workoutDate || updatedData.date,
        notes: updatedData.notes,
        exercisesJson: updatedData.exercisesJson
      };

      if (backendOnline && typeof id === 'number') {
        const updated = await workoutApi.updateWorkout(id, payload);
        setWorkouts(prev => prev.map(w => w.id === id ? updated : w));
        showToast('Workout log updated successfully.', 'success', 'Workout Updated');
        return updated;
      } else {
        setWorkouts(prev => prev.map(w => w.id === id ? { ...w, ...payload } : w));
        showToast('Workout log updated successfully.', 'success', 'Workout Updated');
      }
    } catch (err) {
      showToast(err.message || 'Failed to update workout', 'error', 'Update Error');
      throw err;
    }
  };

  const deleteWorkout = async (id) => {
    try {
      if (backendOnline && typeof id === 'number') {
        await workoutApi.deleteWorkout(id);
      }
      setWorkouts(prev => prev.filter(w => w.id !== id));
      showToast('Workout log deleted.', 'info', 'Workout Removed');
    } catch (err) {
      showToast(err.message || 'Failed to delete workout', 'error', 'Delete Error');
      throw err;
    }
  };

  // Goals & Weight Tracking
  const updateFitnessGoal = async (goalData) => {
    try {
      if (backendOnline) {
        const updated = await goalApi.updateGoal(goalData);
        setGoals(updated);
      } else {
        setGoals(prev => ({ ...prev, ...goalData }));
      }
      showToast('Weekly targets and fitness goals updated!', 'success', 'Goal Updated');
    } catch (err) {
      showToast(err.message || 'Failed to update goal', 'error', 'Goal Error');
    }
  };

  const logWeightEntry = async (weight, fatPercentage, date) => {
    try {
      const payload = {
        weightKg: Number(weight),
        bodyFatPercentage: fatPercentage ? Number(fatPercentage) : null,
        recordedDate: date || new Date().toISOString().split('T')[0]
      };

      if (backendOnline) {
        const saved = await goalApi.logWeight(payload);
        setWeightHistory(prev => [...prev, saved]);
        setCurrentUser(prev => prev ? { ...prev, currentWeight: Number(weight) } : prev);
      } else {
        const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const localEntry = {
          date: todayStr,
          weight: Number(weight),
          fat: Number(fatPercentage) || 18.0
        };
        setWeightHistory(prev => [...prev, localEntry]);
        setCurrentUser(prev => ({ ...prev, currentWeight: Number(weight) }));
      }
      showToast(`Biometric progress logged: ${weight} kg!`, 'success', 'Weight Logged');
    } catch (err) {
      showToast(err.message || 'Failed to log weight', 'error', 'Weight Error');
    }
  };

  // Challenges Actions
  const joinChallenge = async (challengeId) => {
    try {
      if (backendOnline && typeof challengeId === 'number') {
        await challengeApi.joinChallenge(challengeId);
        await loadUserData(currentUser);
      } else {
        setChallenges(prev => prev.map(ch => {
          if (ch.id === challengeId) {
            return {
              ...ch,
              userStatus: 'Joined',
              participantsCount: (ch.participantsCount || 0) + 1,
              userProgress: 1
            };
          }
          return ch;
        }));
      }
      showToast('Challenge accepted! Step into the arena.', 'success', 'Challenge Joined');
    } catch (err) {
      showToast(err.message || 'Failed to join challenge', 'error', 'Challenge Error');
    }
  };

  const checkInChallenge = async (challengeId, increment = 1) => {
    try {
      if (backendOnline && typeof challengeId === 'number') {
        const res = await challengeApi.checkInChallenge(challengeId, increment);
        await loadUserData(currentUser);
        if (res && res.status === 'COMPLETED') {
          showToast(`🏆 Challenge Conquered! Bonus points awarded!`, 'success', 'Milestone Unlocked');
        } else {
          showToast(`Challenge progress recorded: +${increment}!`, 'success', 'Check-In Logged');
        }
      } else {
        setChallenges(prev => prev.map(ch => {
          if (ch.id === challengeId) {
            const nextP = Math.min(ch.totalDays, (ch.userProgress || 0) + increment);
            const isDone = nextP >= ch.totalDays;
            return {
              ...ch,
              userProgress: nextP,
              userStatus: isDone ? 'Completed' : 'Joined'
            };
          }
          return ch;
        }));
        showToast(`Challenge progress updated! +${increment} logged.`, 'success', 'Progress Saved');
      }
    } catch (err) {
      showToast(err.message || 'Failed to update challenge progress', 'error', 'Check-In Error');
    }
  };

  // Community Content
  const submitFitnessContent = async (contentData) => {
    try {
      if (backendOnline) {
        const saved = await contentApi.submitContent(contentData);
        if (currentUser.role === 'ROLE_ADMIN' || currentUser.role === 'Admin') {
          setFitnessContent(prev => [saved, ...prev]);
          showToast('Article published directly to Kinetiq community!', 'success', 'Content Live');
        } else {
          showToast('Article submitted! Queued for Admin moderation.', 'success', 'Submitted for Review');
        }
        return saved;
      } else {
        const local = {
          id: `c-${Date.now()}`,
          author: currentUser,
          authorName: currentUser.name,
          title: contentData.title,
          category: contentData.category,
          content: contentData.content,
          readTime: contentData.readTime || '5 min',
          status: currentUser.role === 'ROLE_ADMIN' || currentUser.role === 'Admin' ? 'Approved' : 'Pending',
          likes: 0,
          tags: contentData.tags || 'Fitness, Performance'
        };
        setFitnessContent(prev => [local, ...prev]);
        showToast('Article submitted successfully!', 'success', 'Content Submitted');
        return local;
      }
    } catch (err) {
      showToast(err.message || 'Failed to submit article', 'error', 'Content Error');
      throw err;
    }
  };

  const likeFitnessContent = async (id) => {
    try {
      if (backendOnline && typeof id === 'number') {
        await contentApi.likeContent(id);
      }
      setFitnessContent(prev => prev.map(c => c.id === id ? { ...c, likes: (c.likes || 0) + 1 } : c));
    } catch (err) {
      console.warn('Could not like content:', err);
    }
  };

  // Admin Actions
  const updateUserRole = async (userId, role, status) => {
    try {
      if (backendOnline && typeof userId === 'number') {
        const updated = await adminApi.updateUserRole(userId, role, status);
        setUsers(prev => prev.map(u => u.id === userId ? updated : u));
      } else {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role, status } : u));
      }
      showToast('User permissions and role updated successfully.', 'success', 'Role Updated');
    } catch (err) {
      showToast(err.message || 'Failed to update user', 'error', 'Admin Error');
    }
  };

  const deleteUser = async (userId) => {
    try {
      if (backendOnline && typeof userId === 'number') {
        await adminApi.deleteUser(userId);
      }
      setUsers(prev => prev.filter(u => u.id !== userId));
      showToast('Athlete record removed from database.', 'info', 'User Deleted');
    } catch (err) {
      showToast(err.message || 'Failed to delete user', 'error', 'Admin Error');
    }
  };

  const approveContent = async (id) => {
    try {
      if (backendOnline && typeof id === 'number') {
        await adminApi.updateContentStatus(id, 'APPROVED');
      }
      setAdminContent(prev => prev.map(c => c.id === id ? { ...c, status: 'APPROVED' } : c));
      setFitnessContent(prev => prev.map(c => c.id === id ? { ...c, status: 'APPROVED' } : c));
      showToast('Article approved and published to public feed.', 'success', 'Content Approved');
    } catch (err) {
      showToast(err.message || 'Failed to approve content', 'error', 'Moderation Error');
    }
  };

  const rejectContent = async (id) => {
    try {
      if (backendOnline && typeof id === 'number') {
        await adminApi.updateContentStatus(id, 'REJECTED');
      }
      setAdminContent(prev => prev.map(c => c.id === id ? { ...c, status: 'REJECTED' } : c));
      showToast('Article marked as rejected.', 'info', 'Content Rejected');
    } catch (err) {
      showToast(err.message || 'Failed to reject content', 'error', 'Moderation Error');
    }
  };

  const createChallenge = async (challengeData) => {
    try {
      if (backendOnline) {
        const saved = await adminApi.createChallenge(challengeData);
        setChallenges(prev => [saved, ...prev]);
        showToast(`Challenge "${saved.title}" launched across platform!`, 'success', 'Challenge Launched');
        return saved;
      } else {
        const local = {
          id: `ch-${Date.now()}`,
          ...challengeData,
          participantsCount: 0,
          userStatus: 'Available',
          userProgress: 0,
          active: true
        };
        setChallenges(prev => [local, ...prev]);
        showToast(`Challenge "${local.title}" launched locally!`, 'success', 'Challenge Launched');
        return local;
      }
    } catch (err) {
      showToast(err.message || 'Failed to create challenge', 'error', 'Challenge Error');
      throw err;
    }
  };

  const deleteChallenge = async (id) => {
    try {
      if (backendOnline && typeof id === 'number') {
        await adminApi.deleteChallenge(id);
      }
      setChallenges(prev => prev.filter(c => c.id !== id));
      showToast('Challenge removed from active schedule.', 'info', 'Challenge Deleted');
    } catch (err) {
      showToast(err.message || 'Failed to delete challenge', 'error', 'Admin Error');
    }
  };

  const updateSystemSettings = async (newSettings) => {
    try {
      if (backendOnline) {
        const updated = await adminApi.updateSettings(newSettings);
        setSystemSettings(updated);
      } else {
        setSystemSettings(prev => ({ ...prev, ...newSettings }));
      }
      showToast('System configuration parameters saved.', 'success', 'Settings Saved');
    } catch (err) {
      showToast(err.message || 'Failed to save settings', 'error', 'Settings Error');
    }
  };

  const isAdmin = currentUser && (currentUser.role === 'ROLE_ADMIN' || currentUser.role === 'Admin');

  return (
    <AppContext.Provider
      value={{
        // Auth
        currentUser,
        token,
        isAuthenticated: !!currentUser,
        isAdmin,
        isLoadingAuth,
        backendOnline,
        login,
        register,
        logout,
        updateUserProfile,
        checkBackendHealth,

        // User Data
        workouts,
        goals,
        weightHistory,
        challenges,
        challengeHistory,
        fitnessContent,
        dashboardStats,

        // User Actions
        logWorkout,
        updateWorkout,
        deleteWorkout,
        updateFitnessGoal,
        logWeightEntry,
        joinChallenge,
        checkInChallenge,
        submitFitnessContent,
        likeFitnessContent,

        // Admin Data & Actions
        users,
        adminStats,
        adminContent,
        systemSettings,
        activityLogs,
        updateUserRole,
        deleteUser,
        approveContent,
        rejectContent,
        createChallenge,
        deleteChallenge,
        updateSystemSettings,
        loadAdminData,

        // Notifications
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
