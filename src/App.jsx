import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './components/landing/LandingPage';
import { Sidebar } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/ToastContainer';
import { UserDashboard } from './components/user/UserDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { WorkoutLoggerModal } from './components/user/WorkoutLoggerModal';
import { AddUserModal } from './components/admin/AddUserModal';
import { Activity, Shield, Heart, ExternalLink } from 'lucide-react';

const AppContent = () => {
  const { currentUser, isAdmin, isLoadingAuth, backendOnline } = useApp();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sidebar responsive states
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Modal states
  const [isLogWorkoutOpen, setIsLogWorkoutOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // Auto-switch default tab when user signs in or role changes
  useEffect(() => {
    if (currentUser) {
      const isUserAdmin = currentUser.role === 'ROLE_ADMIN' || currentUser.role === 'Admin';
      if (isUserAdmin && !activeTab.startsWith('admin-') && activeTab !== 'dashboard') {
        setActiveTab('admin-overview');
      } else if (!isUserAdmin && activeTab.startsWith('admin-')) {
        setActiveTab('dashboard');
      }
    }
  }, [currentUser]);

  const handleOpenEditWorkout = (workout) => {
    setEditingWorkout(workout);
    setIsLogWorkoutOpen(true);
  };

  const handleCloseWorkoutModal = () => {
    setIsLogWorkoutOpen(false);
    setEditingWorkout(null);
  };

  // If loading auth state initially
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-[#090d14] flex flex-col items-center justify-center text-slate-400">
        <div className="w-12 h-12 rounded-2xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 mb-4 animate-bounce">
          <Activity className="w-6 h-6 text-lime-400" />
        </div>
        <div className="text-white font-bold tracking-wider text-base">
          KINETI<span className="text-lime-400">Q</span>
        </div>
        <div className="text-xs text-slate-500 mt-1 font-mono">Initializing Telemetry...</div>
      </div>
    );
  }

  // If not logged in, render the modern Landing Page
  if (!currentUser) {
    return (
      <>
        <LandingPage onEnterApp={() => setActiveTab('dashboard')} />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d14] text-slate-100 flex font-sans selection:bg-lime-400 selection:text-slate-950">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isSidebarOpenMobile}
        onCloseMobile={() => setIsSidebarOpenMobile(false)}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Top Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenLogWorkout={() => setIsLogWorkoutOpen(true)}
          onOpenAddUser={() => setIsAddUserOpen(true)}
          onToggleSidebar={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
        />

        {/* View Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isAdmin && activeTab.startsWith('admin-') ? (
            <AdminDashboard
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onOpenAddUser={() => setIsAddUserOpen(true)}
            />
          ) : (
            <UserDashboard
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onOpenLogWorkout={() => setIsLogWorkoutOpen(true)}
              onEditWorkout={handleOpenEditWorkout}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-lime-500 text-slate-950 flex items-center justify-center font-black text-[10px]">
                K
              </div>
              <span className="font-bold text-slate-300">Kinetiq Fitness</span>
              <span>—</span>
              <span>Precision Performance & Workout Tracking Platform</span>
            </div>

            <div className="flex items-center gap-6 text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-lime-400 animate-pulse' : 'bg-amber-400'}`}></span>
                <span className="text-[11px] font-mono text-slate-300">
                  {backendOnline ? 'Spring Boot 3 + MySQL Connected' : 'Local Sandbox Mode'}
                </span>
              </div>
              <span>•</span>
              <span className="text-[11px]">
                Role: <strong className="text-white">{currentUser?.role === 'ROLE_ADMIN' || currentUser?.role === 'Admin' ? 'Admin' : 'Athlete'}</strong>
              </span>
              <span>•</span>
              <span className="text-[11px] font-mono">v1.0.0</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Modals & Floating Notifications */}
      <ToastContainer />

      <WorkoutLoggerModal
        isOpen={isLogWorkoutOpen}
        onClose={handleCloseWorkoutModal}
        editingWorkout={editingWorkout}
      />

      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
