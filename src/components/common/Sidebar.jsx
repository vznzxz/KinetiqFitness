import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  Flame,
  Target,
  Award,
  BookOpen,
  User,
  Shield,
  Users,
  CheckSquare,
  Settings,
  History,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BarChart3,
  X
} from 'lucide-react';

export const Sidebar = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  onCloseMobile,
  collapsed,
  setCollapsed
}) => {
  const { currentUser, logout, isAdmin, backendOnline } = useApp();

  const athleteNav = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'workouts', label: 'Workout Log', icon: Flame },
    { id: 'goals', label: 'Goals & Metrics', icon: Target },
    { id: 'challenges', label: 'Arena & Challenges', icon: Award },
    { id: 'guidance', label: 'Training Intel', icon: BookOpen },
    { id: 'profile', label: 'My Profile', icon: User }
  ];

  const adminNav = [
    { id: 'admin-overview', label: 'Platform Overview', icon: BarChart3 },
    { id: 'admin-users', label: 'Athlete Roster', icon: Users },
    { id: 'admin-content', label: 'Content Approval', icon: CheckSquare },
    { id: 'admin-challenges', label: 'Challenge Operations', icon: Award },
    { id: 'admin-settings', label: 'System Settings', icon: Settings },
    { id: 'admin-activity', label: 'Audit Trail', icon: History }
  ];

  const currentNav = isAdmin ? adminNav : athleteNav;

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-slate-950 border-r border-slate-800/80 transition-all duration-300 ease-in-out
          ${isOpenMobile ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'lg:w-20' : 'lg:w-64'}
        `}
      >
        {/* Header / Brand */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center shrink-0 shadow-md shadow-lime-500/10">
              <Activity className="w-5 h-5 text-lime-400" />
            </div>
            {(!collapsed || isOpenMobile) && (
              <div className="flex flex-col">
                <span className="text-base font-black tracking-wider text-white">
                  KINETI<span className="text-lime-400">Q</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider font-mono uppercase">
                  {isAdmin ? 'Admin Console' : 'Performance'}
                </span>
              </div>
            )}
          </div>

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile close */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Backend Connectivity Status Pill */}
        {(!collapsed || isOpenMobile) && (
          <div className="mx-3 mt-3 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-lime-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span className="text-slate-300 font-medium">{backendOnline ? 'Spring Boot 3 API' : 'Local Storage Mode'}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {backendOnline ? 'MySQL' : 'Demo'}
            </span>
          </div>
        )}

        {/* Navigation List */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className={`px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 ${collapsed && !isOpenMobile ? 'text-center' : ''}`}>
            {(!collapsed || isOpenMobile) ? (isAdmin ? 'Administration' : 'Athlete Portal') : '•••'}
          </div>

          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-lime-500/10 text-lime-400 border border-lime-500/30 shadow-md shadow-lime-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
                title={collapsed && !isOpenMobile ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 transition ${isActive ? 'text-lime-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                {(!collapsed || isOpenMobile) && (
                  <span className="truncate">{item.label}</span>
                )}
                {isActive && (!collapsed || isOpenMobile) && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-lime-400"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
          <div className={`flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 ${collapsed && !isOpenMobile ? 'justify-center p-1.5' : ''}`}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-lime-500 to-lime-300 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 shadow-md shadow-lime-500/15">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            {(!collapsed || isOpenMobile) && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate">{currentUser?.name || 'Athlete'}</div>
                <div className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400"></span>
                  <span>{currentUser?.role === 'ROLE_ADMIN' || currentUser?.role === 'Admin' ? 'Admin' : 'Athlete'}</span>
                </div>
              </div>
            )}
            {(!collapsed || isOpenMobile) && (
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
