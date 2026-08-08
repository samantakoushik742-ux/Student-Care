import React from 'react';
import { useApp } from '../context/AppContext';

export const ToolboxView: React.FC = () => {
  const { setActiveToolModal } = useApp();

  return (
    <div className="flex flex-col gap-8 w-full animate-fade-in pb-28 md:pb-12 pt-4">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-[#0b1c30] dark:text-[#ffffff]">
          Toolbox
        </h1>
        <p className="text-base text-[#474552] dark:text-[#a0aec0] max-w-2xl">
          Quick tools to reset your nervous system and find your center.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Box Breathing Card (Large / Span 2 on Desktop) */}
        <div
          onClick={() => setActiveToolModal('box-breathing')}
          className="md:col-span-2 relative overflow-hidden rounded-3xl bg-[#eff4ff] dark:bg-[#192738] p-6 md:p-8 shadow-sm border border-[#d3e4fe]/60 dark:border-[#2e445e] flex flex-col items-center justify-center min-h-[300px] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="absolute inset-0 bg-[#5950b6]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="font-display font-bold text-2xl text-[#0b1c30] dark:text-[#ffffff] mb-1 z-10">
            Box Breathing
          </h3>
          <p className="text-sm text-[#474552] dark:text-[#a0aec0] text-center mb-6 z-10 max-w-sm">
            Inhale for 4, hold for 4, exhale for 4, hold for 4.
          </p>

          <div className="relative w-36 h-36 flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-[#9d94ff] rounded-3xl breathing-box opacity-80" />
            <div className="absolute inset-3 border-2 border-[#5950b6]/30 rounded-2xl" />
            <span className="material-symbols-outlined text-4xl text-white opacity-90">
              air
            </span>
          </div>
        </div>

        {/* Exam Reset (TIPP) */}
        <div
          onClick={() => setActiveToolModal('exam-reset')}
          className="rounded-3xl bg-[#caecbf]/30 dark:bg-[#324e2d]/30 p-6 shadow-sm border border-[#caecbf] flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#caecbf]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#caecbf] text-[#4f6c48] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">psychology</span>
            </div>
            <h3 className="font-display font-bold text-xl text-[#0b1c30] dark:text-[#ffffff]">
              Exam Reset
            </h3>
            <p className="text-sm text-[#474552] dark:text-[#a0aec0] mt-1">
              30-second TIPP grounding technique.
            </p>
          </div>

          <button className="mt-6 font-display font-bold text-sm text-[#496643] dark:text-[#caecbf] flex items-center gap-1">
            <span>Start Reset</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* Physical Reset */}
        <div
          onClick={() => setActiveToolModal('physical-reset')}
          className="rounded-3xl bg-[#c09b69]/20 dark:bg-[#4c3309]/30 p-6 shadow-sm border border-[#c09b69]/40 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#c09b69]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#c09b69]/40 text-[#4c3309] dark:text-[#e8c08b] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">directions_run</span>
            </div>
            <h3 className="font-display font-bold text-xl text-[#0b1c30] dark:text-[#ffffff]">
              Physical Reset
            </h3>
            <p className="text-sm text-[#474552] dark:text-[#a0aec0] mt-1">
              Quick stretches to release tension.
            </p>
          </div>

          <div className="flex gap-2 mt-6">
            <span className="px-3 py-1 bg-white/80 dark:bg-[#213145] rounded-full text-xs font-bold text-[#474552] dark:text-[#a0aec0]">
              Neck
            </span>
            <span className="px-3 py-1 bg-white/80 dark:bg-[#213145] rounded-full text-xs font-bold text-[#474552] dark:text-[#a0aec0]">
              Shoulders
            </span>
          </div>
        </div>

        {/* Somatic Tap */}
        <div
          onClick={() => setActiveToolModal('somatic-tap')}
          className="md:col-span-2 rounded-3xl bg-[#e5eeff] dark:bg-[#192738] p-6 shadow-sm border border-[#d3e4fe] flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#d3e4fe]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#d3e4fe] text-[#5950b6] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">touch_app</span>
            </div>
            <h3 className="font-display font-bold text-xl text-[#0b1c30] dark:text-[#ffffff]">
              Somatic Tap
            </h3>
            <p className="text-sm text-[#474552] dark:text-[#a0aec0] mt-1">
              Gentle tapping to calm the body.
            </p>
          </div>

          <button className="mt-6 font-display font-bold text-sm text-[#5950b6] dark:text-[#9d94ff] flex items-center gap-1">
            <span>Try it</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
