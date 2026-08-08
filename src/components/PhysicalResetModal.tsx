import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const PhysicalResetModal: React.FC = () => {
  const { activeToolModal, setActiveToolModal, showToast } = useApp();
  const [completedStretches, setCompletedStretches] = useState<string[]>([]);

  const stretches = [
    { id: 'neck', title: 'Gentle Neck Rolls', desc: 'Roll head slowly left to right (10s)' },
    { id: 'shoulders', title: 'Shoulder Shrugs & Drops', desc: 'Inhale raise shoulders to ears, exhale drop completely (x5)' },
    { id: 'wrist', title: 'Wrist & Finger Release', desc: 'Interlace fingers and gently push palms outward (10s)' },
    { id: 'chest', title: 'Seated Chest Opener', desc: 'Clasp hands behind lower back and gently draw shoulders back' },
  ];

  if (activeToolModal !== 'physical-reset') return null;

  const toggleStretch = (id: string) => {
    if (completedStretches.includes(id)) {
      setCompletedStretches(completedStretches.filter((s) => s !== id));
    } else {
      setCompletedStretches([...completedStretches, id]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-[#f8f9ff] dark:bg-[#192738] rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#d3e4fe] dark:border-[#2e445e] relative">
        <button
          onClick={() => setActiveToolModal(null)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#eff4ff] dark:bg-[#213145] text-[#0b1c30] dark:text-[#ffffff] flex items-center justify-center hover:bg-[#d3e4fe] transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="w-12 h-12 rounded-2xl bg-[#c09b69]/30 text-[#77592d] flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-2xl">directions_run</span>
        </div>

        <h3 className="font-display font-bold text-2xl text-[#0b1c30] dark:text-[#ffffff] mb-1">
          Physical Reset
        </h3>
        <p className="text-xs text-[#474552] dark:text-[#a0aec0] mb-6">
          Release physical muscular tension trapped from long hours at desks and study tables.
        </p>

        <div className="space-y-3 mb-6">
          {stretches.map((s) => {
            const isDone = completedStretches.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => toggleStretch(s.id)}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isDone
                    ? 'bg-[#caecbf]/40 border-[#caecbf] text-[#0b1c30] dark:text-[#ffffff]'
                    : 'bg-white dark:bg-[#213145] border-[#d3e4fe] dark:border-[#2e445e] text-[#0b1c30] dark:text-[#ffffff]'
                }`}
              >
                <div>
                  <p className={`font-bold text-sm ${isDone ? 'line-through text-[#4f6c48]' : ''}`}>
                    {s.title}
                  </p>
                  <p className="text-xs text-[#474552] dark:text-[#a0aec0]">{s.desc}</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                    isDone ? 'bg-[#496643] border-[#496643] text-white' : 'border-[#c8c4d4]'
                  }`}
                >
                  {isDone && <span className="material-symbols-outlined text-sm">check</span>}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            setActiveToolModal(null);
            showToast('Physical reset finished! Take a gentle breath.');
          }}
          className="w-full py-3 rounded-full bg-[#77592d] text-white font-bold text-sm hover:bg-[#5d4218] transition-all"
        >
          Done
        </button>
      </div>
    </div>
  );
};
