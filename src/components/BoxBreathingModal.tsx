import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

export const BoxBreathingModal: React.FC = () => {
  const { activeToolModal, setActiveToolModal } = useApp();
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Hold (Out)'>('Inhale');
  const [seconds, setSeconds] = useState<number>(4);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [cycles, setCycles] = useState<number>(0);

  useEffect(() => {
    if (activeToolModal !== 'box-breathing' || !isActive) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 1) return prev - 1;

        // Advance phase
        setPhase((currentPhase) => {
          if (currentPhase === 'Inhale') return 'Hold';
          if (currentPhase === 'Hold') return 'Exhale';
          if (currentPhase === 'Exhale') return 'Hold (Out)';
          // 'Hold (Out)' -> 'Inhale' completes 1 full box cycle
          setCycles((c) => c + 1);
          return 'Inhale';
        });

        return 4;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeToolModal, isActive]);

  if (activeToolModal !== 'box-breathing') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-[#f8f9ff] dark:bg-[#192738] rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#d3e4fe] dark:border-[#2e445e] relative text-center">
        <button
          onClick={() => setActiveToolModal(null)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#eff4ff] dark:bg-[#213145] text-[#0b1c30] dark:text-[#ffffff] flex items-center justify-center hover:bg-[#d3e4fe] transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h3 className="font-display font-bold text-2xl text-[#0b1c30] dark:text-[#ffffff] mb-1">
          Box Breathing
        </h3>
        <p className="text-sm text-[#474552] dark:text-[#a0aec0] mb-6">
          Inhale for 4s, hold for 4s, exhale for 4s, hold for 4s to regulate your autonomic nervous system.
        </p>

        {/* Breathing Visualizer Box */}
        <div className="relative w-48 h-48 mx-auto my-6 flex items-center justify-center">
          <div
            className={`absolute inset-0 bg-[#9d94ff] rounded-3xl transition-transform duration-1000 ease-in-out ${
              phase === 'Inhale'
                ? 'scale-100 opacity-90'
                : phase === 'Hold'
                ? 'scale-100 opacity-100'
                : phase === 'Exhale'
                ? 'scale-60 opacity-50'
                : 'scale-60 opacity-40'
            }`}
          />
          <div className="relative z-10 flex flex-col items-center justify-center text-white font-display">
            <span className="text-3xl font-extrabold tracking-wide mb-1">{phase}</span>
            <span className="text-5xl font-black">{seconds}s</span>
          </div>
        </div>

        <div className="text-sm font-semibold text-[#5950b6] dark:text-[#9d94ff] mb-6">
          Completed Cycles: <span className="font-bold text-lg">{cycles}</span>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setIsActive(!isActive)}
            className="px-6 py-2.5 rounded-full bg-[#5950b6] text-white font-bold text-sm hover:bg-[#41369d] transition-all flex items-center gap-2 shadow-xs"
          >
            <span className="material-symbols-outlined">{isActive ? 'pause' : 'play_arrow'}</span>
            <span>{isActive ? 'Pause' : 'Resume'}</span>
          </button>
          <button
            onClick={() => {
              setPhase('Inhale');
              setSeconds(4);
              setCycles(0);
            }}
            className="px-5 py-2.5 rounded-full bg-[#e5eeff] dark:bg-[#213145] text-[#0b1c30] dark:text-[#ffffff] font-semibold text-sm hover:bg-[#d3e4fe] transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
