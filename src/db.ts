const DB_NAME = 'pd-checklist-db';
const DB_VERSION = 1;
const STORE_NAME = 'state';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not available'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
  });
}

function get<T>(key: string): Promise<T | null> {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.get(key);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const row = request.result as { key: string; value: T } | undefined;
          resolve(row?.value ?? null);
        };
        tx.oncomplete = () => db.close();
      }),
    () => null
  );
}

function set(key: string, value: unknown): Promise<void> {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const request = store.put({ key, value });
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
        tx.oncomplete = () => db.close();
      }),
    () => undefined
  );
}

export async function getChecked(): Promise<Record<string, boolean>> {
  try {
    const value = await get<Record<string, boolean>>('checked');
    if (value && typeof value === 'object' && !Array.isArray(value)) return value;
    return {};
  } catch {
    return {};
  }
}

export async function setChecked(data: Record<string, boolean>): Promise<void> {
  try {
    await set('checked', data);
  } catch {
    // ignore
  }
}

export interface LastView {
  monthIndex: number;
  weekIndex: number;
  dayIndex: number;
}

export async function getLastView(): Promise<LastView | null> {
  try {
    return await get<LastView>('lastView');
  } catch {
    return null;
  }
}

export async function setLastView(month: number, week: number, day: number): Promise<void> {
  try {
    await set('lastView', { monthIndex: month, weekIndex: week, dayIndex: day });
  } catch {
    // ignore
  }
}

export type StoredRoadmap = unknown;

export async function getCustomRoadmap(): Promise<StoredRoadmap | null> {
  try {
    return await get<StoredRoadmap>('customRoadmap');
  } catch {
    return null;
  }
}

export async function setCustomRoadmap(roadmap: StoredRoadmap): Promise<void> {
  try {
    await set('customRoadmap', roadmap);
  } catch {
    // ignore
  }
}

export async function getUseCustomRoadmap(): Promise<boolean> {
  try {
    const value = await get<boolean>('useCustomRoadmap');
    return value === true;
  } catch {
    return false;
  }
}

export async function setUseCustomRoadmap(use: boolean): Promise<void> {
  try {
    await set('useCustomRoadmap', use);
  } catch {
    // ignore
  }
}

export async function clearCustomRoadmap(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete('customRoadmap');
      store.put({ key: 'useCustomRoadmap', value: false });
      tx.onerror = () => reject(tx.error);
      tx.oncomplete = () => resolve();
    });
    db.close();
  } catch {
    // ignore
  }
}

import type { WeekdayDayTypeMap } from './types';
import { DEFAULT_WEEKDAY_DAY_TYPE } from './types';

export interface WeekSettings {
  wfhHours: string;
  officeHours: string;
  weekendHours: string;
  /** Which weekday (MON–SUN) is wfh, office, or weekend */
  weekdayDayType?: WeekdayDayTypeMap;
}

export const DEFAULT_WEEK_SETTINGS: WeekSettings = {
  officeHours: '2 hrs available',
  wfhHours: '4–5 hrs available',
  weekendHours: '4–5 hrs available',
  weekdayDayType: { ...DEFAULT_WEEKDAY_DAY_TYPE },
};

export async function getSettings(): Promise<WeekSettings | null> {
  try {
    const value = await get<WeekSettings>('settings');
    if (
      value &&
      typeof value === 'object' &&
      typeof value.wfhHours === 'string' &&
      typeof value.officeHours === 'string' &&
      typeof value.weekendHours === 'string'
    ) {
      return {
        ...DEFAULT_WEEK_SETTINGS,
        ...value,
        weekdayDayType: value.weekdayDayType && typeof value.weekdayDayType === 'object'
          ? { ...DEFAULT_WEEKDAY_DAY_TYPE, ...value.weekdayDayType }
          : DEFAULT_WEEK_SETTINGS.weekdayDayType,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function setSettings(settings: WeekSettings): Promise<void> {
  try {
    await set('settings', settings);
  } catch {
    // ignore
  }
}
