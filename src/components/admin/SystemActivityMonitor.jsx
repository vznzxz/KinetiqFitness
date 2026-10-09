import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  Flame,
  Shield,
  Trophy,
  FileText,
  Clock,
  Radio,
  Filter,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export const SystemActivityMonitor = () => {
  const { activityLogs, loadAdminData } = useApp();
  const [filterType, setFilterType] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredLogs = activityLogs.filter(log => {
    if (filterType === 'All') return true;
    const cat = (log.category || log.type || '').toLowerCase();
    return cat === filterType.toLowerCase();
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (loadAdminData) await loadAdminData();
    setIsRefreshing(false);
  };

  const getTypeIcon = (cat) => {
    switch ((cat || '').toLowerCase()) {
      case 'workout':
        return <Flame className="w-4 h-4 text-rose-400" />;
      case 'challenge':
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case 'user':
        return <Shield className="w-4 h-4 text-lime-400" />;
      case 'content':
        return <FileText className="w-4 h-4 text-cyan-400" />;
      default:
        return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Radio className="w-4 h-4 text-lime-400 animate-pulse" />
            Real-Time System Activity & Audit Trail
          </h2>
          <p className="text-xs text-slate-400">
            Chronological audit trail of all platform events, user logins, workouts, and challenge check-ins
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Events</option>
              <option value="workout" className="bg-slate-900">Workouts</option>
              <option value="challenge" className="bg-slate-900">Challenges</option>
              <option value="user" className="bg-slate-900">User / Auth</option>
              <option value="system" className="bg-slate-900">System Core</option>
              <option value="content" className="bg-slate-900">Content</option>
            </select>
          </div>

          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
            title="Refresh Logs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Logs Feed Container */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 shadow-xl">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-xs">
            No system audit logs found for selected category.
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredLogs.map((log, idx) => (
              <div
                key={log.id || idx}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start justify-between gap-3 hover:border-slate-700 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                    {getTypeIcon(log.category || log.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{log.action}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {log.category || log.type || 'system'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {log.details}
                    </p>
                    {log.userName && (
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Triggered by: <strong className="text-slate-400">{log.userName}</strong>
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 shrink-0 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-600" />
                  <span>
                    {log.timestamp ? (typeof log.timestamp === 'string' && log.timestamp.includes('T') ? log.timestamp.split('T')[0] : String(log.timestamp)) : 'Just now'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
