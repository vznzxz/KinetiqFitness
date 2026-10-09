import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Mail,
  Lock,
  Target,
  Activity,
  Scale,
  Flame,
  Save,
  CheckCircle2,
  Shield,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';

export const UserProfileForm = () => {
  const { currentUser, updateUserProfile } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('Intermediate');
  const [primaryGoal, setPrimaryGoal] = useState('General Fitness');
  const [height, setHeight] = useState('178');
  const [currentWeight, setCurrentWeight] = useState('75.0');
  const [targetWeight, setTargetWeight] = useState('70.0');
  const [bio, setBio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setAvatar(currentUser.avatar || '');
      setFitnessLevel(currentUser.fitnessLevel || 'Intermediate');
      setPrimaryGoal(currentUser.primaryGoal || currentUser.fitnessGoal || 'General Fitness');
      setHeight(String(currentUser.height || 178));
      setCurrentWeight(String(currentUser.currentWeight || currentUser.weight || 75.0));
      setTargetWeight(String(currentUser.targetWeight || 70.0));
      setBio(currentUser.bio || '');
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateUserProfile({
        name: name.trim(),
        fitnessLevel,
        primaryGoal,
        height: Number(height),
        currentWeight: Number(currentWeight),
        targetWeight: Number(targetWeight),
        bio: bio.trim(),
        avatar: avatar.trim()
      });
    } catch {
      // toast shown in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-lime-500 to-lime-300 text-slate-950 flex items-center justify-center font-black text-2xl shadow-xl shadow-lime-500/20 shrink-0">
          {name ? name.charAt(0).toUpperCase() : 'A'}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-white m-0">{name || 'Athlete'}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-lime-500/15 text-lime-400 border border-lime-500/30 w-fit mx-auto sm:mx-0">
              {currentUser?.role === 'ROLE_ADMIN' || currentUser?.role === 'Admin' ? 'Administrator' : 'Athlete'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            {email}
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-3 mt-3 text-xs">
            <span className="font-semibold text-lime-400 font-mono">
              {currentUser?.streakDays || 14} Day Streak
            </span>
            <span>•</span>
            <span className="text-white font-mono font-bold">
              {currentUser?.points || 1450} Points
            </span>
            <span>•</span>
            <span className="text-slate-400">
              Level: <strong className="text-slate-200">{fitnessLevel}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Profile & Biometric Edit Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-lime-400" />
            Personal & Biometric Information
          </h3>
          <p className="text-xs text-slate-400">Update your biometric baselines and profile attributes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              disabled
              value={email}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Fitness Level</label>
            <select
              value={fitnessLevel}
              onChange={(e) => setFitnessLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Primary Goal</label>
            <select
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
            >
              <option value="General Fitness">General Fitness</option>
              <option value="Muscle Gain & Conditioning">Muscle Gain & Conditioning</option>
              <option value="Fat Loss">Fat Loss</option>
              <option value="Endurance">Endurance</option>
              <option value="Marathon Training">Marathon Training</option>
            </select>
          </div>
        </div>

        {/* Biometrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Current Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono text-center focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Target Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono text-center focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono text-center focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Athlete Bio / Philosophy</label>
          <textarea
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Share your background, sport disciplines, current PRs, or training philosophy..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-sm shadow-lg shadow-lime-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
