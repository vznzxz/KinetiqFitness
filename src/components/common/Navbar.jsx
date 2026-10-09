import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Plus,
  Flame,
  Shield,
  User,
  LogOut,
  Bell,
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export const Navbar = ({
  activeTab,
  setActiveTab,
  onOpenLogWorkout,
  onOpenAddUser,
  onToggleSidebar
}) => {
  const { currentUser, logout, isAdmin, checkBackendHealth, backendOnline } = useApp();

  const getPageTitle = (tab) => {
    switch (tab) {
      case 'dashboard': return 'Athlete Dashboard';
      case 'workouts': return 'Workout Records & History';
      case 'goals': return 'Biometric Goals & Progress';
      case 'challenges': return 'Fitness Arena & Challenges';
      case 'guidance': return 'Training Intel & Protocols';
      case 'profile': return 'Athlete Biometrics Profile';
      case 'admin-overview': return 'Platform Command Center';
      case 'admin-users': return 'User & Role Management';
      case 'admin-content': return 'Content Approval Queue';
      case 'admin-challenges': return 'Challenge Operations';
      case 'admin-settings': return 'System Parameters';
      case 'admin-activity': return 'Real-Time Audit Trail';
      default: return 'Performance Workspace';
    }
  };

  return (
    <nav className="h-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between">
      {/* Left: Mobile hamburger & Active Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 lg:hidden transition"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>{getPageTitle(activeTab)}</span>
            {isAdmin && (
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-lime-500/10 text-lime-400 border border-lime-500/20 hidden sm:inline-block">
                Admin Mode
              </span>
            )}
          </h1>
          <span className="text-[10px] text-slate-500 hidden sm:block">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Right: Quick Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Backend status refresh button */}
        <button
          onClick={() => checkBackendHealth()}
          title={backendOnline ? 'Spring Boot 3 API Online' : 'Check API Connection'}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 text-xs flex items-center gap-1.5 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="text-[11px] hidden md:inline font-mono">
            {backendOnline ? 'API Active' : 'Retry API'}
          </span>
        </button>

        {/* Quick Log Workout Button */}
        <button
          onClick={onOpenLogWorkout}
          className="px-3 sm:px-4 py-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs transition shadow-md shadow-lime-500/15 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Log Workout</span>
        </button>

        {/* Admin Switch Mode (If user is Admin, they can preview athlete views) */}
        {isAdmin && (
          <button
            onClick={() => {
              if (activeTab.startsWith('admin-')) {
                setActiveTab('dashboard');
              } else {
                setActiveTab('admin-overview');
              }
            }}
            className="px-2.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 hover:text-white transition hidden sm:flex items-center gap-1.5"
            title="Toggle between Admin view and Athlete view"
          >
            <Shield className="w-3.5 h-3.5 text-lime-400" />
            <span>{activeTab.startsWith('admin-') ? 'View as Athlete' : 'View as Admin'}</span>
          </button>
        )}

        {/* User Avatar Chip */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-lime-500 to-lime-300 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md shadow-lime-500/15">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};
