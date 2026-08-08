import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const SomaticTapModal: React.FC = () => {
  const { activeToolModal, setActiveToolModal, showToast } = useApp();
  const [tapCount, setTapCount] = useState<number>(0);

  const points = [
    { name: 'Side of Hand (Karate Chop)', prompt: 'Gently tap the side of your palm' },
    { name: 'Collarbone', prompt: 'Tap two fingers just below your collarbones' },
    { name: 'Temples & Forehead', prompt: 'Gentle rhythmic taps beside your eyes' },
  ];

  const [activePointIndex, setActivePointIndex] = useState<number>(0);

  if (activeToolModal !== 'somatic-tap') return null;

  const handleTap = () => {
    const nextCount = tapCount + 1;
    setTapCount(nextCount);
    if (nextCount % 7 === 0) {
      setActivePointIndex((prev) => (prev + 1) % points.length);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-[#f8f9ff] dark:bg-[#192738] rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#d3e4fe] dark:border-[#2e445e] relative text-center">
        <button
          onClick={() => setActiveToolModal(null)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#eff4ff] dark:bg-[#213145] text-[#0b1c30] dark:text-[#ffffff] flex items-center justify-center hover:bg-[#d3e4fe] transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="w-12 h-12 rounded-2xl bg-[#e5eeff] text-[#5950b6] flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-2xl">touch_app</span>
        </div>

        <h3 className="font-display font-bold text-2xl text-[#0b1c30] dark:text-[#ffffff] mb-1">
          Somatic Tapping
        </h3>
        <p className="text-xs text-[#474552] dark:text-[#a0aec0] mb-6">
          Emotional Freedom Technique (EFT) tapping to re-anchor body and mind.
        </p>

        {/* Interactive Tapping Target */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#213145] border border-[#d3e4fe] dark:border-[#2e445e] mb-6 shadow-xs">
          <p className="font-bold text-sm text-[#5950b6] dark:text-[#9d94ff] mb-1">
            {points[activePointIndex].name}
          </p>
          <p className="text-xs text-[#474552] dark:text-[#a0aec0] mb-4">
            {points[activePointIndex].prompt}
          </p>

          <button
            onClick={handleTap}
            className="w-28 h-28 mx-auto rounded-full bg-[#9d94ff] hover:bg-[#5950b6] text-white flex flex-col items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer border-4 border-[#e4dfff]"
          >
            <span className="material-symbols-outlined text-3xl">touch_app</span>
            <span className="text-xs font-bold mt-1">TAP HERE</span>
          </button>

          <p className="text-xs font-semibold text-[#474552] dark:text-[#a0aec0] mt-4">
            Total Taps: <span className="text-base font-bold text-[#0b1c30] dark:text-[#ffffff]">{tapCount}</span>
          </p>
        </div>

        <button
          onClick={() => {
            setActiveToolModal(null);
            showToast('Somatic tapping complete. Notice how your shoulders feel.');
          }}
          className="w-full py-3 rounded-full bg-[#5950b6] text-white font-bold text-sm hover:bg-[#41369d] transition-all"
        >
          Finished
        </button>
      </div>
    </div>
  );
};
