import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { User, Mail, Shield, Target, Plus, Lock } from 'lucide-react';

export const AddUserModal = ({ isOpen, onClose }) => {
  const { register, showToast, loadAdminData } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('athlete123');
  const [role, setRole] = useState('ROLE_USER');
  const [status, setStatus] = useState('ACTIVE');
  const [fitnessLevel, setFitnessLevel] = useState('Intermediate');
  const [weight, setWeight] = useState('72.0');
  const [targetWeight, setTargetWeight] = useState('68.0');
  const [height, setHeight] = useState('175.0');
  const [primaryGoal, setPrimaryGoal] = useState('General Fitness');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password: password || 'athlete123',
        fitnessLevel,
        currentWeight: Number(weight),
        targetWeight: Number(targetWeight),
        height: Number(height),
        primaryGoal
      });
      if (loadAdminData) await loadAdminData();
      showToast(`Athlete ${name} registered successfully!`, 'success', 'User Created');

      // Reset and close
      setName('');
      setEmail('');
      setPassword('athlete123');
      onClose();
    } catch {
      // Toast displayed in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Athlete Profile"
      subtitle="Provision a member account with baseline biometrics and credentials"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-slate-100">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jordan Matthews"
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jordan@kinetiq.fit"
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
            Default Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Fitness Level
            </label>
            <select
              value={fitnessLevel}
              onChange={(e) => setFitnessLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Primary Goal
            </label>
            <select
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="General Fitness">General Fitness</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Fat Loss">Fat Loss</option>
              <option value="Endurance">Endurance</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Weight (kg)</label>
            <input
              type="number"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-xs text-white text-center focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Target (kg)</label>
            <input
              type="number"
              step="0.5"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-xs text-white text-center focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-xs text-white text-center focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs transition shadow-md shadow-lime-500/20 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Account'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
