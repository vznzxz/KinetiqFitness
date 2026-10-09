import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  User,
  Tag,
  AlertCircle,
  Plus
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const ContentManagementTable = () => {
  const { fitnessContent, adminContent, approveContent, rejectContent, submitFitnessContent, currentUser } = useApp();

  const allContent = adminContent.length > 0 ? adminContent : fitnessContent;

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Preview & Reject Modals
  const [previewContent, setPreviewContent] = useState(null);
  const [rejectModalItem, setRejectModalItem] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Admin New Content Modal
  const [isNewContentOpen, setIsNewContentOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState('Workout Plan');
  const [newBody, setNewBody] = useState('');
  const [newTags, setNewTags] = useState('Official, Guide');

  const filteredContent = allContent.filter(item => {
    const authorName = item.author?.name || item.author || '';
    const titleMatch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    const authorMatch = authorName.toLowerCase().includes(searchTerm.toLowerCase());
    const contentMatch = (item.content || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || authorMatch || contentMatch;

    const itemStatus = (item.status || 'PENDING').toUpperCase();
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Pending' && itemStatus === 'PENDING') ||
      (statusFilter === 'Approved' && itemStatus === 'APPROVED') ||
      (statusFilter === 'Rejected' && itemStatus === 'REJECTED');

    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleConfirmReject = async (e) => {
    e.preventDefault();
    if (!rejectModalItem) return;
    await rejectContent(rejectModalItem.id);
    setRejectModalItem(null);
    setRejectionReason('');
  };

  const handleAdminPublish = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;

    await submitFitnessContent({
      title: newTitle.trim(),
      category: newCat,
      content: newBody.trim(),
      readTime: '5 min',
      tags: newTags
    });

    setNewTitle('');
    setNewBody('');
    setIsNewContentOpen(false);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search articles by title, author, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Statuses</option>
              <option value="Pending" className="bg-slate-900">Pending Review</option>
              <option value="Approved" className="bg-slate-900">Approved</option>
              <option value="Rejected" className="bg-slate-900">Rejected</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Categories</option>
              <option value="Workout Plan" className="bg-slate-900">Workout Plan</option>
              <option value="Nutrition" className="bg-slate-900">Nutrition</option>
              <option value="Endurance" className="bg-slate-900">Endurance</option>
              <option value="Strength" className="bg-slate-900">Strength</option>
              <option value="Recovery" className="bg-slate-900">Recovery</option>
            </select>
          </div>

          <button
            onClick={() => setIsNewContentOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 rounded-xl text-xs font-bold shadow-md shadow-lime-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Publish Article</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Content Article</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {filteredContent.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 px-4 text-slate-400 text-xs">
                    No articles match current filters.
                  </td>
                </tr>
              ) : (
                filteredContent.map((item) => {
                  const status = (item.status || 'PENDING').toUpperCase();
                  const isApproved = status === 'APPROVED';
                  const isPending = status === 'PENDING';
                  const isRejected = status === 'REJECTED';
                  const authorName = item.author?.name || item.author || 'Athlete';

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Title & Preview */}
                      <td className="py-4 px-4 sm:px-6 max-w-sm">
                        <div className="font-semibold text-white group-hover:text-lime-400 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {item.content}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-slate-950 text-slate-300 border border-slate-800">
                          {item.category}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-300">
                        {authorName}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold border flex items-center gap-1.5 w-fit ${
                          isApproved
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : isPending
                            ? 'bg-amber-500/15 text-amber-400 border-amber-500/30 animate-pulse'
                            : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                        }`}>
                          {status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setPreviewContent(item)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-lime-400 hover:bg-slate-800 transition-colors"
                            title="Preview Content"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => approveContent(item.id)}
                            disabled={isApproved}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isApproved
                                ? 'text-slate-600 cursor-not-allowed'
                                : 'text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10'
                            }`}
                            title={isApproved ? 'Already Approved' : 'Approve Article'}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              setRejectModalItem(item);
                            }}
                            disabled={isRejected}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isRejected
                                ? 'text-slate-600 cursor-not-allowed'
                                : 'text-slate-400 hover:text-rose-400 hover:bg-rose-500/10'
                            }`}
                            title={isRejected ? 'Already Rejected' : 'Reject Article'}
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={!!previewContent}
        onClose={() => setPreviewContent(null)}
        title={previewContent?.title || 'Preview Article'}
        subtitle={`Category: ${previewContent?.category} • Status: ${previewContent?.status}`}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4 text-slate-200 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 whitespace-pre-line leading-relaxed">
            {previewContent?.content}
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              onClick={() => setPreviewContent(null)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-xs text-white"
            >
              Close Preview
            </button>
            {previewContent && (previewContent.status || '').toUpperCase() === 'PENDING' && (
              <button
                onClick={() => {
                  approveContent(previewContent.id);
                  setPreviewContent(null);
                }}
                className="px-5 py-2 rounded-xl bg-lime-500 text-slate-950 font-bold text-xs"
              >
                Approve Article
              </button>
            )}
          </div>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={!!rejectModalItem}
        onClose={() => setRejectModalItem(null)}
        title="Reject Content Submission"
        subtitle="Confirm rejection of submitted article"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleConfirmReject} className="space-y-4">
          <p className="text-xs text-slate-300">
            Are you sure you want to reject "{rejectModalItem?.title}"?
          </p>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setRejectModalItem(null)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-xs text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs"
            >
              Confirm Rejection
            </button>
          </div>
        </form>
      </Modal>

      {/* Admin Publish Article Modal */}
      <Modal
        isOpen={isNewContentOpen}
        onClose={() => setIsNewContentOpen(false)}
        title="Publish Official Platform Article"
        subtitle="Articles published by admin are immediately visible to all athletes"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleAdminPublish} className="space-y-4 text-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Title *</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
            <select
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="Workout Plan">Workout Plan</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Recovery">Recovery</option>
              <option value="Endurance">Endurance</option>
              <option value="Strength">Strength</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Content *</label>
            <textarea
              rows="5"
              required
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsNewContentOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs"
            >
              Publish Now
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
