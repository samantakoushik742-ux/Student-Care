import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const InsightsView: React.FC = () => {
  const { metricsData, exportSummary } = useApp();
  const [timeRange, setTimeRange] = useState<'1M' | '3M'>('1M');
  const [hoveredWeek, setHoveredWeek] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8 w-full animate-fade-in pb-28 md:pb-12 pt-4">
      {/* Header & Export Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-[#0b1c30] dark:text-[#ffffff]">
            Trends & Insights
          </h1>
          <p className="text-base text-[#474552] dark:text-[#a0aec0] max-w-2xl mt-1">
            Understand how your academic schedule impacts your well-being over time.
          </p>
        </div>

        <button
          onClick={exportSummary}
          className="bg-[#5950b6] text-white font-display font-bold text-sm px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#41369d] transition-all active:scale-98 shadow-[0_4px_12px_rgba(89,80,182,0.15)] whitespace-nowrap cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">download</span>
          <span>Campus Summary Export</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Sleep */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col gap-1 shadow-xs border border-[#c8c4d4]/30 hover:bg-white dark:hover:bg-[#192738] transition-colors">
          <div className="flex items-center gap-2 text-[#474552] dark:text-[#a0aec0] text-xs font-bold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[#5950b6] dark:text-[#9d94ff] text-lg">
              bedtime
            </span>
            <span>Avg Sleep (Week)</span>
          </div>
          <div className="font-display font-extrabold text-3xl text-[#0b1c30] dark:text-[#ffffff] flex items-baseline gap-2">
            6.2 <span className="font-normal text-base text-[#474552] dark:text-[#a0aec0]">hrs</span>
          </div>
          <div className="text-[#ba1a1a] flex items-center gap-1 text-xs font-bold mt-1">
            <span className="material-symbols-outlined text-sm">arrow_downward</span>
            <span>1.5 hrs from last week</span>
          </div>
        </div>

        {/* Card 2: Mood */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col gap-1 shadow-xs border border-[#c8c4d4]/30 hover:bg-white dark:hover:bg-[#192738] transition-colors">
          <div className="flex items-center gap-2 text-[#474552] dark:text-[#a0aec0] text-xs font-bold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[#77592d] dark:text-[#e8c08b] text-lg">
              sentiment_satisfied
            </span>
            <span>Avg Mood</span>
          </div>
          <div className="font-display font-extrabold text-3xl text-[#0b1c30] dark:text-[#ffffff] flex items-baseline gap-2">
            Tired <span className="font-normal text-base text-[#474552] dark:text-[#a0aec0]">/ Stressed</span>
          </div>
          <div className="text-[#77592d] dark:text-[#e8c08b] flex items-center gap-1 text-xs font-bold mt-1">
            <span className="material-symbols-outlined text-sm">trending_flat</span>
            <span>Stable for 3 days</span>
          </div>
        </div>

        {/* Card 3: Deadlines */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col gap-1 shadow-xs border border-[#c8c4d4]/30 hover:bg-white dark:hover:bg-[#192738] transition-colors">
          <div className="flex items-center gap-2 text-[#474552] dark:text-[#a0aec0] text-xs font-bold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[#496643] dark:text-[#caecbf] text-lg">
              school
            </span>
            <span>Upcoming Deadlines</span>
          </div>
          <div className="font-display font-extrabold text-3xl text-[#0b1c30] dark:text-[#ffffff] flex items-baseline gap-2">
            4 <span className="font-normal text-base text-[#474552] dark:text-[#a0aec0]">in next 7 days</span>
          </div>
          <div className="text-[#496643] dark:text-[#caecbf] flex items-center gap-1 text-xs font-bold mt-1">
            <span className="material-symbols-outlined text-sm">warning</span>
            <span>High load ahead</span>
          </div>
        </div>
      </div>

      {/* Main Chart Area (Bento Layout) */}
      <div className="glass-panel rounded-3xl p-6 shadow-sm border border-[#c8c4d4]/30">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display font-bold text-lg md:text-xl text-[#0b1c30] dark:text-[#ffffff]">
            Stress, Sleep & Deadlines Correlation
          </h3>
          <div className="flex gap-1 bg-[#eff4ff] dark:bg-[#192738] rounded-full p-1 border border-[#d3e4fe]/50">
            <button
              onClick={() => setTimeRange('1M')}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
                timeRange === '1M'
                  ? 'bg-white dark:bg-[#213145] text-[#0b1c30] dark:text-[#ffffff] shadow-2xs'
                  : 'text-[#474552] dark:text-[#a0aec0] hover:text-[#0b1c30]'
              }`}
            >
              1M
            </button>
            <button
              onClick={() => setTimeRange('3M')}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
                timeRange === '3M'
                  ? 'bg-white dark:bg-[#213145] text-[#0b1c30] dark:text-[#ffffff] shadow-2xs'
                  : 'text-[#474552] dark:text-[#a0aec0] hover:text-[#0b1c30]'
              }`}
            >
              3M
            </button>
          </div>
        </div>

        {/* Visual Correlation Chart Container */}
        <div className="w-full h-[320px] relative flex items-end justify-between pb-8 pt-6 border-b border-[#c8c4d4]/30">
          {/* Y-Axis Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pt-6">
            <div className="w-full h-px border-t border-dashed border-[#c8c4d4]/40 relative">
              <span className="absolute -left-6 -top-2.5 text-[10px] text-[#474552] dark:text-[#a0aec0] font-bold">
                High
              </span>
            </div>
            <div className="w-full h-px border-t border-dashed border-[#c8c4d4]/40 relative">
              <span className="absolute -left-6 -top-2.5 text-[10px] text-[#474552] dark:text-[#a0aec0] font-bold">
                Med
              </span>
            </div>
            <div className="w-full h-px border-t border-dashed border-[#c8c4d4]/40 relative">
              <span className="absolute -left-6 -top-2.5 text-[10px] text-[#474552] dark:text-[#a0aec0] font-bold">
                Low
              </span>
            </div>
          </div>

          {/* Week Columns */}
          {metricsData.map((m) => (
            <div
              key={m.weekLabel}
              onMouseEnter={() => setHoveredWeek(m.weekLabel)}
              onMouseLeave={() => setHoveredWeek(null)}
              className="relative h-full flex flex-col justify-end items-center w-full px-2 z-10 group cursor-pointer"
            >
              {/* Midterms Highlight Column */}
              {m.isMidterm && (
                <div className="absolute inset-y-0 w-20 bg-[#ffdad6]/20 dark:bg-[#3d1216]/30 rounded-t-xl border-x border-[#ba1a1a]/20 flex flex-col items-center pt-1 pointer-events-none">
                  <span className="text-[10px] font-black text-[#ba1a1a] tracking-wider uppercase bg-white/80 dark:bg-black/60 px-2 py-0.5 rounded-full shadow-2xs">
                    MIDTERMS
                  </span>
                  <div className="w-0.5 h-full border-l-2 border-dashed border-[#ba1a1a]/60 mt-1" />
                </div>
              )}

              {/* Deadline Exclamation Flag */}
              {m.hasDeadline && !m.isMidterm && (
                <div className="absolute top-8 flex flex-col items-center">
                  <span className="material-symbols-outlined text-sm text-[#ba1a1a] font-bold">
                    priority_high
                  </span>
                  <div className="w-px h-28 border-l border-dashed border-[#ba1a1a]/50" />
                </div>
              )}

              {/* Bar Group */}
              <div className="w-full max-w-[48px] flex justify-center gap-1.5 h-full items-end">
                {/* Sleep Bar */}
                <div
                  className="w-3.5 bg-[#496643] dark:bg-[#caecbf] rounded-t-md transition-all duration-500 hover:brightness-110"
                  style={{ height: `${(m.sleepHours / 10) * 100}%` }}
                  title={`Sleep: ${m.sleepHours} hrs`}
                />
                {/* Stress Bar */}
                <div
                  className="w-3.5 bg-[#c09b69] rounded-t-md transition-all duration-500 hover:brightness-110"
                  style={{ height: `${m.stressScore}%` }}
                  title={`Stress Score: ${m.stressScore}%`}
                />
              </div>

              {/* Week Label */}
              <span className="absolute -bottom-6 text-xs font-bold text-[#474552] dark:text-[#a0aec0]">
                {m.weekLabel}
              </span>

              {/* Tooltip on hover */}
              {hoveredWeek === m.weekLabel && (
                <div className="absolute -top-12 z-30 bg-[#0b1c30] text-white text-[11px] p-2 rounded-lg shadow-lg whitespace-nowrap pointer-events-none">
                  <p>Sleep: {m.sleepHours}h | Stress: {m.stressScore}%</p>
                  {m.deadlineTitle && <p className="text-[#ffdad6]">Deadlines: {m.deadlineTitle}</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#496643]" />
            <span className="text-xs font-bold text-[#474552] dark:text-[#a0aec0]">
              Sleep Hours
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#c09b69]" />
            <span className="text-xs font-bold text-[#474552] dark:text-[#a0aec0]">
              Stress Level
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 border-t-2 border-dashed border-[#ba1a1a]" />
            <span className="text-xs font-bold text-[#474552] dark:text-[#a0aec0]">
              Academic Deadlines
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
