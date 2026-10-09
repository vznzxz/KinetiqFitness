import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Scale,
  Flame,
  Award,
  Calendar,
  Zap,
  Target,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Activity,
  BarChart3,
  Clock,
  Sparkles
} from 'lucide-react';

export const ProgressTracking = () => {
  const { weightHistory, logWeightEntry, updateFitnessGoal, goals, workouts, currentUser } = useApp();

  const [inputWeight, setInputWeight] = useState('');
  const [inputFat, setInputFat] = useState('');
  const [inputDate, setInputDate] = useState(new Date().toISOString().split('T')[0]);

  // Goal Form State
  const [weeklyWorkouts, setWeeklyWorkouts] = useState(goals?.weeklyWorkoutsTarget || 4);
  const [weeklyCalories, setWeeklyCalories] = useState(goals?.weeklyCaloriesTarget || 2500);
  const [targetWeightInput, setTargetWeightInput] = useState(currentUser?.targetWeight || 70.0);
  const [isEditingGoal, setIsEditingGoal] = useState(false);

  // Calculate statistics
  const currentWeight = weightHistory.length > 0
    ? weightHistory[weightHistory.length - 1].weightKg || weightHistory[weightHistory.length - 1].weight
    : currentUser?.currentWeight || 75.0;

  const initialWeight = weightHistory.length > 0
    ? weightHistory[0].weightKg || weightHistory[0].weight
    : currentWeight;

  const targetWeight = goals?.targetWeightKg || currentUser?.targetWeight || 70.0;
  const weightChange = (currentWeight - initialWeight).toFixed(1);
  const toGoal = (currentWeight - targetWeight).toFixed(1);

  const totalCaloriesAllTime = workouts.reduce((acc, w) => acc + (w.caloriesBurned || w.calories || 0), 0);
  const totalMinutesAllTime = workouts.reduce((acc, w) => acc + (w.durationMinutes || w.duration || 0), 0);

  // BMI Calculation
  const heightM = (currentUser?.height || 178) / 100;
  const bmi = (currentWeight / (heightM * heightM)).toFixed(1);
  const getBmiCategory = (b) => {
    if (b < 18.5) return 'Underweight';
    if (b < 25) return 'Normal Weight';
    if (b < 30) return 'Overweight';
    return 'Obese';
  };

  const handleLogWeightSubmit = async (e) => {
    e.preventDefault();
    if (!inputWeight) return;
    await logWeightEntry(Number(inputWeight), inputFat ? Number(inputFat) : null, inputDate);
    setInputWeight('');
    setInputFat('');
  };

  const handleSaveGoal = async (e) => {
    e.preventDefault();
    await updateFitnessGoal({
      weeklyWorkoutsTarget: Number(weeklyWorkouts),
      weeklyCaloriesTarget: Number(weeklyCalories),
      targetWeightKg: Number(targetWeightInput)
    });
    setIsEditingGoal(false);
  };

  // SVG Chart Dimensions & Helpers for Weight History
  const svgWidth = 600;
  const svgHeight = 220;
  const padding = 40;

  const rawWeights = weightHistory.map(d => d.weightKg || d.weight || currentWeight);
  const weights = rawWeights.length > 0 ? rawWeights : [currentWeight];
  const minW = Math.min(...weights, targetWeight) - 1.5;
  const maxW = Math.max(...weights, targetWeight) + 1.5;

  const getX = (index) => padding + (index * (svgWidth - 2 * padding)) / Math.max(1, weights.length - 1);
  const getY = (val) => svgHeight - padding - ((val - minW) / Math.max(0.1, (maxW - minW))) * (svgHeight - 2 * padding);

  const weightPoints = weights.map((w, i) => `${getX(i)},${getY(w)}`).join(' ');
  const targetY = getY(targetWeight);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Biometric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Current Weight */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Weight</span>
            <div className="p-2 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{currentWeight}</span>
            <span className="text-xs text-slate-400 font-mono">kg</span>
            <span className={`text-xs font-semibold flex items-center ml-2 ${
              Number(weightChange) <= 0 ? 'text-lime-400' : 'text-rose-400'
            }`}>
              {Number(weightChange) <= 0 ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
              {Math.abs(Number(weightChange))} kg
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Target Goal: <strong className="text-slate-200">{targetWeight} kg</strong> ({Math.abs(Number(toGoal))} kg to go)
          </p>
        </div>

        {/* Card 2: Streak Days */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Streak</span>
            <div className="p-2 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-lime-400">{currentUser?.streakDays || 14}</span>
            <span className="text-xs text-slate-400 font-mono">days</span>
            <span className="text-xs font-semibold text-amber-400 flex items-center ml-2">
              <Flame className="w-3.5 h-3.5" /> On Fire
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Personal best streak record
          </p>
        </div>

        {/* Card 3: Total Energy Burned */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Energy Expended</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{totalCaloriesAllTime.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-mono">kcal</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">
            {Math.floor(totalMinutesAllTime / 60)}h {totalMinutesAllTime % 60}m training volume
          </p>
        </div>

        {/* Card 4: Body Mass Index (BMI) */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Body Mass Index</span>
            <div className="p-2 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{bmi}</span>
            <span className="text-xs font-semibold text-lime-400 ml-2">
              {getBmiCategory(Number(bmi))}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Height: {currentUser?.height || 178} cm
          </p>
        </div>
      </div>

      {/* Main Row: Weight History Chart & Log New Weight Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG Weight Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-lime-400" />
                Weight Progression Trajectory
              </h3>
              <p className="text-xs text-slate-400">Historical biometric logs plotted toward target goal</p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-lime-400 font-semibold">
                <span className="w-3 h-1 bg-lime-400 rounded-full inline-block"></span>
                <span>Logged Weight</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <span className="w-3 h-0.5 border-t border-dashed border-amber-400 inline-block"></span>
                <span>Target: {targetWeight} kg</span>
              </span>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-56 overflow-visible"
            >
              {/* Target Line */}
              <line
                x1={padding}
                y1={targetY}
                x2={svgWidth - padding}
                y2={targetY}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.8"
              />

              {/* Progress Polyline */}
              <polyline
                fill="none"
                stroke="#a3e635"
                strokeWidth="3"
                points={weightPoints}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Dots */}
              {weights.map((w, idx) => {
                const cx = getX(idx);
                const cy = getY(w);
                return (
                  <g key={idx} className="group cursor-pointer">
                    <circle
                      cx={cx}
                      cy={cy}
                      r="4.5"
                      fill="#090d14"
                      stroke="#a3e635"
                      strokeWidth="2.5"
                      className="group-hover:r-6 transition-all"
                    />
                    <text
                      x={cx}
                      y={cy - 10}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {w}k
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Log Biometric Weight Form */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
              <Scale className="w-4 h-4 text-lime-400" />
              Record Biometric Check-In
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Log daily morning weigh-ins to update progression curves
            </p>

            <form onSubmit={handleLogWeightSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Weight (kg) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  placeholder="e.g. 77.8"
                  value={inputWeight}
                  onChange={(e) => setInputWeight(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Body Fat % (Optional)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 15.8"
                  value={inputFat}
                  onChange={(e) => setInputFat(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Recorded Date
                </label>
                <input
                  type="date"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-lime-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Save Biometric Entry</span>
              </button>
            </form>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
            Tip: Weigh yourself consistently in the morning under fasting conditions.
          </div>
        </div>
      </div>

      {/* Target Goals Configuration Panel */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-lime-400" />
              Fitness Goals & Targets
            </h3>
            <p className="text-xs text-slate-400">Configure weekly session volume and body composition deadlines</p>
          </div>
          <button
            onClick={() => setIsEditingGoal(!isEditingGoal)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            {isEditingGoal ? 'Cancel' : 'Edit Target Parameters'}
          </button>
        </div>

        {isEditingGoal ? (
          <form onSubmit={handleSaveGoal} className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Weekly Workouts Target</label>
              <input
                type="number"
                min="1"
                max="14"
                value={weeklyWorkouts}
                onChange={(e) => setWeeklyWorkouts(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Weekly Calorie Target (kcal)</label>
              <input
                type="number"
                step="50"
                value={weeklyCalories}
                onChange={(e) => setWeeklyCalories(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Weight (kg)</label>
              <input
                type="number"
                step="0.5"
                value={targetWeightInput}
                onChange={(e) => setTargetWeightInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="sm:col-span-3 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-lime-500/20"
              >
                Save Goals to Database
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-xs text-slate-400">Weekly Target Sessions</div>
              <div className="text-xl font-bold text-white mt-1">{goals?.weeklyWorkoutsTarget || 4} Sessions / week</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-xs text-slate-400">Weekly Energy Burn Goal</div>
              <div className="text-xl font-bold text-lime-400 mt-1">{goals?.weeklyCaloriesTarget || 2500} kcal</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-xs text-slate-400">Target Bodyweight</div>
              <div className="text-xl font-bold text-white mt-1">{targetWeight} kg</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
