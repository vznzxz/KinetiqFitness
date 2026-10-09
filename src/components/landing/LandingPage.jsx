import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AuthModal } from '../common/AuthModal';
import {
  Activity,
  Flame,
  Shield,
  Zap,
  TrendingUp,
  Award,
  ChevronRight,
  Database,
  Lock,
  ArrowRight,
  Target,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Users
} from 'lucide-react';

export const LandingPage = ({ onEnterApp }) => {
  const { login, backendOnline } = useApp();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [quickLoading, setQuickLoading] = useState(null);

  const handleQuickLogin = async (email, pass, roleLabel) => {
    setQuickLoading(roleLabel);
    try {
      await login(email, pass);
      if (onEnterApp) onEnterApp();
    } catch {
      // toast shown in context
    } finally {
      setQuickLoading(null);
    }
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090d14] text-slate-100 flex flex-col font-sans selection:bg-lime-400 selection:text-slate-950">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center shadow-lg shadow-lime-500/10">
              <Activity className="w-6 h-6 text-lime-400" />
            </div>
            <div>
              <span className="text-xl font-black tracking-wider text-white">
                KINETI<span className="text-lime-400">Q</span>
              </span>
              <span className="ml-2 text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-lime-500/10 text-lime-400 border border-lime-500/20">
                PRO
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
              <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-lime-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span>{backendOnline ? 'Spring Boot 3 API Connected' : 'Local Demo Mode Active'}</span>
            </div>

            <button
              onClick={() => openAuth('login')}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-900 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => openAuth('register')}
              className="px-4 py-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-lime-500/20 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-lime-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-lime-500/30 text-lime-400 text-xs font-semibold mb-6 shadow-md shadow-lime-500/10">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            <span>Next-Generation Athletic Intelligence Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Crush Your Limits. <br />
            <span className="bg-gradient-to-r from-white via-lime-200 to-lime-400 bg-clip-text text-transparent">
              Track Every Rep.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            High-performance workout logging, real-time biometric goals, competitive arena challenges, and admin governance. Powered by Java 21 Spring Boot, MySQL, React, and Tailwind CSS.
          </p>

          {/* Quick Demo Test Bar */}
          <div className="mt-10 max-w-xl mx-auto p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-lime-400" /> Instant 1-Click Launch:
              </span>
              <span className="text-[11px] text-slate-500">No registration required for testing</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleQuickLogin('alex@kinetiq.fit', 'user123', 'athlete')}
                disabled={quickLoading !== null}
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-700/80 hover:border-lime-500/50 text-left transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-lime-500/10 text-lime-400 flex items-center justify-center font-bold text-xs">
                      A
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-lime-400 transition">
                        Athlete Console
                      </div>
                      <div className="text-[10px] text-slate-400">alex@kinetiq.fit</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-lime-400 group-hover:translate-x-0.5 transition" />
                </div>
              </button>

              <button
                onClick={() => handleQuickLogin('admin@kinetiq.fit', 'admin123', 'admin')}
                disabled={quickLoading !== null}
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-700/80 hover:border-lime-500/50 text-left transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-lime-400 transition">
                        Admin Dashboard
                      </div>
                      <div className="text-[10px] text-slate-400">admin@kinetiq.fit</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-lime-400 group-hover:translate-x-0.5 transition" />
                </div>
              </button>
            </div>
          </div>

          {/* Primary CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openAuth('register')}
              className="px-6 py-3 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-sm transition shadow-xl shadow-lime-500/25 flex items-center gap-2"
            >
              <span>Create Athlete Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => openAuth('login')}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-semibold text-sm transition"
            >
              Sign In with Existing Account
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-16 bg-slate-950/60 border-t border-slate-800/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Engineered for Serious Progression
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Everything required to log, analyze, compete, and optimize physical conditioning in one unified stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-lime-500/40 transition group">
              <div className="w-12 h-12 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-lime-400 transition">
                Workout Logging
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Log Running, Cycling, HIIT, Weightlifting, and Yoga. Automatic calorie estimation algorithm and custom exercise tracking.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-lime-500/40 transition group">
              <div className="w-12 h-12 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-lime-400 transition">
                Goals & Biometrics
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Set weekly volume targets, track weight trajectory over time, calculate BMI, and view historical progress charts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-lime-500/40 transition group">
              <div className="w-12 h-12 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-lime-400 transition">
                Challenges & Arena
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enroll in 30-day streaks and endurance runs. Daily check-in system, badges earned, and leaderboard point rewards.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-lime-500/40 transition group">
              <div className="w-12 h-12 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-lime-400 transition">
                Admin Governance
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated role-protected console to manage athletes, moderate submitted guides, configure challenges, and inspect audit logs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Specs */}
      <section className="py-12 bg-[#090d14] border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800/80">
            <h3 className="text-xs font-bold text-lime-400 uppercase tracking-widest text-center mb-6">
              Full-Stack Architecture Specifications
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-lg font-bold text-white">Java 21 + Spring Boot 3</div>
                <div className="text-xs text-slate-400 mt-1">REST APIs & Security 6</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">MySQL 8.0 Persistence</div>
                <div className="text-xs text-slate-400 mt-1">JPA, Hibernate & Migrations</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">React 19 & Tailwind 4</div>
                <div className="text-xs text-slate-400 mt-1">Vite + Dark Charcoal UI</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">Stateless JWT Auth</div>
                <div className="text-xs text-slate-400 mt-1">BCrypt & Role Authorization</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-lime-500 text-slate-950 flex items-center justify-center font-black text-[10px]">
              K
            </div>
            <span className="font-bold text-slate-300">Kinetiq Fitness</span>
            <span>—</span>
            <span>Precision Performance & Workout Tracking Platform</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span>Built with Spring Boot & React</span>
            <span>•</span>
            <span className="text-lime-400 font-mono">v1.0.0</span>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};
