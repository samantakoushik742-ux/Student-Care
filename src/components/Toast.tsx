import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-3 bg-[#0b1c30] dark:bg-[#eaf1ff] text-white dark:text-[#0b1c30] rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-fade-in border border-white/20 dark:border-black/20">
      <span className="material-symbols-outlined text-[#caecbf] dark:text-[#496643]">check_circle</span>
      <span>{toastMessage}</span>
    </div>
  );
};
