import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-xl border transition-all duration-300 animate-in slide-in-from-bottom-5 ${
              isSuccess
                ? 'bg-slate-900/95 border-emerald-500/40 text-slate-100 shadow-emerald-950/40'
                : isWarning
                ? 'bg-slate-900/95 border-amber-500/40 text-slate-100 shadow-amber-950/40'
                : isError
                ? 'bg-slate-900/95 border-rose-500/40 text-slate-100 shadow-rose-950/40'
                : 'bg-slate-900/95 border-cyan-500/40 text-slate-100 shadow-cyan-950/40'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {isError && <XCircle className="w-5 h-5 text-rose-400" />}
              {!isSuccess && !isWarning && !isError && <Info className="w-5 h-5 text-cyan-400" />}
            </div>

            <div className="flex-1 min-w-0">
              {toast.title && (
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {toast.title}
                </p>
              )}
              <p className="text-sm font-medium text-slate-100 mt-0.5 leading-snug">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1 -mr-1 -mt-1 rounded-lg hover:bg-slate-800"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
