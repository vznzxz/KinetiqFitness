import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Shield,
  User,
  CheckCircle2,
  AlertCircle,
  Mail,
  Calendar,
  Lock,
  Sparkles
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const UserManagementTable = ({ onOpenAddUser }) => {
  const { users, updateUserRole, deleteUser, currentUser } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals state
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  // Edit form state
  const [editRole, setEditRole] = useState('ROLE_USER');
  const [editStatus, setEditStatus] = useState('ACTIVE');

  const openEditModal = (u) => {
    setEditingUser(u);
    setEditRole(u.role === 'ROLE_ADMIN' || u.role === 'Admin' ? 'ROLE_ADMIN' : 'ROLE_USER');
    setEditStatus(u.status || 'ACTIVE');
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    await updateUserRole(editingUser.id, editRole, editStatus);
    setEditingUser(null);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    await deleteUser(userToDelete.id);
    setUserToDelete(null);
  };

  const filteredUsers = users.filter((u) => {
    const nameMatch = (u.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = (u.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || emailMatch;

    const uIsAdmin = u.role === 'ROLE_ADMIN' || u.role === 'Admin';
    const matchesRole =
      roleFilter === 'All' ||
      (roleFilter === 'Admin' && uIsAdmin) ||
      (roleFilter === 'User' && !uIsAdmin);

    const matchesStatus =
      statusFilter === 'All' ||
      (u.status || 'ACTIVE').toUpperCase() === statusFilter.toUpperCase();

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search athletes by name or email address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Role Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Roles</option>
              <option value="User" className="bg-slate-900">Athletes Only</option>
              <option value="Admin" className="bg-slate-900">Admins Only</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Statuses</option>
              <option value="ACTIVE" className="bg-slate-900">Active</option>
              <option value="SUSPENDED" className="bg-slate-900">Suspended</option>
            </select>
          </div>

          {/* Add User Button */}
          <button
            onClick={onOpenAddUser}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 rounded-xl text-xs font-bold shadow-md shadow-lime-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Athlete Account</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Fitness Level</th>
                <th className="py-3.5 px-4">Current Weight</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 px-4 text-slate-400 text-xs">
                    No users match your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isCurrent = currentUser && u.id === currentUser.id;
                  const isAdminRole = u.role === 'ROLE_ADMIN' || u.role === 'Admin';
                  const isActive = (u.status || 'ACTIVE').toUpperCase() === 'ACTIVE';

                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Name & Email & Avatar */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center font-bold text-xs shrink-0">
                            {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="font-semibold text-white flex items-center gap-2">
                              <span>{u.name}</span>
                              {isCurrent && (
                                <span className="text-[10px] bg-lime-500/10 text-lime-400 border border-lime-500/30 px-1.5 py-0.2 rounded font-mono">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 text-slate-500" />
                              {u.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                          isAdminRole
                            ? 'bg-lime-500/15 text-lime-400 border-lime-500/30'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}>
                          {isAdminRole ? 'Admin' : 'Athlete'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold border flex items-center gap-1.5 w-fit ${
                          isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                          {isActive ? 'Active' : 'Suspended'}
                        </span>
                      </td>

                      {/* Fitness Level */}
                      <td className="py-4 px-4 text-xs text-slate-300">
                        {u.fitnessLevel || 'Intermediate'}
                      </td>

                      {/* Current Weight */}
                      <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-400 font-mono">
                        {u.currentWeight ? `${u.currentWeight} kg` : '—'}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(u)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-lime-400 hover:bg-lime-500/10 transition-colors"
                            title="Edit Permissions"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          {!isCurrent && (
                            <button
                              onClick={() => setUserToDelete(u)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
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

      {/* Edit Role & Status Modal */}
      <Modal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        title="Manage Athlete Permissions"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500/10 text-lime-400 flex items-center justify-center font-bold">
              {editingUser?.name ? editingUser.name.charAt(0) : 'U'}
            </div>
            <div>
              <div className="text-sm font-bold text-white">{editingUser?.name}</div>
              <div className="text-xs text-slate-400">{editingUser?.email}</div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Assigned Role</label>
            <select
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
            >
              <option value="ROLE_USER">Athlete (Standard Access)</option>
              <option value="ROLE_ADMIN">Administrator (Full Control)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Account State</label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
            >
              <option value="ACTIVE">ACTIVE (Can log in & record data)</option>
              <option value="SUSPENDED">SUSPENDED (Access locked)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-lime-500/20"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete User Dialog */}
      <ConfirmDialog
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete User Account"
        message={`Are you sure you want to permanently delete athlete ${userToDelete?.name} (${userToDelete?.email})? All associated workouts and goal data will be removed from the database.`}
        confirmText="Delete Account"
        danger
      />
    </div>
  );
};
