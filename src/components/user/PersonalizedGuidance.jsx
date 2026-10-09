import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  BookOpen,
  Send,
  CheckCircle,
  ThumbsUp,
  Clock,
  User,
  Tag,
  ArrowRight,
  Filter,
  Plus,
  Droplets,
  Flame,
  Activity,
  Heart,
  Scale
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const PersonalizedGuidance = () => {
  const { fitnessContent, submitFitnessContent, likeFitnessContent, currentUser, workouts } = useApp();

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New submission state
  const [subTitle, setSubTitle] = useState('');
  const [subCategory, setSubCategory] = useState('Workout Plan');
  const [subContent, setSubContent] = useState('');
  const [subTags, setSubTags] = useState('Fitness, Performance');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter approved articles
  const approvedArticles = fitnessContent.filter(c => (c.status || '').toUpperCase() === 'APPROVED');

  const filteredArticles = approvedArticles.filter(c => {
    return activeCategory === 'All' || c.category === activeCategory;
  });

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    if (!subTitle.trim() || !subContent.trim()) return;

    setIsSubmitting(true);
    try {
      await submitFitnessContent({
        title: subTitle.trim(),
        category: subCategory,
        content: subContent.trim(),
        readTime: '5 min',
        tags: subTags
      });

      setSubTitle('');
      setSubContent('');
      setIsSubmitModalOpen(false);
    } catch {
      // toast shown in context
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate personalized recommendation based on user's recent workout
  const latestWorkout = workouts.length > 0 ? workouts[0] : null;
  const getRecommendation = () => {
    if (!latestWorkout) {
      return {
        headline: "Kickstart Your Fitness Journey",
        body: "Begin with a moderate 30-minute cardio or mobility session to prime your muscles and establish your baseline heart rate.",
        suggestedWorkout: "30-min Zone 2 Brisk Walk / Light Jog",
        focus: "Aerobic Base"
      };
    }
    const intensity = (latestWorkout.intensity || '').toLowerCase();
    if (intensity === 'extreme' || intensity === 'high') {
      return {
        headline: "Active Recovery & Mobility Focus",
        body: `You completed a high-intensity ${latestWorkout.type} session recently (${latestWorkout.durationMinutes || latestWorkout.duration} mins, ${latestWorkout.caloriesBurned || latestWorkout.calories} kcal). Today, focus on myofascial release, hydration, and light stretching to prevent DOMS.`,
        suggestedWorkout: "25-min Decompression Yoga & Hip Mobility",
        focus: "Recovery & CNS Restoration"
      };
    }
    return {
      headline: "Progressive Overload Window",
      body: `Your body is well-rested following your ${latestWorkout.type} workout. Today is the optimal time to introduce progressive overload in strength or tempo intervals.`,
      suggestedWorkout: "45-min Compound Hypertrophy or Interval Sprints",
      focus: "Hypertrophy & Power"
    };
  };

  const rec = getRecommendation();

  // Daily Water Intake Calculation: ~35ml per kg + 500ml per 45 min training
  const userWeight = currentUser?.currentWeight || 75.0;
  const baseWaterL = ((userWeight * 35) / 1000).toFixed(1);
  const trainingWaterL = (Number(baseWaterL) + 0.6).toFixed(1);

  // Macro Recommendation Calculator
  const macroCal = currentUser?.primaryGoal === 'Fat Loss' ? 2100 : currentUser?.primaryGoal === 'Muscle Gain' ? 2800 : 2500;
  const proteinG = Math.round(userWeight * 2.0);
  const fatsG = Math.round((macroCal * 0.25) / 9);
  const carbsG = Math.round((macroCal - (proteinG * 4) - (fatsG * 9)) / 4);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Personalized Recommendation Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-lime-500/10 text-lime-400 border border-lime-500/20 font-mono">
                  {rec.focus}
                </span>
                <span className="text-xs text-slate-400">Tailored to your conditioning</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {rec.headline}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {rec.body}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-lime-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <Activity className="w-3.5 h-3.5" />
                <span>Suggested Routine: {rec.suggestedWorkout}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-lime-500/20 flex items-center gap-1.5 shrink-0 self-start md:self-center"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Submit Guide</span>
          </button>
        </div>
      </div>

      {/* Hydration & Macro Calculators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hydration Engine */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400" />
                Hydration Protocol Target
              </h3>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                {trainingWaterL} L / Day
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Computed based on your {userWeight} kg weight and athletic perspiration rates.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Rest Day Baseline</span>
                <span className="text-lg font-bold text-white mt-1 block">{baseWaterL} Liters</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Training Day Target</span>
                <span className="text-lg font-bold text-cyan-400 mt-1 block">{trainingWaterL} Liters</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-4">
            Drink 500ml 1 hour prior to strenuous sessions, with electrolytes added on high sweat days.
          </p>
        </div>

        {/* Macro Fuel Engine */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-lime-400" />
                Macronutrient Fuel Target
              </h3>
              <span className="text-xs font-mono font-bold text-lime-400 bg-lime-500/10 px-2.5 py-0.5 rounded-md border border-lime-500/20">
                {macroCal} kcal / Day
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Calculated for goal: <strong className="text-white">{currentUser?.primaryGoal || 'Athletic Conditioning'}</strong>
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Protein</span>
                <span className="text-base font-extrabold text-lime-400 mt-1 block">{proteinG}g</span>
                <span className="text-[10px] text-slate-500">2.0g / kg</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Carbs</span>
                <span className="text-base font-extrabold text-amber-400 mt-1 block">{carbsG}g</span>
                <span className="text-[10px] text-slate-500">Glycogen</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Fats</span>
                <span className="text-base font-extrabold text-cyan-400 mt-1 block">{fatsG}g</span>
                <span className="text-[10px] text-slate-500">Hormonal</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-4">
            Distribute protein across 4 distinct feedings with ~3g leucine per bolus.
          </p>
        </div>
      </div>

      {/* Community Knowledge Base & Articles Feed */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-lime-400" />
              Community Protocols & Training Intel
            </h3>
            <p className="text-xs text-slate-400">Peer-reviewed fitness protocols from certified athletes and leads</p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {['All', 'Endurance', 'Nutrition', 'Strength', 'Recovery'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-colors ${
                  activeCategory === cat
                    ? 'bg-lime-500 text-slate-950 font-bold border-lime-400'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-lime-500/40 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-lime-400 bg-lime-500/10 px-2 py-0.5 rounded border border-lime-500/20">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {article.readTime || '5 min'}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-lime-400 transition mb-2">
                  {article.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {article.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">
                  By {article.author?.name || article.authorName || 'Kinetiq Athlete'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => likeFitnessContent(article.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-lime-400 border border-slate-800 transition"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{article.likes || 0}</span>
                  </button>
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="text-lime-400 hover:text-lime-300 font-bold flex items-center gap-1 text-[11px]"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail View Modal */}
      <Modal
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        title={selectedArticle?.title || 'Article Protocol'}
        subtitle={`Category: ${selectedArticle?.category} • ${selectedArticle?.readTime || '5 min'} read`}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4 text-slate-200 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 whitespace-pre-line text-xs sm:text-sm">
            {selectedArticle?.content}
          </div>
          {selectedArticle?.tags && (
            <div className="flex items-center gap-1.5 flex-wrap pt-2">
              <Tag className="w-3.5 h-3.5 text-lime-400" />
              <span className="text-xs text-slate-400">{selectedArticle.tags}</span>
            </div>
          )}
          <div className="flex justify-end pt-3 border-t border-slate-800">
            <button
              onClick={() => setSelectedArticle(null)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-white font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Submit Article Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Training Guide or Article"
        subtitle="Share evidence-based training methods with the Kinetiq community"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleArticleSubmit} className="space-y-4 text-slate-100">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Article Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Zone 2 Cardio: Aerobic Base Engine"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Category</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="Workout Plan">Workout Plan</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Recovery">Recovery</option>
              <option value="Endurance">Endurance</option>
              <option value="Strength">Strength</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Protocol Content *</label>
            <textarea
              rows="5"
              required
              placeholder="Write your actionable instructions, science background, sets, reps, or dietary protocol..."
              value={subContent}
              onChange={(e) => setSubContent(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Keywords / Tags</label>
            <input
              type="text"
              placeholder="Cardio, Zone 2, Recovery"
              value={subTags}
              onChange={(e) => setSubTags(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-lime-500/20 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Protocol'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
