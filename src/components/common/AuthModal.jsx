import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Shield, User, Mail, Lock, Sparkles, ArrowRight, Activity, Target } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, register } = useApp();
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('Intermediate');
  const [currentWeight, setCurrentWeight] = useState(75.0);
  const [targetWeight, setTargetWeight] = useState(70.0);
  const [height, setHeight] = useState(178.0);
  const [primaryGoal, setPrimaryGoal] = useState('General Fitness');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!email.trim() || !password) {
          throw new Error('Please enter both email and password.');
        }
        await login(email, password);
        onClose();
      } else {
        if (!name.trim() || !email.trim() || !password) {
          throw new Error('Please fill in all required fields.');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long.');
        }
        await register({
          name: name.trim(),
          email: email.trim(),
          password,
          fitnessLevel,
          currentWeight: Number(currentWeight),
          targetWeight: Number(targetWeight),
          height: Number(height),
          primaryGoal
        });
        onClose();
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (fillEmail, fillPass) => {
    setEmail(fillEmail);
    setPassword(fillPass);
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-100">
        {/* Glow ambient */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-lime-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 font-black">
              <Activity className="w-5 h-5 text-lime-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                {mode === 'login' ? 'Sign In to KINETIQ' : 'Create Athlete Profile'}
              </h2>
              <p className="text-xs text-slate-400">
                {mode === 'login' ? 'Access your training metrics & performance log' : 'Begin precision tracking on Kinetiq Platform'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Fill Buttons (when in login mode) */}
        {mode === 'login' && (
          <div className="mt-4 p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-lime-400" /> Demo Credentials Quick-Fill
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('alex@kinetiq.fit', 'user123')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-200 hover:border-lime-500/40 transition flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-lime-400" />
                <span>Alex (Athlete)</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin@kinetiq.fit', 'admin123')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-200 hover:border-lime-500/40 transition flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-lime-400" />
                <span>System Admin</span>
              </button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
            <span className="font-bold">Error:</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-lime-500 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@kinetiq.fit"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-lime-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-lime-500 transition"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Fitness Level</label>
                  <select
                    value={fitnessLevel}
                    onChange={(e) => setFitnessLevel(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-lime-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Primary Goal</label>
                  <select
                    value={primaryGoal}
                    onChange={(e) => setPrimaryGoal(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-lime-500"
                  >
                    <option value="General Fitness">General Fitness</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Fat Loss">Fat Loss</option>
                    <option value="Endurance">Endurance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white text-center focus:outline-none focus:border-lime-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Target (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white text-center focus:outline-none focus:border-lime-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white text-center focus:outline-none focus:border-lime-500"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-lime-500/20 disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <p>
              New to Kinetiq?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMessage('');
                }}
                className="font-semibold text-lime-400 hover:text-lime-300 underline underline-offset-4"
              >
                Create an account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                }}
                className="font-semibold text-lime-400 hover:text-lime-300 underline underline-offset-4"
              >
                Sign in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
