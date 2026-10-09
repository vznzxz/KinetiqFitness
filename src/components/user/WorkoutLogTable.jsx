import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  Flame,
  Clock,
  Calendar,
  Edit2,
  Trash2,
  Dumbbell,
  ChevronDown,
  Activity,
  Plus,
  Zap,
  TrendingUp
} from 'lucide-react';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const WorkoutLogTable = ({ onOpenLogWorkout, onEditWorkout }) => {
  const { workouts, deleteWorkout, currentUser } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIntensity, setSelectedIntensity] = useState('All');
  const [workoutToDelete, setWorkoutToDelete] = useState(null);

  const userWorkouts = workouts.filter(w => !w.userId || w.userId === currentUser?.id || !currentUser);

  const filteredWorkouts = userWorkouts.filter(w => {
    const titleMatch = (w.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    const notesMatch = (w.notes || '').toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = (w.type || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || notesMatch || typeMatch;

    const matchesCategory = selectedCategory === 'All' || (w.type || '').toLowerCase() === selectedCategory.toLowerCase();
    const matchesIntensity = selectedIntensity === 'All' || (w.intensity || '').toLowerCase() === selectedIntensity.toLowerCase();

    return matchesSearch && matchesCategory && matchesIntensity;
  });

  const getIntensityBadge = (intensity) => {
    switch ((intensity || '').toLowerCase()) {
      case 'extreme':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'high':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'medium':
        return 'bg-lime-500/15 text-lime-400 border-lime-500/30';
      default:
        return 'bg-slate-700/40 text-slate-300 border-slate-700';
    }
  };

  const getTypeColor = (type) => {
    switch ((type || '').toLowerCase()) {
      case 'weightlifting':
      case 'strength':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'running':
      case 'cardio':
        return 'bg-lime-500/15 text-lime-400 border-lime-500/30';
      case 'hiit':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'yoga':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'cycling':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'boxing':
        return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const handleDeleteConfirm = async () => {
    if (!workoutToDelete) return;
    await deleteWorkout(workoutToDelete.id);
    setWorkoutToDelete(null);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Search and Filters Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search workouts by name, type, or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Disciplines</option>
              <option value="Running" className="bg-slate-900">Running</option>
              <option value="Weightlifting" className="bg-slate-900">Weightlifting</option>
              <option value="HIIT" className="bg-slate-900">HIIT</option>
              <option value="Cycling" className="bg-slate-900">Cycling</option>
              <option value="Yoga" className="bg-slate-900">Yoga</option>
              <option value="Boxing" className="bg-slate-900">Boxing</option>
              <option value="Swimming" className="bg-slate-900">Swimming</option>
              <option value="Walking" className="bg-slate-900">Walking</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Zap className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedIntensity}
              onChange={(e) => setSelectedIntensity(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Intensities</option>
              <option value="Low" className="bg-slate-900">Low</option>
              <option value="Medium" className="bg-slate-900">Medium</option>
              <option value="High" className="bg-slate-900">High</option>
              <option value="Extreme" className="bg-slate-900">Extreme</option>
            </select>
          </div>

          <button
            onClick={onOpenLogWorkout}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 rounded-xl text-xs font-bold shadow-md shadow-lime-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Log Session</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Workout Session</th>
                <th className="py-3.5 px-4">Discipline</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Intensity</th>
                <th className="py-3.5 px-4">Energy (kcal)</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {filteredWorkouts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 px-4 text-slate-400 text-xs">
                    <div className="max-w-sm mx-auto space-y-2">
                      <Flame className="w-8 h-8 text-slate-600 mx-auto" />
                      <div className="font-bold text-white text-sm">No workout sessions found</div>
                      <p className="text-slate-400 text-xs">
                        Try adjusting your search criteria or log a new workout.
                      </p>
                      <button
                        onClick={onOpenLogWorkout}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-lime-500/20 mt-2"
                      >
                        <Plus className="w-4 h-4" />
                        Log Workout
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredWorkouts.map((w) => (
                  <tr
                    key={w.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Session Title & Notes */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center font-bold text-xs shrink-0">
                          <Flame className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-lime-400 transition-colors">
                            {w.title}
                          </div>
                          {w.notes && (
                            <div className="text-xs text-slate-400 line-clamp-1 max-w-xs mt-0.5">
                              {w.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Discipline Type Badge */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${getTypeColor(w.type)}`}>
                        {w.type}
                      </span>
                    </td>

                    {/* Duration */}
                    <td className="py-4 px-4 whitespace-nowrap font-mono text-xs text-slate-200">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-lime-400" />
                        {w.durationMinutes || w.duration} mins
                      </span>
                    </td>

                    {/* Intensity */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold border ${getIntensityBadge(w.intensity)}`}>
                        {w.intensity}
                      </span>
                    </td>

                    {/* Energy (Calories Burned) */}
                    <td className="py-4 px-4 whitespace-nowrap font-mono font-bold text-lime-400 text-xs">
                      {(w.caloriesBurned || w.calories || 0).toLocaleString()} kcal
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {w.workoutDate || w.date}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onEditWorkout(w)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-lime-400 hover:bg-lime-500/10 transition-colors"
                          title="Edit Session"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setWorkoutToDelete(w)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Session"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!workoutToDelete}
        onClose={() => setWorkoutToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Workout Entry"
        message={`Are you sure you want to delete the workout "${workoutToDelete?.title}"? This record will be permanently deleted from the database.`}
        confirmText="Delete Workout"
        danger
      />
    </div>
  );
};
