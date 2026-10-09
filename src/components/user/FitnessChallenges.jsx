import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Users,
  Calendar,
  Award,
  CheckCircle2,
  Zap,
  Flame,
  ArrowRight,
  Clock,
  Sparkles,
  History,
  TrendingUp,
  Shield,
  Heart
} from 'lucide-react';

export const FitnessChallenges = () => {
  const { challenges, challengeHistory, joinChallenge, checkInChallenge } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('active'); // 'active' | 'history'
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredChallenges = challenges.filter(c => {
    return selectedCategory === 'All' || (c.category || '').toLowerCase() === selectedCategory.toLowerCase();
  });

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'shield': return <Shield className="w-5 h-5 text-purple-400" />;
      case 'heart': return <Heart className="w-5 h-5 text-rose-400" />;
      default: return <Flame className="w-5 h-5 text-lime-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Sub Tabs: Active Challenges vs Challenge History */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-lime-400" />
            Fitness Arena & Challenges
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Participate in structured training quests, maintain accountability, and unlock achievements
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex p-1 bg-slate-950 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveSubTab('active')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'active'
                  ? 'bg-lime-500 text-slate-950 font-bold shadow-md shadow-lime-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Active Arena ({challenges.length})
            </button>
            <button
              onClick={() => setActiveSubTab('history')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'history'
                  ? 'bg-lime-500 text-slate-950 font-bold shadow-md shadow-lime-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              History & Badges ({challengeHistory.length})
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'active' ? (
        <>
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-slate-400 font-medium">Category:</span>
            {['All', 'Consistency', 'Cardio', 'Strength', 'Endurance'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-medium border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-lime-400 border-lime-500/40 font-bold'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredChallenges.map(challenge => {
              const isJoined = challenge.userStatus === 'Joined' || challenge.userStatus === 'JOINED';
              const isCompleted = challenge.userStatus === 'Completed' || challenge.userStatus === 'COMPLETED';
              const progress = challenge.userProgress || 0;
              const total = challenge.totalDays || 30;
              const progressPct = Math.min(100, Math.round((progress / total) * 100));

              return (
                <div
                  key={challenge.id}
                  className={`p-6 rounded-3xl bg-slate-900/80 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    isJoined
                      ? 'border-lime-500/40 shadow-xl shadow-lime-950/20 ring-1 ring-lime-500/20'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Top Meta Bar */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                          {getIcon(challenge.icon)}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-lime-400 tracking-wide uppercase">
                            {challenge.category}
                          </span>
                          <h3 className="text-lg font-bold text-white group-hover:text-lime-300 transition-colors">
                            {challenge.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          +{challenge.rewardPoints} Pts
                        </span>
                        <span className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {challenge.participantsCount || 0} Joined
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {challenge.description}
                    </p>

                    {/* Badge Reward Preview */}
                    <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 mb-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-lime-500/10 text-lime-400 flex items-center justify-center font-bold">
                        <Award className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <div className="font-semibold text-white">Reward Badge: {challenge.rewardBadge}</div>
                        <div className="text-[10px] text-slate-400">Awarded automatically upon milestone completion</div>
                      </div>
                    </div>

                    {/* Progress Bar (if joined or completed) */}
                    {(isJoined || isCompleted) && (
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 flex items-center gap-1">
                            Progress ({progress} / {total} {challenge.unit})
                          </span>
                          <span className="font-bold text-lime-400 font-mono">
                            {progressPct}%
                          </span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-lime-600 to-lime-400 rounded-full transition-all duration-500"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    {isCompleted ? (
                      <div className="w-full py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Completed • Badge & {challenge.rewardPoints} Pts Earned!</span>
                      </div>
                    ) : isJoined ? (
                      <div className="w-full flex items-center gap-2">
                        <span className="text-xs font-semibold text-lime-400 flex items-center gap-1.5 flex-1">
                          <CheckCircle2 className="w-4 h-4 text-lime-400" />
                          <span>Active Member</span>
                        </span>
                        <button
                          onClick={() => checkInChallenge(challenge.id, 1)}
                          className="px-4 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md shadow-lime-500/20 shrink-0 flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Check In (+1)</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => joinChallenge(challenge.id)}
                        className="w-full py-2.5 px-4 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-lime-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <span>Join Challenge</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Challenge History Tab */
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <History className="w-5 h-5 text-lime-400" />
            <div>
              <h3 className="text-base font-bold text-white">Completed Quest Archive</h3>
              <p className="text-xs text-slate-400">Past challenges you conquered and rewarded achievements</p>
            </div>
          </div>

          {challengeHistory.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No completed challenges yet. Check into your active challenges to complete your first quest!
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80">
              {challengeHistory.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.challengeTitle || item.challenge?.title || 'Fitness Challenge'}</h4>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="text-lime-400 font-semibold">{item.badgeEarned || item.challenge?.rewardBadge}</span>
                        <span>•</span>
                        <span>Completed {item.completedDate}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    +{item.pointsAwarded || item.challenge?.rewardPoints || 500} Pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
