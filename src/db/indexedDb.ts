import { JournalEntry, MoodLog, StressLevel } from '../types';

const DB_NAME = 'StudentCareOfflineDB';
const DB_VERSION = 1;

class OfflineRepository {
  private db: IDBDatabase | null = null;
  private isSupported: boolean = typeof window !== 'undefined' && 'indexedDB' in window;

  public async init(): Promise<void> {
    if (!this.isSupported) {
      console.warn('IndexedDB is not supported in this environment. Falling back to localStorage.');
      return;
    }

    return new Promise((resolve, reject) => {
      try {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
          console.error('IndexedDB open error:', request.error);
          resolve(); // Graceful fallback to localStorage
        };

        request.onsuccess = (event) => {
          this.db = request.result;
          resolve();
        };

        request.onupgradeneeded = (event) => {
          const db = request.result;
          if (!db.objectStoreNames.contains('moodLogs')) {
            db.createObjectStore('moodLogs', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('journalEntries')) {
            db.createObjectStore('journalEntries', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings', { keyPath: 'key' });
          }
        };
      } catch (err) {
        console.error('Failed to initialize IndexedDB:', err);
        resolve();
      }
    });
  }

  // Mood Logs
  public async saveMoodLog(log: MoodLog): Promise<void> {
    if (this.db) {
      await this.idbPut('moodLogs', log);
    }
    // Backup in LocalStorage
    const logs = this.getLocalStorage<MoodLog[]>('mood_logs', []);
    const updated = [log, ...logs.filter((l) => l.id !== log.id)];
    this.setLocalStorage('mood_logs', updated);
  }

  public async getMoodLogs(): Promise<MoodLog[]> {
    if (this.db) {
      try {
        const logs = await this.idbGetAll<MoodLog>('moodLogs');
        if (logs && logs.length > 0) return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      } catch (e) {
        console.error('Error reading mood logs from IDB', e);
      }
    }
    return this.getLocalStorage<MoodLog[]>('mood_logs', []);
  }

  // Journal Entries
  public async saveJournalEntry(entry: JournalEntry): Promise<void> {
    if (this.db) {
      await this.idbPut('journalEntries', entry);
    }
    const entries = this.getLocalStorage<JournalEntry[]>('journal_entries', []);
    const updated = [entry, ...entries.filter((e) => e.id !== entry.id)];
    this.setLocalStorage('journal_entries', updated);
  }

  public async getJournalEntries(): Promise<JournalEntry[]> {
    if (this.db) {
      try {
        const entries = await this.idbGetAll<JournalEntry>('journalEntries');
        if (entries && entries.length > 0) return entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      } catch (e) {
        console.error('Error reading journal entries from IDB', e);
      }
    }
    return this.getLocalStorage<JournalEntry[]>('journal_entries', []);
  }

  public async deleteJournalEntry(id: string): Promise<void> {
    if (this.db) {
      await this.idbDelete('journalEntries', id);
    }
    const entries = this.getLocalStorage<JournalEntry[]>('journal_entries', []);
    this.setLocalStorage('journal_entries', entries.filter((e) => e.id !== id));
  }

  // Stress Level
  public async setStressLevel(level: StressLevel): Promise<void> {
    this.setLocalStorage('current_stress_level', level);
  }

  public getStressLevel(): StressLevel {
    return this.getLocalStorage<StressLevel>('current_stress_level', 'managing');
  }

  // Helpers for IDB
  private idbPut(storeName: string, item: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) return resolve();
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(item);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  private idbGetAll<T>(storeName: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) return resolve([]);
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  private idbDelete(storeName: string, key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) return resolve();
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // LocalStorage Helpers
  private getLocalStorage<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setLocalStorage(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }
}

export const offlineRepository = new OfflineRepository();
