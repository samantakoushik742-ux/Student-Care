import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const JournalView: React.FC = () => {
  const { saveJournalEntry, journalEntries, deleteJournalEntry, showToast } = useApp();

  const [weighingOnYou, setWeighingOnYou] = useState<string>('');
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [loudestThought, setLoudestThought] = useState<string>('');
  const [realityCheck, setRealityCheck] = useState<string>('');
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const patternOptions = [
    { title: 'Catastrophizing', tooltip: 'Assuming the absolute worst will happen' },
    { title: 'All-or-Nothing', tooltip: 'Viewing things in black or white categories' },
    { title: 'Mind Reading', tooltip: 'Assuming you know what others are thinking' },
    { title: '"Should" Statements', tooltip: 'Criticizing yourself or others with "shoulds" or "musts"' },
  ];

  const togglePattern = (title: string) => {
    if (selectedPatterns.includes(title)) {
      setSelectedPatterns(selectedPatterns.filter((p) => p !== title));
    } else {
      setSelectedPatterns([...selectedPatterns, title]);
    }
  };

  const handleSave = async (isDraft: boolean) => {
    if (!weighingOnYou.trim() && !loudestThought.trim()) {
      showToast('Write a thought down before saving.');
      return;
    }

    await saveJournalEntry({
      weighingOnYou,
      patterns: selectedPatterns,
      loudestThought,
      realityCheck,
      isDraft,
      isLocked: !isDraft,
    });

    if (!isDraft) {
      // Clear form
      setWeighingOnYou('');
      setSelectedPatterns([]);
      setLoudestThought('');
      setRealityCheck('');
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[800px] mx-auto animate-fade-in pb-28 md:pb-12 pt-4">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-[#0b1c30] dark:text-[#ffffff]">
            Brain Dump
          </h1>
          <p className="text-base text-[#474552] dark:text-[#a0aec0]">
            Get it out of your head and onto the page. No judgment here.
          </p>
        </div>

        <button
          onClick={() => setShowHistory(!showHistory)}
          className="px-4 py-2 rounded-full bg-[#e5eeff] dark:bg-[#213145] text-[#5950b6] dark:text-[#9d94ff] font-bold text-xs hover:bg-[#d3e4fe] transition-all flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-sm">history</span>
          <span>{showHistory ? 'New Dump' : `Saved (${journalEntries.length})`}</span>
        </button>
      </div>

      {showHistory ? (
        /* Saved Journal History List */
        <div className="space-y-4">
          <h2 className="font-display font-bold text-xl text-[#0b1c30] dark:text-[#ffffff]">
            Locked Thoughts & Drafts
          </h2>
          {journalEntries.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#eff4ff] dark:bg-[#192738] text-[#474552] dark:text-[#a0aec0]">
              <span className="material-symbols-outlined text-4xl mb-2 text-[#5950b6]">lock_open</span>
              <p>No locked entries yet. Your brain dumps will appear here safely.</p>
            </div>
          ) : (
            journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#192738] border border-[#d3e4fe] dark:border-[#2e445e] shadow-xs space-y-3 relative group"
              >
                <div className="flex justify-between items-center text-xs text-[#474552] dark:text-[#a0aec0]">
                  <span className="font-bold flex items-center gap-1 text-[#5950b6] dark:text-[#9d94ff]">
                    <span className="material-symbols-outlined text-sm">
                      {entry.isDraft ? 'draft' : 'lock'}
                    </span>
                    {entry.isDraft ? 'Draft' : 'Locked Entry'}
                  </span>
                  <span>{new Date(entry.timestamp).toLocaleString()}</span>
                </div>

                {entry.weighingOnYou && (
                  <div>
                    <p className="text-xs font-bold text-[#474552] uppercase">Weighing on you:</p>
                    <p className="text-sm text-[#0b1c30] dark:text-[#f8f9ff]">{entry.weighingOnYou}</p>
                  </div>
                )}

                {entry.loudestThought && (
                  <div>
                    <p className="text-xs font-bold text-[#ba1a1a] uppercase">Loudest Thought:</p>
                    <p className="text-sm font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
                      "{entry.loudestThought}"
                    </p>
                  </div>
                )}

                {entry.patterns.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {entry.patterns.map((p) => (
                      <span
                        key={p}
                        className="px-2.5 py-1 rounded-full bg-[#caecbf] text-[#4f6c48] font-bold text-xs"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}

                {entry.realityCheck && (
                  <div>
                    <p className="text-xs font-bold text-[#496643] uppercase">Reality Check:</p>
                    <p className="text-sm text-[#0b1c30] dark:text-[#f8f9ff] italic">
                      {entry.realityCheck}
                    </p>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => deleteJournalEntry(entry.id)}
                    className="text-xs text-[#ba1a1a] hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Journal Form */
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          {/* Section 1: The Core Issue */}
          <div className="space-y-2">
            <label
              htmlFor="weighing-on-you"
              className="flex items-center gap-2 font-display font-bold text-xl text-[#0b1c30] dark:text-[#ffffff]"
            >
              <span className="material-symbols-outlined text-[#77592d] dark:text-[#e8c08b]">
                cloud
              </span>
              What's weighing on you right now?
            </label>
            <textarea
              id="weighing-on-you"
              rows={4}
              value={weighingOnYou}
              onChange={(e) => setWeighingOnYou(e.target.value)}
              className="glass-input resize-none"
              placeholder="Just start typing. Even if it's just 'I feel stuck...'"
            />
          </div>

          {/* Section 2: Cognitive Distortions (Quick Select) */}
          <div className="space-y-4 p-5 bg-[#eff4ff] dark:bg-[#192738] rounded-3xl border border-[#d3e4fe]/50 dark:border-[#2e445e]">
            <div>
              <h3 className="font-display font-bold text-base text-[#0b1c30] dark:text-[#ffffff] flex items-center gap-2 mb-0.5">
                <span className="material-symbols-outlined text-[#5950b6] dark:text-[#9d94ff]">
                  search_insights
                </span>
                Spotting Patterns
              </h3>
              <p className="text-xs text-[#474552] dark:text-[#a0aec0]">
                Recognize any of these 'Loud Thoughts'?
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {patternOptions.map((pat) => {
                const isSelected = selectedPatterns.includes(pat.title);
                return (
                  <button
                    key={pat.title}
                    type="button"
                    onClick={() => togglePattern(pat.title)}
                    className={`border px-4 py-2 rounded-full font-display text-sm transition-all flex items-center gap-2 active:scale-95 ${
                      isSelected
                        ? 'chip-active shadow-2xs font-bold'
                        : 'chip-inactive hover:bg-[#caecbf]/30'
                    }`}
                  >
                    <span>{pat.title}</span>
                    <span
                      className="material-symbols-outlined text-[16px] opacity-70"
                      title={pat.tooltip}
                    >
                      info
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: The Loudest Thought */}
          <div className="space-y-2">
            <label
              htmlFor="loudest-thought"
              className="flex items-center gap-2 font-display font-bold text-xl text-[#0b1c30] dark:text-[#ffffff]"
            >
              <span className="material-symbols-outlined text-[#ba1a1a]">volume_up</span>
              If you had to pick one, what is the loudest thought?
            </label>
            <input
              id="loudest-thought"
              type="text"
              value={loudestThought}
              onChange={(e) => setLoudestThought(e.target.value)}
              className="glass-input font-bold"
              placeholder="e.g., 'I'm going to fail this midterm'"
            />
          </div>

          {/* Section 4: Reality Check */}
          <div className="space-y-2">
            <label
              htmlFor="reality-check"
              className="flex items-center gap-2 font-display font-bold text-xl text-[#0b1c30] dark:text-[#ffffff]"
            >
              <span className="material-symbols-outlined text-[#496643] dark:text-[#caecbf]">
                balance
              </span>
              Reality Check
            </label>
            <p className="text-xs text-[#474552] dark:text-[#a0aec0] pl-8">
              Is this thought 100% true? What would you tell a friend in this situation?
            </p>
            <textarea
              id="reality-check"
              rows={3}
              value={realityCheck}
              onChange={(e) => setRealityCheck(e.target.value)}
              className="glass-input resize-none bg-white dark:bg-[#192738]"
              placeholder="Take a breath, look at the facts..."
            />
          </div>

          {/* Action Area */}
          <div className="pt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => handleSave(true)}
              className="px-6 py-3 rounded-full font-display font-semibold text-[#474552] dark:text-[#cbd5e1] hover:bg-[#d3e4fe]/50 transition-colors active:scale-95"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={() => handleSave(false)}
              className="px-8 py-3 rounded-full bg-[#5950b6] text-white font-display font-bold shadow-[0_4px_14px_0_rgba(89,80,182,0.39)] hover:bg-[#41369d] transition-all active:scale-95"
            >
              Lock it away
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
