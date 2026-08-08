import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ExamResetModal: React.FC = () => {
  const { activeToolModal, setActiveToolModal, showToast } = useApp();
  const [step, setStep] = useState<number>(0);

  const steps = [
    {
      title: 'T - Temperature',
      desc: 'Cool your temperature: Press a cool water bottle or cold wet cloth against your cheeks or wrists for 15 seconds.',
      icon: 'ac_unit',
    },
    {
      title: 'I - Intense Movement',
      desc: 'Engage 15 seconds of intense movement: 10 quick jumping jacks, vigorous arm shakes, or wall pushes to burn acute adrenaline.',
      icon: 'directions_run',
    },
    {
      title: 'P - Paced Breathing',
      desc: 'Breathe out longer than you breathe in: 4 seconds in through nose, 6 seconds slow exhale through soft lips.',
      icon: 'air',
    },
    {
      title: 'P - Paired Muscle Relaxation',
      desc: 'Squeeze fists and shoulders tightly for 5 seconds, then let go completely and notice the release.',
      icon: 'self_improvement',
    },
  ];

  if (activeToolModal !== 'exam-reset') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-[#f8f9ff] dark:bg-[#192738] rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#d3e4fe] dark:border-[#2e445e] relative">
        <button
          onClick={() => setActiveToolModal(null)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#eff4ff] dark:bg-[#213145] text-[#0b1c30] dark:text-[#ffffff] flex items-center justify-center hover:bg-[#d3e4fe] transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="w-12 h-12 rounded-2xl bg-[#caecbf] text-[#4f6c48] flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-2xl">psychology</span>
        </div>

        <h3 className="font-display font-bold text-2xl text-[#0b1c30] dark:text-[#ffffff] mb-1">
          Exam Reset (30s TIPP)
        </h3>
        <p className="text-xs text-[#474552] dark:text-[#a0aec0] mb-6">
          Evidence-based dialectical distress tolerance technique to rapidly reduce panic before or during exams.
        </p>

        {/* Current Step Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#213145] border border-[#d3e4fe] dark:border-[#2e445e] mb-6 shadow-xs">
          <div className="flex items-center gap-2 text-[#496643] dark:text-[#caecbf] font-bold text-sm mb-2">
            <span className="material-symbols-outlined">{steps[step].icon}</span>
            <span>{steps[step].title}</span>
          </div>
          <p className="text-sm text-[#0b1c30] dark:text-[#f8f9ff] leading-relaxed">
            {steps[step].desc}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-[#474552] dark:text-[#a0aec0]">
            Step {step + 1} of {steps.length}
          </span>

          <div className="flex gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-full bg-[#e5eeff] dark:bg-[#213145] text-[#0b1c30] dark:text-[#ffffff] font-semibold text-xs hover:bg-[#d3e4fe]"
              >
                Back
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-5 py-2 rounded-full bg-[#496643] text-white font-bold text-xs hover:bg-[#324e2d] transition-all flex items-center gap-1"
              >
                <span>Next</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveToolModal(null);
                  showToast('Exam reset completed! You are centered and ready.');
                }}
                className="px-5 py-2 rounded-full bg-[#5950b6] text-white font-bold text-xs hover:bg-[#41369d] transition-all"
              >
                Complete Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
