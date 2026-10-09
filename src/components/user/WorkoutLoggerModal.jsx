import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Activity, Flame, Clock, Calendar, Dumbbell, Tag, Plus, Trash2, Zap } from 'lucide-react';

export const WorkoutLoggerModal = ({ isOpen, onClose, editingWorkout = null }) => {
  const { logWorkout, updateWorkout } = useApp();

  const [type, setType] = useState('Running');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(45);
  const [intensity, setIntensity] = useState('Medium');
  const [calories, setCalories] = useState(380);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [exercises, setExercises] = useState([]);
  const [newExName, setNewExName] = useState('');
  const [newExSets, setNewExSets] = useState('3');
  const [newExReps, setNewExReps] = useState('10');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const workoutTypes = [
    'Running', 'Weightlifting', 'HIIT', 'Cycling', 'Yoga', 'Boxing', 'Swimming', 'Walking'
  ];

  const intensityMultipliers = {
    Low: 4.5,
    Medium: 7.2,
    High: 10.0,
    Extreme: 13.5
  };

  // Auto-calculate calories when duration or intensity changes
  useEffect(() => {
    if (!editingWorkout) {
      const mult = intensityMultipliers[intensity] || 7.0;
      const typeFactor = type === 'HIIT' ? 1.25 : type === 'Boxing' ? 1.2 : type === 'Yoga' ? 0.7 : 1.0;
      setCalories(Math.round(duration * mult * typeFactor));
    }
  }, [duration, intensity, type, editingWorkout]);

  // Populate when editing
  useEffect(() => {
    if (editingWorkout) {
      setType(editingWorkout.type || 'Running');
      setTitle(editingWorkout.title || '');
      setDuration(editingWorkout.durationMinutes || editingWorkout.duration || 45);
      setIntensity(editingWorkout.intensity || 'Medium');
      setCalories(editingWorkout.caloriesBurned || editingWorkout.calories || 350);
      setDate(editingWorkout.workoutDate || editingWorkout.date || new Date().toISOString().split('T')[0]);
      setNotes(editingWorkout.notes || '');
      try {
        if (editingWorkout.exercisesJson) {
          setExercises(JSON.parse(editingWorkout.exercisesJson));
        } else {
          setExercises(editingWorkout.exercises || []);
        }
      } catch {
        setExercises([]);
      }
    } else {
      setType('Running');
      setTitle('');
      setDuration(45);
      setIntensity('Medium');
      setDate(new Date().toISOString().split('T')[0]);
      setNotes('');
      setExercises([]);
    }
  }, [editingWorkout, isOpen]);

  const handleAddExercise = () => {
    if (!newExName.trim()) return;
    setExercises(prev => [
      ...prev,
      {
        name: newExName.trim(),
        sets: Number(newExSets) || 3,
        reps: newExReps || '10'
      }
    ]);
    setNewExName('');
  };

  const handleRemoveExercise = (idx) => {
    setExercises(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const workoutPayload = {
        type,
        title: title.trim() || `${type} Session`,
        durationMinutes: Number(duration),
        intensity,
        caloriesBurned: Number(calories),
        workoutDate: date,
        notes: notes.trim(),
        exercisesJson: exercises.length > 0 ? JSON.stringify(exercises) : ''
      };

      if (editingWorkout) {
        await updateWorkout(editingWorkout.id, workoutPayload);
      } else {
        await logWorkout(workoutPayload);
      }

      onClose();
    } catch {
      // toast shown in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingWorkout ? 'Edit Workout Session' : 'Record New Workout'}
      subtitle="Log your training metrics, intensity level, and performance notes"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-slate-100">
        {/* Workout Title */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
            Session Title
          </label>
          <input
            type="text"
            placeholder={`e.g. Morning 10K Tempo Run`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Type Selection Grid */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Discipline Type *
          </label>
          <div className="grid grid-cols-4 gap-2">
            {workoutTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                  type === t
                    ? 'bg-lime-500/15 border-lime-500 text-lime-400 shadow-sm shadow-lime-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Slider & Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-lime-400" />
              Duration (minutes)
            </label>
            <span className="text-xs font-mono font-bold text-lime-400">{duration} min</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="5"
              max="180"
              step="5"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-lime-500 bg-slate-950 cursor-pointer h-2 rounded-lg"
            />
            <input
              type="number"
              min="1"
              max="300"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-16 bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-xs text-white text-center font-mono focus:border-lime-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Intensity Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Intensity Level
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['Low', 'Medium', 'High', 'Extreme'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setIntensity(lvl)}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                  intensity === lvl
                    ? lvl === 'Extreme'
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                      : lvl === 'High'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : 'bg-lime-500/20 border-lime-500 text-lime-400'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Calories Burned & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-lime-400" />
              Calories Burned (kcal)
            </label>
            <input
              type="number"
              required
              min="0"
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-4 py-2.5 text-sm text-lime-400 font-mono font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Workout Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Exercises Breakdown Builder */}
        <div className="pt-2 border-t border-slate-800">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
            <Dumbbell className="w-3.5 h-3.5 text-lime-400" />
            Exercises & Sets (Optional)
          </label>

          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Exercise name (e.g. Barbell Squats)"
              value={newExName}
              onChange={(e) => setNewExName(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-lime-500"
            />
            <input
              type="number"
              placeholder="Sets"
              value={newExSets}
              onChange={(e) => setNewExSets(e.target.value)}
              className="w-14 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white text-center focus:outline-none focus:border-lime-500"
            />
            <input
              type="text"
              placeholder="Reps"
              value={newExReps}
              onChange={(e) => setNewExReps(e.target.value)}
              className="w-16 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white text-center focus:outline-none focus:border-lime-500"
            />
            <button
              type="button"
              onClick={handleAddExercise}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-lime-400 rounded-lg text-xs"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {exercises.length > 0 && (
            <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
              {exercises.map((ex, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <span className="font-semibold text-slate-200">{ex.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-mono">{ex.sets} sets × {ex.reps} reps</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveExercise(idx)}
                      className="text-slate-500 hover:text-rose-400 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
            Performance Notes
          </label>
          <textarea
            rows="2"
            placeholder="Add subjective feelings, pace, equipment, or recovery notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs shadow-lg shadow-lime-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center gap-1.5"
          >
            <Activity className="w-4 h-4 stroke-[2.5]" />
            <span>{isSubmitting ? 'Saving...' : editingWorkout ? 'Update Workout' : 'Log Workout (+50 pts)'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
