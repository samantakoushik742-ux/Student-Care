import React from 'react';
import { useApp } from '../context/AppContext';

export const CrisisModal: React.FC = () => {
  const { isCrisisModalOpen, setIsCrisisModalOpen, setActiveToolModal } = useApp();

  if (!isCrisisModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] dark:bg-[#192738] rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-[#d3e4fe] dark:border-[#2e445e] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsCrisisModalOpen(false)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#eff4ff] dark:bg-[#213145] text-[#0b1c30] dark:text-[#ffffff] flex items-center justify-center hover:bg-[#d3e4fe] transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">emergency_share</span>
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-[#0b1c30] dark:text-[#ffffff]">
              Crisis Support & Safety
            </h3>
            <p className="text-xs text-[#474552] dark:text-[#a0aec0]">
              Free, confidential support available 24/7. You don't have to carry this alone.
            </p>
          </div>
        </div>

        <div className="space-y-3 my-4">
          {/* 988 Suicide & Crisis Lifeline */}
          <div className="p-4 rounded-2xl bg-[#ffdad6]/40 dark:bg-[#3d1216]/60 border border-[#ba1a1a]/20 flex justify-between items-center">
            <div>
              <p className="font-bold text-sm text-[#0b1c30] dark:text-[#ffffff]">
                988 Suicide & Crisis Lifeline
              </p>
              <p className="text-xs text-[#474552] dark:text-[#cbd5e1]">
                Call or Text 988 (US & Canada)
              </p>
            </div>
            <a
              href="tel:988"
              className="px-4 py-2 bg-[#ba1a1a] text-white font-bold text-xs rounded-full hover:bg-[#93000a] transition-all flex items-center gap-1 shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">call</span>
              <span>Call 988</span>
            </a>
          </div>

          {/* Crisis Text Line */}
          <div className="p-4 rounded-2xl bg-[#e5eeff] dark:bg-[#213145] border border-[#d3e4fe] flex justify-between items-center">
            <div>
              <p className="font-bold text-sm text-[#0b1c30] dark:text-[#ffffff]">
                Crisis Text Line
              </p>
              <p className="text-xs text-[#474552] dark:text-[#cbd5e1]">
                Text HOME to 741741
              </p>
            </div>
            <a
              href="sms:741741?body=HOME"
              className="px-4 py-2 bg-[#5950b6] text-white font-bold text-xs rounded-full hover:bg-[#41369d] transition-all flex items-center gap-1 shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">sms</span>
              <span>Text</span>
            </a>
          </div>

          {/* Campus Counseling */}
          <div className="p-4 rounded-2xl bg-[#caecbf]/40 dark:bg-[#1a3a1f]/60 border border-[#caecbf] flex justify-between items-center">
            <div>
              <p className="font-bold text-sm text-[#0b1c30] dark:text-[#ffffff]">
                Campus Counseling Center
              </p>
              <p className="text-xs text-[#474552] dark:text-[#cbd5e1]">
                On-campus emergency care line
              </p>
            </div>
            <a
              href="tel:18002738255"
              className="px-4 py-2 bg-[#496643] text-white font-bold text-xs rounded-full hover:bg-[#324e2d] transition-all flex items-center gap-1 shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">school</span>
              <span>Campus Line</span>
            </a>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#c8c4d4]/30 flex flex-col sm:flex-row gap-2 justify-between items-center">
          <p className="text-xs text-[#474552] dark:text-[#a0aec0]">
            Need a moment to slow down?
          </p>
          <button
            onClick={() => {
              setIsCrisisModalOpen(false);
              setActiveToolModal('box-breathing');
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-full bg-[#e5eeff] dark:bg-[#213145] text-[#5950b6] dark:text-[#9d94ff] font-bold text-xs hover:bg-[#d3e4fe] transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">air</span>
            <span>Try Box Breathing Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
