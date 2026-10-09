import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Shield,
  Sliders,
  Database,
  Bell,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Server,
  Activity,
  Zap
} from 'lucide-react';

export const SystemSettingsPanel = () => {
  const { systemSettings, updateSystemSettings } = useApp();

  const [appName, setAppName] = useState('KINETIQ Precision Fitness');
  const [maintenanceMode, setMaintenanceMode] = useState('false');
  const [dailyTip, setDailyTip] = useState('Consistency beats intensity. Master your daily routine.');
  const [registrationAllowed, setRegistrationAllowed] = useState('true');
  const [defaultCalorieTarget, setDefaultCalorieTarget] = useState('2500');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (systemSettings) {
      if (systemSettings.app_name) setAppName(systemSettings.app_name);
      if (systemSettings.maintenance_mode) setMaintenanceMode(systemSettings.maintenance_mode);
      if (systemSettings.daily_tip) setDailyTip(systemSettings.daily_tip);
      if (systemSettings.registration_allowed) setRegistrationAllowed(systemSettings.registration_allowed);
      if (systemSettings.default_calorie_target) setDefaultCalorieTarget(systemSettings.default_calorie_target);
    }
  }, [systemSettings]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSystemSettings({
        app_name: appName,
        maintenance_mode: maintenanceMode,
        daily_tip: dailyTip,
        registration_allowed: registrationAllowed,
        default_calorie_target: defaultCalorieTarget
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-lime-400" />
            System Configuration & Platform Parameters
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure global platform settings, daily motivational prompts, and operational flags
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Platform Display Name
              </label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Default Calorie Target (kcal)
              </label>
              <input
                type="number"
                value={defaultCalorieTarget}
                onChange={(e) => setDefaultCalorieTarget(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
              Daily Athlete Motivational Tip
            </label>
            <textarea
              rows="2"
              value={dailyTip}
              onChange={(e) => setDailyTip(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Maintenance Mode</span>
                <span className="text-[11px] text-slate-400">Restrict access during scheduled upgrades</span>
              </div>
              <select
                value={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-lime-500"
              >
                <option value="false">Disabled (Normal)</option>
                <option value="true">Enabled (Locked)</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">New Registrations</span>
                <span className="text-[11px] text-slate-400">Allow public athlete signups</span>
              </div>
              <select
                value={registrationAllowed}
                onChange={(e) => setRegistrationAllowed(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-lime-500"
              >
                <option value="true">Allowed (Open)</option>
                <option value="false">Closed (Invite Only)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs shadow-lg shadow-lime-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            <Save className="w-4 h-4 stroke-[2.5]" />
            <span>{isSaving ? 'Saving...' : 'Save Configuration'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
