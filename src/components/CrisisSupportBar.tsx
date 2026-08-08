import React from 'react';
import { useApp } from '../context/AppContext';

export const CrisisSupportBar: React.FC = () => {
  const { setIsCrisisModalOpen } = useApp();

  return (
    <div className="fixed bottom-[82px] md:bottom-6 left-0 md:left-64 right-0 z-40 px-4 pointer-events-none transition-all duration-300 max-w-[1040px] md:mx-auto">
      <div className="pointer-events-auto bg-[#ffdad6]/90 dark:bg-[#3d1216]/90 backdrop-blur-md rounded-2xl p-3.5 md:p-4 flex items-center justify-between shadow-md border border-[#ba1a1a]/20 w-full max-w-sm md:max-w-md mx-auto md:mr-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-xl">emergency_share</span>
          </div>
          <div>
            <p className="font-display font-bold text-sm text-[#0b1c30] dark:text-[#ffdad6]">
              Feeling overwhelmed?
            </p>
            <p className="font-body text-xs text-[#474552] dark:text-[#f8f9ff]/80">
              Crisis Support is here 24/7
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCrisisModalOpen(true)}
          className="bg-[#ba1a1a] text-white font-display font-semibold text-xs md:text-sm px-4 py-2 rounded-full hover:bg-[#93000a] transition-all active:scale-95 shadow-xs flex items-center gap-1.5 whitespace-nowrap"
        >
          <span>Talk</span>
          <span className="material-symbols-outlined text-sm">phone</span>
        </button>
      </div>
    </div>
  );
};
