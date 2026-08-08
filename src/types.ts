export type TabType = 'home' | 'journal' | 'insights' | 'toolbox';

export type StressLevel = 'chill' | 'managing' | 'wired' | 'overwhelmed';

export interface MoodLog {
  id: string;
  timestamp: string; // ISO string
  value: number; // 0 to 100
  label: string; // e.g. "Burned Out", "Overwhelmed", "Meh", "Feeling Good", "Unstoppable"
  emoji: string;
}

export interface CognitivePattern {
  id: string;
  title: string;
  description: string;
}

export interface JournalEntry {
  id: string;
  timestamp: string;
  weighingOnYou: string;
  patterns: string[]; // pattern titles or IDs
  loudestThought: string;
  realityCheck: string;
  isDraft: boolean;
  isLocked: boolean;
}

export interface SleepAndStressMetric {
  weekLabel: string; // "W1", "W2", "W3", "W4"
  sleepHours: number;
  stressScore: number; // 0 to 100
  hasDeadline: boolean;
  deadlineTitle?: string;
  isMidterm?: boolean;
}

export interface UserProfile {
  name: string;
  avatarUrl?: string;
  joinedDate: string;
}

export interface CrisisResource {
  id: string;
  title: string;
  description: string;
  contact: string;
  actionType: 'call' | 'text' | 'url';
}
