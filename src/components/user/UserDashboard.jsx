import React from 'react';
import { useApp } from '../../context/AppContext';
import { WorkoutLogTable } from './WorkoutLogTable';
import { ProgressTracking } from './ProgressTracking';
import { FitnessChallenges } from './FitnessChallenges';
import { PersonalizedGuidance } from './PersonalizedGuidance';
import { UserProfileForm } from './UserProfileForm';
import {
  Flame,
  Zap,
  Activity,
  Trophy,
  Plus,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Target,
  BarChart2
} from 'lucide-react';

export const UserDashboard = ({
  activeTab,
  setActiveTab,
  onOpenLogWorkout,
  onEditWorkout
}) => {
  const { currentUser, workouts, challenges, goals, checkInChallenge } = useApp();

  const userWorkouts = workouts.filter(w => !w.userId || w.userId === currentUser?.id || !currentUser);
  const activeChallenges = challenges.filter(c => c.userStatus === 'Joined' || c.userStatus === 'JOINED');
  const totalCalories = userWorkouts.reduce((acc, curr) => acc + (curr.caloriesBurned || curr.calories || 0), 0);
  const totalMinutes = userWorkouts.reduce((acc, curr) => acc + (curr.durationMinutes || curr.duration || 0), 0);
  const recentWorkouts = userWorkouts.slice(0, 5);

  // Group workouts by type
  const typeMap = userWorkouts.reduce((acc, w) => {
    const t = w.type || 'Other';
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});

  // Past 7 days data for SVG Volume chart
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dailyCalories = [420, 650, 0, 580, 720, 310, 590]; // sample fallback distribution
  const maxCal = Math.max(...dailyCalories, 800);

  // Render Default Overview Page when activeTab === 'dashboard'
  const renderOverview = () => (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-lime-500 to-lime-300 text-slate-950 flex items-center justify-center font-black text-2xl shadow-xl shadow-lime-500/20 shrink-0">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight m-0">
                  Welcome back, {currentUser?.name?.split(' ')[0] || 'Athlete'}!
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-lime-500/15 text-lime-400 border border-lime-500/30">
                  {currentUser?.fitnessLevel || 'Intermediate'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Primary Goal: <strong className="text-slate-200 font-semibold">{currentUser?.primaryGoal || 'Athletic Performance'}</strong> • Keep the momentum alive.
              </p>
              <div className="flex items-center gap-3 mt-2.5">
                <span className="flex items-center gap-1 text-xs font-semibold text-lime-400 bg-lime-500/10 px-2.5 py-0.5 rounded-md border border-lime-500/20">
                  <Zap className="w-3.5 h-3.5 text-lime-400" /> {currentUser?.streakDays || 14} Day Streak
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-white bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-700 font-mono">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" /> {currentUser?.points || 1450} Points
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenLogWorkout}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-sm shadow-xl shadow-lime-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Log Workout</span>
            </button>
          </div>
        </div>

        {/* 4 Primary Top KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 hover:border-lime-500/30 transition">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Total Workouts</span>
              <Activity className="w-4 h-4 text-lime-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">{userWorkouts.length}</div>
            <div className="text-[10px] text-lime-400 mt-1 flex items-center gap-1">
              <span>+3 this week</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 hover:border-lime-500/30 transition">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Active Training Time</span>
              <Clock className="w-4 h-4 text-lime-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1 font-mono">
              {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Across all logged sessions</div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 hover:border-lime-500/30 transition">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Energy Expended</span>
              <Flame className="w-4 h-4 text-lime-400" />
            </div>
            <div className="text-2xl font-black text-lime-400 mt-1 font-mono">
              {totalCalories.toLocaleString()} <span className="text-xs font-normal text-slate-400">kcal</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Calculated MET metabolic burns</div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 hover:border-lime-500/30 transition">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Active Weight Goal</span>
              <Target className="w-4 h-4 text-lime-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1 font-mono">
              {currentUser?.currentWeight || 78.5} <span className="text-xs font-normal text-slate-400">/ {currentUser?.targetWeight || 75.0} kg</span>
            </div>
            <div className="text-[10px] text-lime-400 mt-1">
              {Math.abs(Number(((currentUser?.currentWeight || 78.5) - (currentUser?.targetWeight || 75.0)).toFixed(1)))} kg to target
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Charts & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Volume Chart (SVG) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-lime-400" /> Weekly Caloric Burn & Volume
              </h3>
              <p className="text-xs text-slate-400">Daily energy expenditure over the past 7 days</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-lime-500"></span>
              <span>Active Session</span>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-52 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2">
            {days.map((day, idx) => {
              const val = dailyCalories[idx];
              const heightPct = Math.round((val / maxCal) * 100);
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition">
                    {val > 0 ? `${val}k` : 'Rest'}
                  </div>
                  <div className="w-full max-w-[36px] bg-slate-950 rounded-xl overflow-hidden h-36 flex items-end p-1 border border-slate-800 group-hover:border-lime-500/50 transition">
                    <div
                      style={{ height: `${Math.max(8, heightPct)}%` }}
                      className={`w-full rounded-lg transition-all duration-500 ${
                        val > 0
                          ? 'bg-gradient-to-t from-lime-600 to-lime-400 group-hover:from-lime-500 group-hover:to-lime-300 shadow-lg shadow-lime-500/20'
                          : 'bg-slate-800/40'
                      }`}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 group-hover:text-white transition">
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Goals & Discipline Breakdown */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-lime-400" /> Weekly Target Progress
              </h3>
              <button
                onClick={() => setActiveTab('goals')}
                className="text-xs text-lime-400 hover:text-lime-300 font-semibold"
              >
                Edit Goals
              </button>
            </div>

            {/* Target 1: Weekly Workouts */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Workouts Completed</span>
                <span className="font-bold text-white">4 / {goals?.weeklyWorkoutsTarget || 5} sessions</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                <div className="h-full bg-lime-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            {/* Target 2: Weekly Calories */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Calories Burned</span>
                <span className="font-bold text-white">2,850 / {goals?.weeklyCaloriesTarget || 3200} kcal</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-lime-500 to-emerald-400 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>

            {/* Workout Discipline Breakdown */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Discipline Distribution
              </h4>
              <div className="space-y-2">
                {Object.entries(typeMap).slice(0, 4).map(([t, cnt]) => {
                  const pct = Math.round((cnt / Math.max(1, userWorkouts.length)) * 100);
                  return (
                    <div key={t} className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{t}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-white">{cnt} sessions</span>
                        <span className="text-lime-400 font-bold text-[11px]">({pct}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('guidance')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-lime-500/40 text-xs font-bold text-slate-200 hover:text-white transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            <span>View Personalized Guidance</span>
          </button>
        </div>
      </div>

      {/* Lower Section: Recent Workouts & Active Arena Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Workouts List */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-lime-400" /> Recent Workouts
              </h3>
              <p className="text-xs text-slate-400">Latest recorded sessions from your training log</p>
            </div>
            <button
              onClick={() => setActiveTab('workouts')}
              className="text-xs font-bold text-lime-400 hover:text-lime-300 flex items-center gap-1"
            >
              <span>View All Logs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentWorkouts.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              No workouts logged yet. Click "Log Workout" to record your first session!
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80">
              {recentWorkouts.map((w) => (
                <div key={w.id} className="py-3.5 flex items-center justify-between gap-4 group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white group-hover:text-lime-400 transition">
                        {w.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="text-lime-400 font-semibold">{w.type}</span>
                        <span>•</span>
                        <span>{w.durationMinutes || w.duration} mins</span>
                        <span>•</span>
                        <span className="text-slate-300">{w.intensity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs sm:text-sm font-extrabold text-lime-400 font-mono">
                      {w.caloriesBurned || w.calories} kcal
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {w.workoutDate || w.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Arena Challenges Card */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-lime-400" /> Active Arena Challenges
              </h3>
              <button
                onClick={() => setActiveTab('challenges')}
                className="text-xs text-lime-400 hover:text-lime-300 font-semibold"
              >
                Browse All
              </button>
            </div>

            {activeChallenges.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No active challenges joined. Head over to the Arena to enroll!
              </div>
            ) : (
              <div className="space-y-3.5">
                {activeChallenges.slice(0, 3).map((ch) => {
                  const prog = ch.userProgress || 0;
                  const total = ch.totalDays || 30;
                  const pct = Math.round((prog / total) * 100);
                  return (
                    <div key={ch.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-lime-500/30 transition">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-white truncate max-w-[170px]">{ch.title}</span>
                        <span className="text-[10px] font-mono text-lime-400 font-bold">{prog} / {total} {ch.unit || 'days'}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden mb-2.5">
                        <div className="h-full bg-lime-500 rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                      </div>
                      <button
                        onClick={() => checkInChallenge(ch.id, 1)}
                        className="w-full py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-lime-500 hover:text-slate-950 text-slate-300 font-semibold text-[11px] border border-slate-800 hover:border-lime-500 transition flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" />
                        <span>Log Today's Progress (+1)</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Achievement Badges Showcase */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
              Earned Badges
            </h4>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-lime-500/10 border border-lime-500/30 text-lime-400 text-xs font-bold flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" /> 14-Day Streak
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Shred Master
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Sub-view switcher */}
      {activeTab === 'dashboard' && renderOverview()}

      {activeTab === 'workouts' && (
        <WorkoutLogTable
          onOpenLogWorkout={onOpenLogWorkout}
          onEditWorkout={onEditWorkout}
        />
      )}

      {activeTab === 'goals' && <ProgressTracking />}

      {activeTab === 'challenges' && <FitnessChallenges />}

      {activeTab === 'guidance' && <PersonalizedGuidance />}

      {activeTab === 'profile' && <UserProfileForm />}
    </div>
  );
};
