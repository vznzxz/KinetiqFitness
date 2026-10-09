import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle } from 'lucide-react';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed? This action cannot be undone.",
  confirmText = "Delete",
  confirmVariant = "danger", // 'danger' | 'warning' | 'primary'
  isPending = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl shrink-0 border border-rose-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mt-1">
            {message}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            disabled={isPending}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md ${
              confirmVariant === 'danger'
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/30'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-900/30'
            }`}
          >
            {isPending ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
