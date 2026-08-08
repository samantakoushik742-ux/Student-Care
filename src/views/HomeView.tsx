import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const HomeView: React.FC = () => {
  const {
    userProfile,
    stressLevel,
    setStressLevel,
    logMood,
    setActiveTab,
    setActiveToolModal,
  } = useApp();

  const [sliderVal, setSliderVal] = useState<number>(50);

  // Emojis array corresponding to 5 tiers
  const moodTiers = [
    { label: 'Burned Out', emoji: '😫', maxVal: 20 },
    { label: 'Overwhelmed', emoji: '😰', maxVal: 40 },
    { label: 'Meh', emoji: '😐', maxVal: 60 },
    { label: 'Feeling Good', emoji: '🙂', maxVal: 80 },
    { label: 'Unstoppable', emoji: '🤩', maxVal: 100 },
  ];

  // Determine current tier
  const getCurrentTierIndex = (val: number) => {
    if (val < 20) return 0;
    if (val < 40) return 1;
    if (val < 60) return 2;
    if (val < 80) return 3;
    return 4;
  };

  const activeIndex = getCurrentTierIndex(sliderVal);
  const currentTier = moodTiers[activeIndex];

  const handleLogMood = () => {
    logMood(sliderVal, currentTier.label, currentTier.emoji);
  };

  const stressOptions: { id: typeof stressLevel; label: string; activeClass: string; hoverClass: string }[] = [
    {
      id: 'chill',
      label: 'Chill',
      activeClass: 'bg-[#caecbf] text-[#4f6c48] border-[#caecbf] shadow-xs font-bold',
      hoverClass: 'hover:bg-[#caecbf]/30',
    },
    {
      id: 'managing',
      label: 'Managing',
      activeClass: 'bg-[#caecbf] text-[#4f6c48] border-[#caecbf] shadow-xs font-bold',
      hoverClass: 'hover:bg-[#caecbf]/30',
    },
    {
      id: 'wired',
      label: 'Wired',
      activeClass: 'bg-[#c09b69] text-white border-[#c09b69] shadow-xs font-bold',
      hoverClass: 'hover:bg-[#c09b69]/30',
    },
    {
      id: 'overwhelmed',
      label: 'Overwhelmed',
      activeClass: 'bg-[#ffdad6] text-[#93000a] border-[#ffdad6] shadow-xs font-bold',
      hoverClass: 'hover:bg-[#ffdad6]/30',
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full animate-fade-in pb-28 md:pb-12 pt-4">
      {/* Welcome Section */}
      <section className="space-y-1">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0b1c30] dark:text-[#ffffff]">
          Good morning, {userProfile.name}.
        </h2>
        <p className="text-base text-[#474552] dark:text-[#a0aec0]">
          Take a breath. Let's see how you're doing today.
        </p>
      </section>

      {/* Mood Check-in Bento Card */}
      <section className="glass-card rounded-2xl p-6 shadow-sm border border-[#c8c4d4]/30 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#caecbf]/40 rounded-full blur-[40px] pointer-events-none" />
        
        <h3 className="font-display font-bold text-xl text-[#5950b6] dark:text-[#9d94ff] mb-1">
          How's the headspace?
        </h3>
        <p className="text-sm text-[#474552] dark:text-[#a0aec0] mb-6">
          Slide to record your mood.
        </p>

        <div className="flex flex-col gap-4">
          <div className="relative w-full h-2.5 bg-[#e5eeff] dark:bg-[#213145] rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-[#5950b6] dark:bg-[#9d94ff] rounded-full transition-all duration-150"
              style={{ width: `${sliderVal}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="absolute top-1/2 -translate-y-1/2 w-full appearance-none bg-transparent outline-none z-10 cursor-pointer"
            />
          </div>

          <div className="flex justify-between items-center text-3xl md:text-4xl mt-3 px-2 select-none">
            {moodTiers.map((tier, idx) => (
              <span
                key={tier.label}
                className={`transition-all duration-200 cursor-pointer ${
                  idx === activeIndex
                    ? 'opacity-100 scale-125'
                    : 'opacity-40 hover:opacity-75 scale-95'
                }`}
                onClick={() => setSliderVal(tier.maxVal - 10)}
              >
                {tier.emoji}
              </span>
            ))}
          </div>

          <div className="text-center mt-1 font-display font-bold text-lg text-[#5950b6] dark:text-[#9d94ff]">
            {currentTier.label}
          </div>
        </div>

        <button
          onClick={handleLogMood}
          className="mt-6 w-full py-3.5 bg-[#5950b6] text-white rounded-xl font-display font-semibold hover:bg-[#41369d] transition-all squish-btn shadow-xs active:scale-[0.98]"
        >
          Log Mood
        </button>
      </section>

      {/* Grid: Stress Barometer & 1-Click Calm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stress Barometer */}
        <section className="glass-card rounded-2xl p-6 shadow-sm border border-[#c8c4d4]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#77592d] dark:text-[#e8c08b]">
                temp_preferences_custom
              </span>
              <h3 className="font-display font-bold text-lg text-[#0b1c30] dark:text-[#ffffff]">
                Stress Barometer
              </h3>
            </div>
            <p className="text-sm text-[#474552] dark:text-[#a0aec0] mb-5">
              Midterms are coming up. How's the pressure?
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {stressOptions.map((opt) => {
              const isSelected = stressLevel === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setStressLevel(opt.id)}
                  className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all squish-btn active:scale-95 ${
                    isSelected
                      ? opt.activeClass
                      : `border-[#c8c4d4] text-[#474552] dark:text-[#cbd5e1] ${opt.hoverClass}`
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* 1-Click Calm Tools */}
        <section className="bg-[#eff4ff] dark:bg-[#192738] rounded-2xl p-6 shadow-sm border border-[#d3e4fe]/40 dark:border-[#2e445e]">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#496643] dark:text-[#caecbf]">
              self_improvement
            </span>
            <h3 className="font-display font-bold text-lg text-[#0b1c30] dark:text-[#ffffff]">
              1-Click Calm
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveToolModal('box-breathing')}
              className="flex flex-col items-center justify-center p-4 bg-white dark:bg-[#213145] rounded-xl hover:bg-[#caecbf]/30 transition-all squish-btn border border-[#c8c4d4]/20 shadow-2xs group"
            >
              <span className="material-symbols-outlined text-3xl text-[#5950b6] dark:text-[#9d94ff] group-hover:scale-110 transition-transform mb-1">
                air
              </span>
              <span className="font-semibold text-sm text-[#0b1c30] dark:text-[#ffffff]">
                Breathe
              </span>
            </button>

            <button
              onClick={() => setActiveToolModal('exam-reset')}
              className="flex flex-col items-center justify-center p-4 bg-white dark:bg-[#213145] rounded-xl hover:bg-[#caecbf]/30 transition-all squish-btn border border-[#c8c4d4]/20 shadow-2xs group"
            >
              <span className="material-symbols-outlined text-3xl text-[#5950b6] dark:text-[#9d94ff] group-hover:scale-110 transition-transform mb-1">
                headphones
              </span>
              <span className="font-semibold text-sm text-[#0b1c30] dark:text-[#ffffff]">
                Lo-Fi
              </span>
            </button>

            <button
              onClick={() => setActiveTab('journal')}
              className="flex flex-col items-center justify-center p-4 bg-white dark:bg-[#213145] rounded-xl hover:bg-[#caecbf]/30 transition-all squish-btn border border-[#c8c4d4]/20 shadow-2xs group"
            >
              <span className="material-symbols-outlined text-3xl text-[#5950b6] dark:text-[#9d94ff] group-hover:scale-110 transition-transform mb-1">
                edit_note
              </span>
              <span className="font-semibold text-sm text-[#0b1c30] dark:text-[#ffffff]">
                Brain Dump
              </span>
            </button>

            <button
              onClick={() => setActiveToolModal('somatic-tap')}
              className="flex flex-col items-center justify-center p-4 bg-white dark:bg-[#213145] rounded-xl hover:bg-[#caecbf]/30 transition-all squish-btn border border-[#c8c4d4]/20 shadow-2xs group"
            >
              <span className="material-symbols-outlined text-3xl text-[#5950b6] dark:text-[#9d94ff] group-hover:scale-110 transition-transform mb-1">
                nature_people
              </span>
              <span className="font-semibold text-sm text-[#0b1c30] dark:text-[#ffffff]">
                Grounding
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
