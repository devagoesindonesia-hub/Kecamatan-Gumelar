import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { activeToast, dismissToast, setCurrentView } = useApp();

  if (!activeToast) return null;

  const getIcon = () => {
    switch (activeToast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-emerald-600 shrink-0" />;
    }
  };

  const handleClick = () => {
    if (activeToast.title.includes('Aduan') || activeToast.title.includes('Status')) {
      setCurrentView('pengaduan');
    } else if (activeToast.title.includes('Rembug') || activeToast.title.includes('Forum')) {
      setCurrentView('forum');
    } else if (activeToast.title.includes('Acara')) {
      setCurrentView('agenda');
    }
    dismissToast();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] animate-bounce-in shadow-2xl rounded-2xl bg-white border border-slate-200 overflow-hidden">
      <div className="p-4 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-slate-100 flex items-center justify-center">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0 cursor-pointer" onClick={handleClick}>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <h4 className="text-sm font-bold text-slate-800 truncate">{activeToast.title}</h4>
          </div>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{activeToast.message}</p>
          <span className="inline-block mt-2 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800">
            Klik untuk melihat detail →
          </span>
        </div>
        <button
          onClick={dismissToast}
          aria-label="Tutup notifikasi"
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="h-1 bg-emerald-500 w-full animate-progress" />
    </div>
  );
};
