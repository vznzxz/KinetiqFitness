// Central API Client for KINETIQ Platform
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class ApiClient {
  constructor() {
    this.tokenKey = 'kinetiq_token';
    this.userKey = 'kinetiq_user';
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token) {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  getCachedUser() {
    try {
      const u = localStorage.getItem(this.userKey);
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  }

  setCachedUser(user) {
    if (user) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.userKey);
    }
  }

  clearAuth() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (response.status === 401) {
        // Token invalid or expired
        this.clearAuth();
        window.dispatchEvent(new CustomEvent('kinetiq-auth-expired'));
      }

      if (response.status === 204) {
        return null;
      }

      const contentType = response.headers.get('content-type');
      let data = null;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const errorMsg = data && data.message ? data.message : `HTTP error: ${response.status}`;
        const error = new Error(errorMsg);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (err) {
      // Re-throw if already formatted, or wrap network errors
      if (err.status) throw err;
      const netError = new Error('Network error or server unavailable');
      netError.isNetworkError = true;
      throw netError;
    }
  }

  get(endpoint, params = {}) {
    const queryString = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
    ).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient();

// Auth Endpoints
export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData)
};

// Workout Endpoints
export const workoutApi = {
  getWorkouts: (startDate, endDate) => api.get('/workouts', { startDate, endDate }),
  getWorkoutById: (id) => api.get(`/workouts/${id}`),
  createWorkout: (data) => api.post('/workouts', data),
  updateWorkout: (id, data) => api.put(`/workouts/${id}`, data),
  deleteWorkout: (id) => api.delete(`/workouts/${id}`)
};

// Goals & Weight Endpoints
export const goalApi = {
  getGoal: () => api.get('/goals'),
  updateGoal: (data) => api.put('/goals', data),
  getWeightHistory: () => api.get('/goals/weight-history'),
  logWeight: (data) => api.post('/goals/weight-history', data)
};

// Challenges Endpoints
export const challengeApi = {
  getChallenges: () => api.get('/challenges'),
  getChallengeById: (id) => api.get(`/challenges/${id}`),
  joinChallenge: (id) => api.post(`/challenges/${id}/join`),
  checkInChallenge: (id, increment = 1) => api.post(`/challenges/${id}/check-in?increment=${increment}`),
  getHistory: () => api.get('/challenges/history')
};

// Fitness Content Endpoints
export const contentApi = {
  getPublicContent: () => api.get('/content/public'),
  submitContent: (data) => api.post('/content', data),
  likeContent: (id) => api.post(`/content/${id}/like`)
};

// Dashboard Endpoints
export const dashboardApi = {
  getStats: () => api.get('/dashboard')
};

// Admin Endpoints
export const adminApi = {
  getStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
  updateUserRole: (id, role, status) => api.put(`/admin/users/${id}/role`, { role, status }),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getContent: () => api.get('/admin/content'),
  updateContentStatus: (id, status) => api.put(`/admin/content/${id}/status`, { status }),
  createChallenge: (data) => api.post('/admin/challenges', data),
  deleteChallenge: (id) => api.delete(`/admin/challenges/${id}`),
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (settings) => api.put('/admin/settings', settings),
  getActivityLogs: () => api.get('/admin/activity-logs')
};

// Health Check
export const healthApi = {
  check: () => api.get('/health')
};
