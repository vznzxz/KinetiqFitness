import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserManagementTable } from './UserManagementTable';
import { ContentManagementTable } from './ContentManagementTable';
import { SystemSettingsPanel } from './SystemSettingsPanel';
import { FitnessStatistics } from './FitnessStatistics';
import { SystemActivityMonitor } from './SystemActivityMonitor';
import { AdminChallengeManager } from './AdminChallengeManager';
import {
  Shield,
  Users,
  FileText,
  Settings,
  Activity,
  Plus,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Award,
  History
} from 'lucide-react';

export const AdminDashboard = ({
  activeTab,
  setActiveTab,
  onOpenAddUser
}) => {
  const { users, adminContent, fitnessContent, workouts, challenges, currentUser, adminStats } = useApp();

  const allContent = adminContent.length > 0 ? adminContent : fitnessContent;
  const pendingContent = allContent.filter(c => c.status === 'PENDING' || c.status === 'Pending');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Admin Hero Banner (shown on admin-overview) */}
      {activeTab === 'admin-overview' && (
        <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-lime-500 to-lime-300 text-slate-950 flex items-center justify-center shadow-xl shadow-lime-500/20 shrink-0">
                <Shield className="w-9 h-9 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight m-0">
                    Administrator Command Center
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-lime-500/15 text-lime-400 border border-lime-500/30">
                    Platform Lead
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Active Admin: <span className="text-white font-medium">{currentUser?.name || 'Administrator'}</span> ({currentUser?.email || 'admin@kinetiq.fit'})
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-300 flex-wrap">
                  <span>Athletes: <strong className="text-white">{adminStats?.totalUsers || users.length}</strong></span>
                  <span>•</span>
                  <span>Workouts: <strong className="text-white">{adminStats?.totalWorkouts || workouts.length}</strong></span>
                  <span>•</span>
                  <span>Active Challenges: <strong className="text-white">{challenges.length}</strong></span>
                  <span>•</span>
                  <span>Pending Content: <strong className="text-amber-400">{pendingContent.length}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <button
                onClick={onOpenAddUser}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs shadow-lg shadow-lime-500/20 transition-all hover:scale-[1.02]"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Create User</span>
              </button>

              <button
                onClick={() => setActiveTab('admin-content')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Review Content ({pendingContent.length})</span>
              </button>
            </div>
          </div>

          {/* Pending Alerts Strip */}
          {pendingContent.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs bg-amber-500/10 px-4 py-2.5 rounded-xl border border-amber-500/20">
              <span className="text-amber-300 flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                You have {pendingContent.length} user-submitted fitness guide(s) awaiting editorial review.
              </span>
              <button
                onClick={() => setActiveTab('admin-content')}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 underline underline-offset-2 ml-2"
              >
                Review Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Render Active Tab Sub-view */}
      {activeTab === 'admin-overview' && <FitnessStatistics />}

      {activeTab === 'admin-users' && <UserManagementTable onOpenAddUser={onOpenAddUser} />}

      {activeTab === 'admin-content' && <ContentManagementTable />}

      {activeTab === 'admin-challenges' && <AdminChallengeManager />}

      {activeTab === 'admin-settings' && <SystemSettingsPanel />}

      {activeTab === 'admin-activity' && <SystemActivityMonitor />}
    </div>
  );
};
