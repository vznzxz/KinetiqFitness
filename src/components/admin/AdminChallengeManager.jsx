import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  Plus,
  Trash2,
  Calendar,
  Users,
  Flame,
  Zap,
  Shield,
  Heart,
  CheckCircle2,
  Clock,
  Target
} from 'lucide-react';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const AdminChallengeManager = () => {
  const { challenges, createChallenge, deleteChallenge } = useApp();

  const [isCreating, setIsCreating] = useState(false);
  const [challengeToDelete, setChallengeToDelete] = useState(null);

  // New challenge form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Consistency');
  const [targetValue, setTargetValue] = useState(30);
  const [unit, setUnit] = useState('days');
  const [totalDays, setTotalDays] = useState(30);
  const [rewardBadge, setRewardBadge] = useState('Discipline Master');
  const [rewardPoints, setRewardPoints] = useState(500);
  const [icon, setIcon] = useState('flame');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await createChallenge({
        title: title.trim(),
        description: description.trim(),
        category,
        targetValue: Number(targetValue),
        unit,
        totalDays: Number(totalDays),
        rewardBadge: rewardBadge.trim(),
        rewardPoints: Number(rewardPoints),
        icon
      });
      // Reset
      setTitle('');
      setDescription('');
      setIsCreating(false);
    } catch {
      // toast shown in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!challengeToDelete) return;
    await deleteChallenge(challengeToDelete.id);
    setChallengeToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-lime-400" />
            Fitness Challenge Operations & Arena
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Create community training quests, set milestones, configure badge rewards, and monitor participation.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-lime-500/20 flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>{isCreating ? 'Cancel Creation' : 'Launch New Challenge'}</span>
        </button>
      </div>

      {/* Creation Form Panel (Expandable) */}
      {isCreating && (
        <form
          onSubmit={handleCreateSubmit}
          className="p-6 rounded-2xl bg-slate-950 border border-lime-500/30 shadow-2xl space-y-4 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-lime-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4" /> Challenge Configuration
            </h3>
            <span className="text-xs text-slate-400">All fields will be synced to database</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Challenge Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. 30-Day Shred & Tone"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-lime-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Discipline Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-lime-500"
              >
                <option value="Consistency">Consistency</option>
                <option value="Cardio">Cardio</option>
                <option value="Strength">Strength</option>
                <option value="Endurance">Endurance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Description & Rules</label>
            <textarea
              rows={2}
              placeholder="Detailed rules, session criteria, and athlete instructions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-lime-500"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Target Value</label>
              <input
                type="number"
                required
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-lime-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Metric Unit</label>
              <input
                type="text"
                required
                placeholder="days / km / reps"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-lime-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Total Days Duration</label>
              <input
                type="number"
                required
                value={totalDays}
                onChange={(e) => setTotalDays(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-lime-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Reward Points</label>
              <input
                type="number"
                required
                value={rewardPoints}
                onChange={(e) => setRewardPoints(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-lime-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Reward Badge Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Centurion Runner"
                value={rewardBadge}
                onChange={(e) => setRewardBadge(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-lime-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Icon Representation</label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-lime-500"
              >
                <option value="flame">Flame (Intensity)</option>
                <option value="zap">Zap (Speed & Cardio)</option>
                <option value="shield">Shield (Strength)</option>
                <option value="heart">Heart (Endurance & Health)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs transition disabled:opacity-50 flex items-center gap-1.5"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Challenge'}
            </button>
          </div>
        </form>
      )}

      {/* Challenges Roster Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Active Platform Challenges ({challenges.length})
          </span>
          <span className="text-xs text-slate-400">Total Enrolled Participants: {challenges.reduce((acc, c) => acc + (c.participantsCount || 0), 0)}</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {challenges.map((ch) => (
            <div key={ch.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-950/40 transition group">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center font-bold text-sm shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white group-hover:text-lime-400 transition">
                      {ch.title}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {ch.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    {ch.description || 'No description provided.'}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                    <span className="text-lime-400 font-semibold">{ch.targetValue} {ch.unit}</span>
                    <span>•</span>
                    <span>{ch.totalDays} Days duration</span>
                    <span>•</span>
                    <span className="text-amber-400 font-medium">+{ch.rewardPoints} Pts</span>
                    <span>•</span>
                    <span>Badge: <strong className="text-slate-300">{ch.rewardBadge}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <div className="text-right text-xs text-slate-400 hidden sm:block">
                  <div className="font-bold text-white">{ch.participantsCount || 0}</div>
                  <div className="text-[10px]">Athletes Enrolled</div>
                </div>
                <button
                  onClick={() => setChallengeToDelete(ch)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 transition"
                  title="Delete Challenge"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!challengeToDelete}
        onClose={() => setChallengeToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Fitness Challenge"
        message={`Are you sure you want to remove "${challengeToDelete?.title}" from the platform? Athletes enrolled will no longer see this challenge.`}
        confirmText="Delete Challenge"
        danger
      />
    </div>
  );
};
