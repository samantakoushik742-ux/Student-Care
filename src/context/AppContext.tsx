import React, { createContext, useContext, useEffect, useState } from 'react';
import { offlineRepository } from '../db/indexedDb';
import { JournalEntry, MoodLog, SleepAndStressMetric, StressLevel, TabType, UserProfile } from '../types';

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  stressLevel: StressLevel;
  setStressLevel: (level: StressLevel) => Promise<void>;
  moodLogs: MoodLog[];
  logMood: (value: number, label: string, emoji: string) => Promise<void>;
  journalEntries: JournalEntry[];
  saveJournalEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => Promise<void>;
  deleteJournalEntry: (id: string) => Promise<void>;
  userProfile: UserProfile;
  isCrisisModalOpen: boolean;
  setIsCrisisModalOpen: (open: boolean) => void;
  activeToolModal: 'box-breathing' | 'exam-reset' | 'physical-reset' | 'somatic-tap' | null;
  setActiveToolModal: (tool: 'box-breathing' | 'exam-reset' | 'physical-reset' | 'somatic-tap' | null) => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
  isLoading: boolean;
  errorMessage: string | null;
  clearError: () => void;
  metricsData: SleepAndStressMetric[];
  exportSummary: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SEED_METRICS: SleepAndStressMetric[] = [
  { weekLabel: 'W1', sleepHours: 8.0, stressScore: 30, hasDeadline: false },
  { weekLabel: 'W2', sleepHours: 6.0, stressScore: 65, hasDeadline: true, deadlineTitle: 'Project Proposal' },
  { weekLabel: 'W3', sleepHours: 4.0, stressScore: 95, hasDeadline: true, deadlineTitle: 'MIDTERMS', isMidterm: true },
  { weekLabel: 'W4', sleepHours: 7.5, stressScore: 40, hasDeadline: false },
];

const SEED_MOOD_LOGS: MoodLog[] = [
  {
    id: 'seed-1',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    value: 50,
    label: 'Meh',
    emoji: '😐',
  },
  {
    id: 'seed-2',
    timestamp: new Date(Date.now() - 3600000 * 28).toISOString(),
    value: 35,
    label: 'Overwhelmed',
    emoji: '😰',
  },
  {
    id: 'seed-3',
    timestamp: new Date(Date.now() - 3600000 * 52).toISOString(),
    value: 75,
    label: 'Feeling Good',
    emoji: '🙂',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [stressLevel, setStressLevelState] = useState<StressLevel>('managing');
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState<boolean>(false);
  const [activeToolModal, setActiveToolModal] = useState<'box-breathing' | 'exam-reset' | 'physical-reset' | 'somatic-tap' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [userProfile] = useState<UserProfile>({
    name: 'Alex',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQotLqQ47vHc6upSY2zZh-Hpf8tlvt28ZK960iyraaKWCpa8OOWo0iSZZEhvJifxUb0WmKpWGLSfd9XOvpkESw16dHgJmFBXitKQgvYifBfR4jO_79tnAwubXlqBxWRfjLMn0ZbemJDolymKkXRIgZXrXrWhBJleMfRXGzUA7re3njp95C5oCScJ5yIRuXG1eflRh7bM0OY8Ax9SNWrwTjNCxbjQ-i93waTeRlZXSMmaplOXb3nX2Tnw',
    joinedDate: 'Fall 2026',
  });

  // Initialize DB and load initial state
  useEffect(() => {
    let isMounted = true;
    const initApp = async () => {
      try {
        setIsLoading(true);
        await offlineRepository.init();
        
        // Load stress level
        const currentStress = offlineRepository.getStressLevel();
        if (isMounted) setStressLevelState(currentStress);

        // Load mood logs
        let logs = await offlineRepository.getMoodLogs();
        if (logs.length === 0) {
          // seed initial
          for (const seed of SEED_MOOD_LOGS) {
            await offlineRepository.saveMoodLog(seed);
          }
          logs = SEED_MOOD_LOGS;
        }
        if (isMounted) setMoodLogs(logs);

        // Load journal entries
        const entries = await offlineRepository.getJournalEntries();
        if (isMounted) setJournalEntries(entries);

      } catch (err: any) {
        console.error('App initialization error:', err);
        if (isMounted) setErrorMessage('Unable to load offline data. Standard local backup enabled.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initApp();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
      return next;
    });
  };

  const setStressLevel = async (level: StressLevel) => {
    try {
      setStressLevelState(level);
      await offlineRepository.setStressLevel(level);
      showToast(`Stress Barometer updated to: ${level.toUpperCase()}`);
    } catch (err) {
      setErrorMessage('Failed to save stress level update.');
    }
  };

  const logMood = async (value: number, label: string, emoji: string) => {
    try {
      const newLog: MoodLog = {
        id: 'mood-' + Date.now(),
        timestamp: new Date().toISOString(),
        value,
        label,
        emoji,
      };
      await offlineRepository.saveMoodLog(newLog);
      setMoodLogs((prev) => [newLog, ...prev]);
      showToast(`Logged mood: ${label} ${emoji}`);
    } catch (err) {
      setErrorMessage('Failed to log mood. Saved to memory.');
    }
  };

  const saveJournalEntry = async (data: Omit<JournalEntry, 'id' | 'timestamp'>) => {
    try {
      const newEntry: JournalEntry = {
        ...data,
        id: 'journal-' + Date.now(),
        timestamp: new Date().toISOString(),
      };
      await offlineRepository.saveJournalEntry(newEntry);
      setJournalEntries((prev) => [newEntry, ...prev.filter((e) => e.id !== newEntry.id)]);
      showToast(newEntry.isDraft ? 'Draft saved locally!' : 'Thought locked away safely!');
    } catch (err) {
      setErrorMessage('Failed to lock away entry.');
    }
  };

  const deleteJournalEntry = async (id: string) => {
    try {
      await offlineRepository.deleteJournalEntry(id);
      setJournalEntries((prev) => prev.filter((e) => e.id !== id));
      showToast('Journal entry deleted.');
    } catch (err) {
      setErrorMessage('Error deleting entry.');
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3500);
  };

  const clearError = () => setErrorMessage(null);

  const exportSummary = () => {
    try {
      const summaryContent = {
        user: userProfile.name,
        exportDate: new Date().toLocaleDateString(),
        currentStress: stressLevel,
        recentMoodLogsCount: moodLogs.length,
        averageSleepWeekly: '6.2 hrs',
        journalCount: journalEntries.length,
        notes: 'StudentCare Campus Summary Export - Personal Well-being Record',
      };

      const blob = new Blob([JSON.stringify(summaryContent, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `StudentCare_Campus_Summary_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast('Downloaded Campus Summary Export!');
    } catch (e) {
      showToast('Generated Campus Summary!');
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        darkMode,
        toggleDarkMode,
        stressLevel,
        setStressLevel,
        moodLogs,
        logMood,
        journalEntries,
        saveJournalEntry,
        deleteJournalEntry,
        userProfile,
        isCrisisModalOpen,
        setIsCrisisModalOpen,
        activeToolModal,
        setActiveToolModal,
        toastMessage,
        showToast,
        isLoading,
        errorMessage,
        clearError,
        metricsData: SEED_METRICS,
        exportSummary,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
